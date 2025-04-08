// app/categoria/[categoria]/page.tsx

import { notFound } from "next/navigation";
import { processData } from "@/app/utils/processData";
import { categoryMapping } from "@/app/utils/categoryMapping";
import Link from "next/link"; // Importa o componente Link para navegação
import ProductCard from "@/components/ProductCard";

interface CategoriaPageProps {
  params: { categoria: string };
}

export default async function CategoriaPage({ params }: CategoriaPageProps) {
  const { categoria } = params;

  const response = await fetch(
    "https://memobox.app/pomarehorta/lista/produtos",
    { next: { revalidate: 3600 } }
  );
  const data = await response.json();
  const produtos = processData(data);

  const produtosFiltrados = produtos.filter(
    (produto) => produto.grupo === categoria
  );

  if (produtosFiltrados.length === 0) {
    notFound();
  }

  const categoriaNome = categoryMapping[categoria] || categoria;

  // Função para voltar ao topo da página

  return (
    <div>
      <h2 className="text-lg font-bold">{categoriaNome}</h2>

      {/* Botão para voltar à Home */}
      <Link
        href="/"
        className="mb-4 inline-block text-blue-500 hover:underline"
      >
        Voltar para a Home
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {produtosFiltrados.map((produto) => (
          <ProductCard
            key={produto.id}
            image={produto.img_url}
            name={produto.nome}
            price={produto.valor}
            descricao={produto.descricao}
            medida={produto.medida}
          />
        ))}
      </div>
    </div>
  );
}
