"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCartStore } from "@/app/stores/cartStore";
import EditItemModal from "@/components/EditItemModal";

export default function CartSidebar() {
  const cartItems = useCartStore((state) => state.cartItems);
  const isSidebarOpen = useCartStore((state) => state.isSidebarOpen);
  const toggleSidebar = useCartStore((state) => state.toggleSidebar);
  const removeItemFromCart = useCartStore((state) => state.removeItemFromCart);
  const startEditingItem = useCartStore((state) => state.startEditingItem);

  const formatPrice = (value: number) => {
    return (Math.ceil(value * 100) / 100).toFixed(2);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  const frete = 10; // valor fixo
  const total = subtotal + frete;

  const handleEdit = (item: (typeof cartItems)[number]) => {
    startEditingItem(item);
    // Removido toggleSidebar para manter a barra lateral aberta
  };

  const handleCancel = (itemName: string) => {
    removeItemFromCart(itemName);
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white transform transition-transform duration-300 border-l-4 border-orange-500 rounded-s-md ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-orange-600">
          <h2 className="text-xl font-semibold">Carrinho</h2>
          <Button
            onClick={toggleSidebar}
            className="bg-white border border-orange-600 text-orange-700 hover:bg-orange-600 hover:text-white"
          >
            X
          </Button>
        </div>

        <div className="flex flex-col h-full">
          {cartItems.length > 0 ? (
            <ul className="space-y-4 flex-grow overflow-y-auto p-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <li className="flex items-center space-x-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="rounded"
                    />
                    <div>
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-gray-500">
                        x {item.quantity} - R${" "}
                        {formatPrice(Number(item.price) * item.quantity)}
                      </p>
                    </div>
                  </li>
                  <div className="flex gap-2 mt-2 font-semibold">
                    <button
                      onClick={() => handleEdit(item)}
                      className="items-center mx-auto bg-green-300 w-1/2 rounded py-1"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleCancel(item.name)}
                      className="items-center mx-auto bg-red-300 w-1/2 rounded py-1"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 flex-grow">
              Seu carrinho está vazio
            </p>
          )}

          <div className="w-full p-4 pb-20 border-t-2 border-black space-y-1">
            <p className="flex justify-between">
              <span>Subtotal:</span>
              <span>R$ {formatPrice(subtotal)}</span>
            </p>
            <p className="flex justify-between">
              <span>Frete:</span>
              <span>R$ {formatPrice(frete)}</span>
            </p>
            <p className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>R$ {formatPrice(total)}</span>
            </p>
            <Button className="w-full mt-4">Finalizar Compra</Button>
          </div>
        </div>
      </div>

      <EditItemModal />
    </>
  );
}
