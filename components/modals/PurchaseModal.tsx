"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CartSidebar from "../CartSidebar";
import { useCartStore } from "@/app/stores/cartStore";

interface PurchaseModalProps {
  name: string;
  image: string;
  price: number;
  measure: string;
}

export default function PurchaseModal({
  name,
  image,
  price,
  measure,
}: PurchaseModalProps) {
  const [value, setValue] = useState(0);
  const [unit, setUnit] = useState<"KG" | "UN">("KG");
  const [isOpen, setIsOpen] = useState(false);
  const addItemToCart = useCartStore((state) => state.addItemToCart);
  const editingItem = useCartStore((state) => state.editingItem);
  // const finishEditingItem = useCartStore((state) => state.finishEditingItem);

  const isUnitOnly = ["UN", "BANDEJA"].includes(measure.toUpperCase());

  useEffect(() => {
    if (isOpen && editingItem) {
      setUnit(editingItem.measure === "KG" ? "KG" : "UN");
      setValue(editingItem.quantity);
    } else if (isOpen && !editingItem) {
      const unitToSet = isUnitOnly ? "UN" : "KG";
      setUnit(unitToSet);
      setValue(0);
    }
  }, [isOpen]);

  const handlePurchase = () => {
    const newItem = {
      name,
      image,
      price,
      measure: unit,
      quantity: value,
      unit: unit === "UN" && value > 1 ? "unidades" : unit,
    };
    addItemToCart(newItem);
    setIsOpen(false);
    setValue(0);
    // finishEditingItem();
  };

  const handleCancel = () => {
    if (editingItem) {
      useCartStore.getState().removeItemFromCart(editingItem.name);
      // finishEditingItem();
    }
    setIsOpen(false);
    setValue(0);
  };

  const handleIncrease = () => {
    if (unit === "KG") {
      setValue((prev) => parseFloat((prev + 0.1).toFixed(2)));
    } else {
      setValue((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (unit === "KG" && value >= 0.1) {
      setValue((prev) => parseFloat((prev - 0.1).toFixed(2)));
    } else if (unit === "UN" && value > 0) {
      setValue((prev) => prev - 1);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="w-10/12 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded">
            {editingItem ? "Editar" : "Comprar"}
          </Button>
        </DialogTrigger>

        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          <DialogTitle>
            {editingItem ? "Editar Item" : "Adicionar ao Carrinho"}
          </DialogTitle>
          <DialogDescription>
            {editingItem
              ? "Altere a quantidade desejada."
              : `Insira a quantidade desejada para ${name}.`}
          </DialogDescription>

          <div className="flex items-center space-x-4 my-4 p-4 bg-gray-100 rounded">
            <Image
              src={image}
              alt={name}
              width={50}
              height={50}
              className="rounded"
            />
            <div>
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="text-sm text-gray-500">R$ {price.toFixed(2)}</p>
              <p className="text-sm text-gray-600 italic">
                Preço por {measure}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <label className="font-medium text-sm text-gray-700">
              Como deseja comprar?
            </label>
            <div className="flex gap-6 mt-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="unit"
                  value="unidade"
                  checked={unit === "UN"}
                  onChange={() => {
                    setUnit("UN");
                    setValue(0);
                  }}
                />
                Por Unidade
              </label>
              {!isUnitOnly && (
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="unit"
                    value="kilo"
                    checked={unit === "KG"}
                    onChange={() => {
                      setUnit("KG");
                      setValue(0);
                    }}
                  />
                  Por Quilo
                </label>
              )}
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="p-2 border flex justify-between items-center rounded">
              <button
                disabled={value <= 0}
                onClick={handleDecrease}
                className="px-2 text-xl"
              >
                -
              </button>
              <input
                className="text-gray-700 text-center w-16"
                value={unit === "KG" ? value.toFixed(1) : value}
                readOnly
              />
              <button onClick={handleIncrease} className="px-2 text-xl">
                +
              </button>
            </div>
            <p className="text-sm text-gray-500 italic">
              {unit === "KG"
                ? "Cada clique representa 100g (0.1 Kg)"
                : "Cada clique adiciona 1 unidade"}
            </p>
          </div>

          <DialogFooter>
            <Button
              onClick={handlePurchase}
              disabled={value <= 0}
              className={`${
                value <= 0 ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
              } text-white`}
            >
              {editingItem ? "Salvar" : "Adicionar"}
            </Button>
            <Button
              onClick={handleCancel}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <CartSidebar />
    </>
  );
}
