// app/categoria/[categoria]/layout.tsx
export default function CategoriaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container mx-auto p-4">{children}</div>;
}
