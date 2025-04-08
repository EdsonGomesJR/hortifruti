// Mapeamento dos grupos com os IDs recebidos da API
export const grupos = {
  1: "legumes",
  5: "hortalicas",
  6: "frutas",
  7: "diversos",
  8: "diversos",
  10: "diversos",
  11: "diversos",
} as const; // 'as const' para manter os tipos constantes

// Tipos disponíveis para os grupos conforme o mapeamento acima
export type GruposProps = (typeof grupos)[keyof typeof grupos]; // Valores dos grupos
// Adicionei as possíveis medidas após o processamento
export type MedidaType = "KG" | "PCT" | "UN" | "BND" | string;
// Interface para o objeto de destaque vindo da API
export interface Destaque {
  id: number;
  id_produto: number;
}

// Interface para a estrutura da resposta da API
export interface ApiResponse {
  produtos: ProductProps[];
  destaques: Destaque[];
}

// Interface para a estrutura de um produto, conforme a resposta da API
export interface ProductProps {
  id: number;
  nome: string;
  valor: number;
  descricao: string;
  medida: MedidaType;
  img_url: string;
  id_grupo: keyof typeof grupos; // Refere-se ao ID do grupo usando a chave do 'grupos'
  grupo: GruposProps; // Nome do grupo, conforme o mapeamento em 'grupos'
  destaque?: boolean; // Campo opcional para indicar se o produto é destaque
}
