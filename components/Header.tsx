// app/components/Header.tsx
"use client";
import { useState, useEffect } from "react";
import CategoryList from "@/components/categorias/CategoryList";
import Image from "next/image";
import Logo from "@/public/images/logo.png";
import { BsSearch } from "react-icons/bs";
import { FaCartShopping } from "react-icons/fa6";
import { useCartStore } from "@/app/stores/cartStore";
import { useSearchStore } from "@/app/stores/searchStore";

export default function Header() {
  const { setQuery, setTriggerSearch, setInputQuery, inputQuery } =
    useSearchStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const toggleSidebar = useCartStore((state) => state.toggleSidebar);

  const handleSearch = () => {
    setQuery(inputQuery);
    setTriggerSearch(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleClearSearch = () => {
    setInputQuery("");
    setTriggerSearch(false);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${
        isScrolled ? "shadow-lg" : ""
      } bg-gradient-to-r from-[#fd9346] via-[#fda766] to-[#fd9346] text-black py-4 transition-all duration-300`}
    >
      <div className="container mx-auto flex items-center gap-20">
        <div className="flex items-center">
          <Image src={Logo} width={120} height={120} alt="logo" />
          <h1 className="font-semibold text-2xl leading-none">
            Pomar e Horta - Horti Fruti
          </h1>
        </div>
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={inputQuery}
            onChange={(e) => {
              setInputQuery(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            className="w-full py-2 pl-4 pr-8 bg-white text-gray-700 rounded-full focus:outline-none"
          />
          <div
            className="absolute cursor-pointer right-3 top-3 text-gray-500"
            onClick={handleSearch}
          >
            <BsSearch />
          </div>
        </div>
        <button onClick={handleClearSearch}>Limpar Busca</button>
        <div className="ml-auto ">
          <button
            onClick={toggleSidebar}
            className="border-[#ff6200] bg-[#fda766] border-2 hover:bg-orange-500/50 text-black px-4 py-2 rounded flex gap-3 items-center"
          >
            <FaCartShopping size={26} />
            <div className="flex flex-col">
              <span className="text-sm font-semibold">carrinho</span>
              <span>R$ 100,00</span>
            </div>
          </button>
        </div>
      </div>
      <CategoryList />
    </header>
  );
}
