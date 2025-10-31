import { MCPServer } from "@mastra/mcp"
import { researchTool, pitchFormatterTool, generateLogoTool } from "../tools";
import { pitchAgent } from "../agents";

export const server = new MCPServer({
  name: "AI Pitch Agent Server",
  version: "1.0.0",
  tools: { 
    researchTool, 
    pitchFormatterTool, 
    generateLogoTool 
  },
  agents: { pitchAgent }, // this agent will become tool "ask_pitchAgent"
  // workflows: {
  // dataProcessingWorkflow, // this workflow will become tool "run_dataProcessingWorkflow"
  // }
});
