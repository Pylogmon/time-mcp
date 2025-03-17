import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Create server instance
const server = new McpServer({
  name: "mcp-server-filesystem",
  version: "1.0.4",
});

// Register time tools
server.tool("get-current-time", "Get the current time", {}, async ({}) => {
  const now = new Date();
  return {
    content: [
      {
        type: "text",
        text: now.toISOString(),
      },
    ],
  };
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Time MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
