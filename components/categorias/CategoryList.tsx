import CategoryItem from "./CategoryItem";
import { categoryItems } from "@/app/utils/categories"; // Importa a lista de categorias

export default function CategoryList() {
  return (
    <nav className="bg-[#fd7f2c] py-3 mt-2">
      <div className="container mx-auto px-4 flex justify-center items-center space-x-4">
        {categoryItems.map((category, index) => (
          <div key={category.id} className="flex items-center">
            <CategoryItem
              image={category.image}
              name={category.name}
              link={category.link}
            />
            {/* Adiciona um divisor se não for o último item */}
            {index < categoryItems.length - 1 && (
              <div className="border-l border-white h-6 mx-4"></div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
