import Image from "next/image";
import PurchaseModal from "./modals/PurchaseModal";

interface ProductCardProps {
  name: string;
  image?: string; // agora é opcional
  price: number;
  medida: string;
  descricao: string;
}

// Caminho da imagem padrão
const FALLBACK_IMAGE = "/images/logo.png"; // Coloque uma imagem na pasta public/

export default function ProductCard({
  name,
  image,
  price,
  medida,
  descricao,
}: ProductCardProps) {
  const imageUrl = image && image.trim() !== "" ? image : FALLBACK_IMAGE;

  return (
    <div className="border border-orange-200 rounded-lg p-2 h-full bg shadow-md shadow-orange-300">
      <div className="hover:shadow-lg hover:ring-1 hover:ring-black hover:ring-opacity-10 p-4 rounded-md transition-all flex flex-col items-center justify-center h-full ">
        {/* Imagem do produto com fallback */}
        <Image
          src={imageUrl}
          alt={name}
          width={150}
          height={150}
          className="rounded w-1/2 object-fit"
        />

        <h3 className="text-xl font-semibold my-2">{name}</h3>

        <div className="flex space-x-1 mb-2">
          <p className="text-2xl font-bold text-red-500">
            R$ {price.toFixed(2)}
          </p>
          <p className="text-sm self-end font-bold text-gray-700">{medida}</p>
        </div>
        <p className="text-lg font-bold text-gray-700">{descricao}</p>

        <PurchaseModal
          name={name}
          image={imageUrl}
          price={price}
          measure={medida}
        />
      </div>
    </div>
  );
}
