// utils/processData.ts
import { ApiResponse, ProductProps, grupos } from "@/app/types";

// Função auxiliar para determinar a abreviação da medida com base nas palavras-chave
function getMedidaFromDescricao(descricao: string): string | null {
  const lowerDescricao = descricao.toLowerCase();

  if (lowerDescricao.includes("kilo")) return "KG";
  if (lowerDescricao.includes("bandeja")) return "Bandeja";
  if (lowerDescricao.includes("pacote")) return "Pacote";
  if (lowerDescricao.includes("unidade") || lowerDescricao.includes("cada"))
    return "UN";

  // Caso não encontre nenhuma palavra-chave, retorne o valor original
  return null; // Padrão para Bandeija se "bandeija" for encontrado
}

export function processData({
  produtos,
  destaques,
}: ApiResponse): ProductProps[] {
  // Verifica se produtos é um array
  if (!Array.isArray(produtos)) {
    console.error("A resposta da API não contém um array de produtos.");
    return []; // Retorna um array vazio se não for um array
  }

  const destaquesIds = new Set(
    destaques.map((destaque) => destaque.id_produto)
  );

  // Mapeia os produtos e associa os grupos
  return produtos.map((item) => {
    const novaMedida = getMedidaFromDescricao(item.descricao);
    return {
      ...item,
      grupo: grupos[item.id_grupo as keyof typeof grupos] || "diversos", // Aqui é garantido que o grupo é um valor válido
      valor: parseFloat(item.valor.toString()),
      destaque: destaquesIds.has(item.id),
      medida: novaMedida || item.medida.slice(0, 2),
      descricao: novaMedida ? "" : item.descricao,
    };
  });
}
