"use client";

import { useCoAgent, useCopilotAction } from "@copilotkit/react-core";
import { CopilotKitCSSProperties, CopilotSidebar } from "@copilotkit/react-ui";
import { useState } from "react";
import { AgentState as AgentStateSchema } from "@/mastra/agents";
import { z } from "zod";
import type { ResearchToolResult, PitchFormatterResult, LogoGeneratorResult } from "@/mastra/tools";
import { Sparkles, TrendingUp, Users, DollarSign, Code, Lightbulb, Rocket, Download } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type AgentState = z.infer<typeof AgentStateSchema>;

type ToolStatus = {
  name: string;
  status: 'pending' | 'running' | 'completed';
  icon: string;
};

export default function PitchAgentPage() {
  const [themeColor, setThemeColor] = useState("#6366f1");
  const [currentPitch, setCurrentPitch] = useState<PitchFormatterResult | null>(null);
  const [currentLogo, setCurrentLogo] = useState<LogoGeneratorResult | null>(null);
  const [researchData, setResearchData] = useState<ResearchToolResult | null>(null);
  const [showForm, setShowForm] = useState(true);
  const [toolProgress, setToolProgress] = useState<ToolStatus[]>([]);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    audience: "",
    problem: "",
    businessModel: "",
  });

  useCopilotAction({
    name: "setThemeColor",
    parameters: [{
      name: "themeColor",
      description: "The theme color to set",
      required: true,
    }],
    handler({ themeColor }) {
      setThemeColor(themeColor);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowForm(false);
    // The CopilotKit will handle the agent interaction
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      audience: "",
      problem: "",
      businessModel: "",
    });
    setCurrentPitch(null);
    setCurrentLogo(null);
    setResearchData(null);
    setToolProgress([]);
    setShowForm(true);
  };

  return (
    <main style={{ "--copilot-kit-primary-color": themeColor } as CopilotKitCSSProperties}>
      <PitchContent
        themeColor={themeColor}
        currentPitch={currentPitch}
        setCurrentPitch={setCurrentPitch}
        currentLogo={currentLogo}
        setCurrentLogo={setCurrentLogo}
        researchData={researchData}
        setResearchData={setResearchData}
        formData={formData}
        setFormData={setFormData}
        showForm={showForm}
        setShowForm={setShowForm}
        handleSubmit={handleSubmit}
        resetForm={resetForm}
        toolProgress={toolProgress}
        setToolProgress={setToolProgress}
      />
      <CopilotSidebar
        clickOutsideToClose={false}
        defaultOpen={true}
        labels={{
          title: "AI Pitch Agent",
          initial: `👋 Welcome to the AI Startup Pitch Agent!

**What I can do:**

Transform your startup idea into a professional pitch deck with:

1. 🔍 **Market Research** - Competitor analysis and market insights
2. 📝 **Structured Pitch** - Problem, Solution, Market, Business Model, Tech Stack
3. 🎨 **Logo Generation** - Visual branding for your startup

**How to use:**

Fill out the form on the left with your startup details, then ask me to "Generate my pitch deck" or "Create a pitch for ${formData.name || 'my startup'}".

You can also chat with me to refine specific sections!`
        }}
      />
    </main>
  );
}

function PitchContent({
  themeColor,
  currentPitch,
  setCurrentPitch,
  currentLogo,
  setCurrentLogo,
  researchData,
  setResearchData,
  formData,
  setFormData,
  showForm,
  setShowForm,
  handleSubmit,
  resetForm,
  toolProgress,
  setToolProgress,
}: {
  themeColor: string;
  currentPitch: PitchFormatterResult | null;
  setCurrentPitch: (pitch: PitchFormatterResult | null) => void;
  currentLogo: LogoGeneratorResult | null;
  setCurrentLogo: (logo: LogoGeneratorResult | null) => void;
  researchData: ResearchToolResult | null;
  setResearchData: (data: ResearchToolResult | null) => void;
  formData: any;
  setFormData: (data: any) => void;
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
  resetForm: () => void;
  toolProgress: ToolStatus[];
  setToolProgress: (progress: ToolStatus[]) => void;
}) {
  const { state } = useCoAgent<AgentState>({
    name: "pitchAgent",
    initialState: {
      pitches: [],
    },
  });

  // Helper function to update tool status
  const updateToolStatus = (toolName: string, status: 'pending' | 'running' | 'completed', icon: string) => {
    setToolProgress((prev) => {
      const existing = prev.find(t => t.name === toolName);
      if (existing) {
        return prev.map(t => t.name === toolName ? { ...t, status } : t);
      }
      return [...prev, { name: toolName, status, icon }];
    });
  };

  // Research Tool Action
  useCopilotAction({
    name: "researchTool",
    description: "Research competitors and market for the startup idea",
    available: "frontend",
    parameters: [
      { name: "query", type: "string", required: true },
    ],
    handler: async ({ query }) => {
      // Mark tool as running
      updateToolStatus("Researching Market & Competitors", "running", "🔍");
      return query; // Return value for agent
    },
    render: ({ result, status }) => {
      // Store result when available - use useEffect pattern
      if (result && typeof result === 'object' && 'competitors' in result) {
        // Schedule state update for next render cycle
        setTimeout(() => {
          setResearchData(result as ResearchToolResult);
          updateToolStatus("Researching Market & Competitors", "completed", "🔍");
        }, 0);
      }
      return null;
    },
  });

  // Pitch Formatter Tool Action
  useCopilotAction({
    name: "pitchFormatterTool",
    description: "Format the startup idea into structured pitch sections",
    available: "frontend",
    parameters: [
      { name: "problem", type: "string", required: true },
      { name: "solution", type: "string", required: true },
      { name: "market", type: "string", required: true },
      { name: "businessModel", type: "string", required: true },
      { name: "techStack", type: "string", required: true },
      { name: "startupName", type: "string", required: true },
    ],
    handler: async (args) => {
      // Mark tool as running
      updateToolStatus("Formatting Pitch Deck", "running", "📝");
      return args;
    },
    render: ({ result }) => {
      if (result && typeof result === 'object' && 'problem' in result) {
        setTimeout(() => {
          setCurrentPitch(result as PitchFormatterResult);
          updateToolStatus("Formatting Pitch Deck", "completed", "📝");
        }, 0);
      }
      return null;
    },
  });

  // Logo Generator Tool Action
  useCopilotAction({
    name: "generateLogoTool",
    description: "Generate a logo for the startup",
    available: "frontend",
    parameters: [
      { name: "name", type: "string", required: true },
    ],
    handler: async ({ name }) => {
      // Mark tool as running
      updateToolStatus("Generating Logo", "running", "🎨");
      return name;
    },
    render: ({ result }) => {
      if (result && typeof result === 'object' && 'logoUrl' in result) {
        setTimeout(() => {
          setCurrentLogo(result as LogoGeneratorResult);
          updateToolStatus("Generating Logo", "completed", "🎨");
        }, 0);
      }
      return null;
    },
  });

  // Get Startup Context Action - provides form data to agent
  useCopilotAction({
    name: "getStartupContext",
    description: "Get the structured startup information that the user filled in the form",
    available: "frontend",
    parameters: [],
    handler: async () => {
      return {
        name: formData.name,
        description: formData.description,
        audience: formData.audience,
        problem: formData.problem,
        businessModel: formData.businessModel,
      };
    },
  });

  // Memory update action
  useCopilotAction({
    name: "updateWorkingMemory",
    available: "frontend",
    render: () => null,
  });

  // PDF Download Function
  const downloadPDF = async () => {
    if (!currentPitch || !currentLogo) return;

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    let yPosition = margin;

    // Set font
    pdf.setFont("helvetica");

    // Page 1: Title and Logo
    pdf.setFontSize(32);
    pdf.setFont("helvetica", "bold");
    const titleText = currentLogo.name;
    const titleWidth = pdf.getTextWidth(titleText);
    pdf.text(titleText, (pageWidth - titleWidth) / 2, yPosition);
    yPosition += 15;

    // Add logo image
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = currentLogo.logoUrl;
      await new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });

      const imgWidth = 60;
      const imgHeight = 60;
      pdf.addImage(img, 'PNG', (pageWidth - imgWidth) / 2, yPosition, imgWidth, imgHeight);
      yPosition += imgHeight + 20;
    } catch (error) {
      console.error('Error loading logo:', error);
      yPosition += 20;
    }

    // Helper function to add section
    const addSection = (title: string, content: string, emoji: string) => {
      // Check if we need a new page
      if (yPosition > pageHeight - 60) {
        pdf.addPage();
        yPosition = margin;
      }

      // Section title
      pdf.setFontSize(18);
      pdf.setFont("helvetica", "bold");
      pdf.text(`${emoji} ${title}`, margin, yPosition);
      yPosition += 10;

      // Section content
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "normal");
      const lines = pdf.splitTextToSize(content, contentWidth);
      pdf.text(lines, margin, yPosition);
      yPosition += (lines.length * 5) + 12;
    };

    // Add all sections
    addSection("Problem", currentPitch.problem, "💡");
    addSection("Solution", currentPitch.solution, "✨");
    addSection("Market", currentPitch.market, "📈");
    addSection("Business Model", currentPitch.businessModel, "💰");
    addSection("Tech Stack", currentPitch.techStack, "💻");

    // Add research section if available
    if (researchData) {
      if (yPosition > pageHeight - 80) {
        pdf.addPage();
        yPosition = margin;
      }

      pdf.setFontSize(18);
      pdf.setFont("helvetica", "bold");
      pdf.text("👥 Market Research", margin, yPosition);
      yPosition += 10;

      pdf.setFontSize(11);
      pdf.setFont("helvetica", "normal");
      const insightLines = pdf.splitTextToSize(researchData.insights, contentWidth);
      pdf.text(insightLines, margin, yPosition);
      yPosition += (insightLines.length * 5) + 8;

      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      pdf.text("Key Competitors:", margin, yPosition);
      yPosition += 7;

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      researchData.competitors.forEach((competitor, idx) => {
        if (yPosition > pageHeight - margin - 10) {
          pdf.addPage();
          yPosition = margin;
        }
        const competitorLines = pdf.splitTextToSize(`• ${competitor}`, contentWidth - 5);
        pdf.text(competitorLines, margin + 5, yPosition);
        yPosition += (competitorLines.length * 5) + 3;
      });
    }

    // Add footer
    const totalPages = pdf.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(100);
      pdf.text(
        `Generated with PITCH AI | Page ${i} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
    }

    // Save the PDF
    pdf.save(`${currentLogo.name.replace(/[^a-zA-Z0-9]/g, '_')}_Pitch_Deck.pdf`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-16 pb-12 border-b-8 border-black bg-gradient-to-br from-violet-50 to-lime-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-[48px] sm:text-[80px] lg:text-[120px] leading-[0.85] font-bold tracking-tight">
              PITCH<span className="align-super text-[0.3em] font-medium ml-1">AI</span>
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 tracking-tight mt-6 max-w-2xl mx-auto">
              Transform your startup idea into an investor-ready pitch deck in seconds
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {showForm && !currentPitch ? (
          /* Input Form */
          <div className="max-w-3xl mx-auto">
            <div className="border-8 border-black bg-white rounded-[28px] p-8 sm:p-12 shadow-brutal">
              <div className="flex items-center gap-3 mb-6">
                <Rocket className="w-8 h-8" />
                <h2 className="text-3xl font-bold tracking-tight uppercase">Your Startup Details</h2>
              </div>
              <p className="text-neutral-600 tracking-tight mb-8">
                Fill in the details below and we'll generate a professional pitch deck with market research and insights.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Startup Name */}
                <div>
                  <label className="block text-sm font-bold uppercase tracking-tight mb-2">
                    Startup Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-4 border-black rounded-lg tracking-tight focus:outline-none focus:ring-2 focus:ring-violet-500"
                    placeholder="e.g., LedgerFlow"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-bold uppercase tracking-tight mb-2">
                    Short Description *
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border-4 border-black rounded-lg tracking-tight focus:outline-none focus:ring-2 focus:ring-violet-500"
                    placeholder="e.g., A SaaS platform that simplifies accounting for small businesses"
                  />
                </div>

                {/* Target Audience */}
                <div>
                  <label className="block text-sm font-bold uppercase tracking-tight mb-2">
                    Target Audience *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.audience}
                    onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                    className="w-full px-4 py-3 border-4 border-black rounded-lg tracking-tight focus:outline-none focus:ring-2 focus:ring-violet-500"
                    placeholder="e.g., Small businesses and freelance accountants"
                  />
                </div>

                {/* Problem */}
                <div>
                  <label className="block text-sm font-bold uppercase tracking-tight mb-2">
                    Problem Being Solved *
                  </label>
                  <textarea
                    required
                    value={formData.problem}
                    onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border-4 border-black rounded-lg tracking-tight focus:outline-none focus:ring-2 focus:ring-violet-500"
                    placeholder="e.g., Manual bookkeeping wastes time and leads to costly errors"
                  />
                </div>

                {/* Business Model */}
                <div>
                  <label className="block text-sm font-bold uppercase tracking-tight mb-2">
                    Business Model (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.businessModel}
                    onChange={(e) => setFormData({ ...formData, businessModel: e.target.value })}
                    className="w-full px-4 py-3 border-4 border-black rounded-lg tracking-tight focus:outline-none focus:ring-2 focus:ring-violet-500"
                    placeholder="e.g., Subscription-based SaaS with tiered pricing"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    onClick={() => setShowForm(false)}
                    className="w-full px-8 py-4 bg-black text-white border-2 border-black rounded-md font-bold text-lg shadow-brutal brutal-hover"
                  >
                    ✨ Generate My Pitch Deck
                  </button>
                  <p className="text-sm text-neutral-600 text-center mt-4 tracking-tight">
                    After clicking, use the AI assistant on the right to generate your pitch
                  </p>
                </div>
              </form>
            </div>
          </div>
        ) : currentPitch && currentLogo ? (
          /* Pitch Display */
          <div className="space-y-8">
            {/* Logo Section */}
            <div className="flex justify-center mb-8">
              <div className="border-8 border-black bg-white rounded-[28px] p-8 shadow-brutal brutal-hover">
                <img
                  src={currentLogo.logoUrl}
                  alt={currentLogo.name}
                  className="w-48 h-48 object-contain"
                />
                <h2 className="text-center mt-6 font-bold text-3xl tracking-tight">
                  {currentLogo.name}
                </h2>
              </div>
            </div>

            {/* Pitch Sections Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PitchSection
                title="Problem"
                content={currentPitch.problem}
                icon={<Lightbulb className="w-8 h-8" />}
                variant="violet"
                number="001"
              />

              <PitchSection
                title="Solution"
                content={currentPitch.solution}
                icon={<Sparkles className="w-8 h-8" />}
                variant="lime"
                number="002"
              />

              <PitchSection
                title="Market"
                content={currentPitch.market}
                icon={<TrendingUp className="w-8 h-8" />}
                variant="rose"
                number="003"
              />

              <PitchSection
                title="Business Model"
                content={currentPitch.businessModel}
                icon={<DollarSign className="w-8 h-8" />}
                variant="amber"
                number="004"
              />
            </div>

            {/* Tech Stack - Full Width */}
            <div className="mt-6">
              <PitchSection
                title="Tech Stack"
                content={currentPitch.techStack}
                icon={<Code className="w-8 h-8" />}
                variant="default"
                number="005"
                fullWidth
              />
            </div>

            {/* Market Research */}
            {researchData && (
              <div className="mt-8 border-8 border-black bg-neutral-50 rounded-[28px] p-8 shadow-brutal">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-8 h-8" />
                  <h3 className="text-2xl font-bold tracking-tight uppercase">Market Research</h3>
                </div>
                <p className="text-neutral-700 mb-6 tracking-tight leading-relaxed">
                  {researchData.insights}
                </p>
                <div>
                  <p className="font-semibold text-sm uppercase tracking-tight mb-3 text-neutral-600">
                    Key Competitors:
                  </p>
                  <ul className="space-y-2">
                    {researchData.competitors.map((competitor, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-neutral-700 tracking-tight">{competitor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <button
                onClick={downloadPDF}
                className="px-8 py-4 bg-violet-500 text-white border-4 border-black rounded-lg font-bold text-lg shadow-brutal brutal-hover flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </button>
              <button
                onClick={resetForm}
                className="px-8 py-4 bg-black text-white border-4 border-black rounded-lg font-bold text-lg shadow-brutal brutal-hover"
              >
                ✨ Create Another Pitch
              </button>
            </div>
          </div>
        ) : (
          /* Loading/Waiting State */
          <div className="border-8 border-black bg-gradient-to-br from-violet-100 to-lime-100 rounded-[28px] p-12 sm:p-16 text-center shadow-brutal-lg">
            <div className="text-6xl sm:text-8xl mb-8">🤖</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              {toolProgress.length > 0 ? "Generating Your Pitch..." : "Ready to Generate!"}
            </h2>
            <p className="text-lg text-neutral-600 tracking-tight mb-8 max-w-2xl mx-auto">
              {toolProgress.length > 0
                ? "Our AI is working hard to create your pitch deck. Watch the progress below!"
                : "Your startup details have been saved. Use the AI assistant on the right to generate your pitch deck!"
              }
            </p>

            {/* Tool Progress Tracker */}
            {toolProgress.length > 0 && (
              <div className="border-4 border-black bg-white rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto mb-8 shadow-brutal-sm">
                <p className="font-bold text-sm uppercase tracking-tight mb-4 text-neutral-900">
                  🛠️ Tool Execution Progress
                </p>
                <ul className="space-y-3">
                  {toolProgress.map((tool, idx) => (
                    <li key={idx} className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 border-2 border-neutral-200">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{tool.icon}</span>
                        <span className="font-medium text-neutral-800 tracking-tight">{tool.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {tool.status === 'pending' && (
                          <span className="text-sm text-neutral-500 font-medium">Pending...</span>
                        )}
                        {tool.status === 'running' && (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                            <span className="text-sm text-violet-600 font-bold">Running</span>
                          </div>
                        )}
                        {tool.status === 'completed' && (
                          <span className="text-lg">✅</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {toolProgress.length === 0 && (
              <div className="border-4 border-black bg-white rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto text-left shadow-brutal-sm">
                <p className="font-bold text-sm uppercase tracking-tight mb-4 text-neutral-900">
                  Try saying:
                </p>
                <ul className="space-y-3">
                  {[
                    `"Generate a pitch deck for ${formData.name || 'my startup'}"`,
                    `"Create my pitch with market research"`,
                    `"Help me build a pitch for investors"`
                  ].map((prompt, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-neutral-700 tracking-tight">{prompt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <button
              onClick={resetForm}
              className="mt-8 px-6 py-3 bg-white border-2 border-black rounded-md font-bold shadow-brutal brutal-hover"
            >
              ← Edit Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Pitch Section Component
function PitchSection({
  title,
  content,
  icon,
  variant = "default",
  number,
  fullWidth = false
}: {
  title: string;
  content: string;
  icon: React.ReactNode;
  variant?: 'default' | 'violet' | 'lime' | 'rose' | 'amber';
  number: string;
  fullWidth?: boolean;
}) {
  const variantStyles = {
    default: 'bg-white',
    violet: 'bg-violet-100',
    lime: 'bg-lime-100',
    rose: 'bg-rose-100',
    amber: 'bg-amber-100'
  };

  return (
    <div
      className={`border-8 border-black rounded-[28px] p-6 sm:p-8 shadow-brutal brutal-hover ${variantStyles[variant]} ${fullWidth ? 'lg:col-span-2' : ''}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-neutral-600 text-sm tracking-tight font-medium">( {number} )</span>
        <div className="text-neutral-900">
          {icon}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight mb-4">
        {title}
      </h3>

      {/* Content */}
      <p className="text-neutral-700 tracking-tight leading-relaxed whitespace-pre-wrap">
        {content}
      </p>
    </div>
  );
}
