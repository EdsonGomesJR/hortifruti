// app/page.tsx
"use client";

import { notFound } from "next/navigation";
import { ProductProps } from "@/app/types";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { useSearchStore } from "./stores/searchStore";

export default function HomePage() {
  const { query, triggerSearch, setTriggerSearch, inputQuery } =
    useSearchStore();
  const [produtos, setProdutos] = useState<ProductProps[]>([]);
  const [destaques, setDestaques] = useState<ProductProps[]>([]);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState<ProductProps[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch("/api/products");
        const data = await response.json();
        setProdutos(data);
        setDestaques(data.filter((produto: ProductProps) => produto.destaque));
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (query.length >= 3 && triggerSearch) {
      const searchedProducts = produtos.filter((product: ProductProps) =>
        product.nome.toLowerCase().startsWith(query.toLowerCase())
      );
      setDisplayedProducts(searchedProducts);
      setIsSearchMode(true);
      setTriggerSearch(false);
    } else if (inputQuery.length < 3) {
      setIsSearchMode(false);
      setDisplayedProducts(destaques);
    }
  }, [query, triggerSearch, produtos, destaques, inputQuery, setTriggerSearch]);

  if (loading) return <div className="flex h-screen">Carregando...</div>;

  return (
    <div className="flex-grow">
      <div className="pt-4">
        <section className="container flex flex-col  mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold mb-6">
            {isSearchMode ? "Resultados da Busca" : "Produtos em Destaque"}
          </h2>
          {displayedProducts.length > 0 ? (
            <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
              {displayedProducts.map((produto) => (
                <ProductCard
                  key={produto.id}
                  name={produto.nome}
                  image={produto.img_url}
                  price={produto.valor}
                  descricao={produto.descricao}
                  medida={produto.medida}
                />
              ))}
            </div>
          ) : (
            <p>Nenhum produto encontrado</p>
          )}
        </section>
      </div>
    </div>
  );
}
