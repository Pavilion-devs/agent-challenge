import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export type LogoGeneratorResult = z.infer<typeof LogoGeneratorResultSchema>;

const LogoGeneratorResultSchema = z.object({
  logoUrl: z.string().describe('URL of the generated logo'),
  name: z.string().describe('The startup name used for the logo'),
});

export const generateLogoTool = createTool({
  id: 'generate-logo',
  description: 'Generate a logo image for a startup based on its name',
  inputSchema: z.object({
    name: z.string().describe('Startup name to generate logo for'),
  }),
  outputSchema: LogoGeneratorResultSchema,
  execute: async ({ context }) => {
    return await generateLogo(context.name);
  },
});

const generateLogo = async (name: string): Promise<LogoGeneratorResult> => {
  // Clean the name for URL encoding
  const cleanName = name
    .trim()
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, '+');
  
  // Generate different logo styles based on name length
  const colors = ['6366f1', '8b5cf6', '06b6d4', '10b981', 'f59e0b', 'ef4444'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  // Use placehold.co with custom styling
  const logoUrl = `https://placehold.co/300x300/${randomColor}/white?text=${encodeURIComponent(cleanName)}&font=raleway`;
  
  return {
    logoUrl,
    name,
  };
};

