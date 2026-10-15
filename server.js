import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// 1. Cria o servidor MCP
const servidor = new McpServer({
  name: "material-mcp",
  version: "1.0.0"
});



 // 2. Registra a Tool
const buscarMat = await servidor.registerTool(
  "consultar_dados_material",
  
  {
    description: "Consulta os dados de um material",

    inputSchema: {
      nome: z.string().optional()
    }
  },

  // 3. ESTA É A FUNÇÃO QUE SERÁ EXECUTADA
  async ({ nome }) => {

    const materiais = {
        "100": "Tênis Preto",
        "200": "Tênis Branco",
        "300": "Chinelo Azul"
    };

    const material =  materiais[nome] || "Material não encontrado";

    console.error(material);
    

    return {
      content: [
        {
          type: "text",
          text: material
        }
      ]
    };
  }
);

servidor.registerTool(
  "consultar_dados_BP",
  
  {
    description: "Consulta os dados de um material",

    inputSchema: {
      nome: z.string().optional()
    }
  },

  // 3. ESTA É A FUNÇÃO QUE SERÁ EXECUTADA
  async ({ nome }) => {

    const bps = {
        "45000": "pessoa 1",
        "45001": "pessoa 2",
        "45002": "pessoa 3"
    };

    const bp =  bps[nome] || "pessoa não encontrado";

    
    

    return {
      content: [
        {
          type: "text",
          text: bp
        }
      ]
    };
  }
);


// 4. Cria transporte STDIO
const transporte = new StdioServerTransport();

// 5. Inicia servidor
await servidor.connect(transporte);
