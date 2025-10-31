import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export type PitchFormatterResult = z.infer<typeof PitchFormatterResultSchema>;

const PitchFormatterResultSchema = z.object({
  problem: z.string().describe('The core problem being solved'),
  solution: z.string().describe('The proposed solution'),
  market: z.string().describe('Target market and opportunity size'),
  businessModel: z.string().describe('How the business makes money'),
  techStack: z.string().describe('Technology and implementation approach'),
  startupName: z.string().describe('Generated or extracted startup name'),
});

export const pitchFormatterTool = createTool({
  id: 'pitchFormatterTool',
  description: 'Creates a comprehensive pitch deck by generating detailed content for each section: Problem (the core issue being solved), Solution (unique approach and differentiators), Market (target customers and market size with estimates), Business Model (revenue streams and monetization), Tech Stack (specific technologies and architecture), and Startup Name (memorable brand name). The agent must provide fully written, investor-ready content for all fields - NOT placeholders.',
  inputSchema: z.object({
    problem: z.string().describe('2-3 compelling sentences about the specific problem being solved'),
    solution: z.string().describe('2-3 sentences explaining the unique solution and key differentiators'),
    market: z.string().describe('2-3 sentences about target market, customers, and market size ($X billion)'),
    businessModel: z.string().describe('2-3 sentences about revenue streams, pricing, and monetization strategy'),
    techStack: z.string().describe('2-3 sentences about specific technologies, frameworks, and technical architecture'),
    startupName: z.string().describe('A catchy, memorable startup name'),
  }),
  outputSchema: PitchFormatterResultSchema,
  execute: async ({ context }) => {
    // The LLM agent will provide fully populated fields
    // This tool just validates and returns the structured data
    return {
      problem: context.problem,
      solution: context.solution,
      market: context.market,
      businessModel: context.businessModel,
      techStack: context.techStack,
      startupName: context.startupName,
    };
  },
});

function extractStartupName(idea: string): string {
  // Extract potential startup name or generate one
  const words = idea.split(' ').filter(w => w.length > 2);
  
  // Look for capitalized words that might be names
  const capitalizedWords = words.filter(w => /^[A-Z]/.test(w));
  if (capitalizedWords.length > 0) {
    return capitalizedWords[0];
  }
  
  // Generate a name based on key concepts
  const keyWords = words.slice(0, 2);
  if (keyWords.length >= 2) {
    return keyWords.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
  }
  
  return 'StartupAI';
}

