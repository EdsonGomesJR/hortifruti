import Image from "next/image";
import Link from "next/link";

type CategoryItemProps = {
  image: string;
  name: string;
  link: string;
};

export default function CategoryItem({ image, name, link }: CategoryItemProps) {
  return (
    <div className="flex items-center space-x-2">
      <Image
        width={40}
        height={40}
        src={image}
        alt={name}
        className="w-8 h-8 object-cover rounded-full"
      />
      <Link href={link} className="text-black font-semibold uppercase">
        {name}
      </Link>
    </div>
  );
}
