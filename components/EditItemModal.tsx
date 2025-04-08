"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/app/stores/cartStore";
import Image from "next/image";

export default function EditItemModal() {
  const editingItem = useCartStore((state) => state.editingItem);
  const finishEditingItem = useCartStore((state) => state.finishEditingItem);

  const [unit, setUnit] = useState<"KG" | "UN">("KG");
  const [value, setValue] = useState(0);

  const isUnitOnly = editingItem
    ? ["UN", "BANDEJA"].includes(editingItem.measure.toUpperCase())
    : false;

  useEffect(() => {
    if (editingItem) {
      setUnit(
        editingItem.unit === "unidades"
          ? "UN"
          : (editingItem.unit as "KG" | "UN")
      );
      setValue(editingItem.quantity);
    }
  }, [editingItem]);

  if (!editingItem) return null;

  const handleSave = () => {
    const updatedItem = {
      ...editingItem,
      unit,
      quantity: value,
      measure: unit,
    };

    finishEditingItem(updatedItem);
  };

  return (
    <Dialog
      open={!!editingItem}
      onOpenChange={() => finishEditingItem(editingItem)}
    >
      <DialogContent>
        <DialogTitle>Editar item</DialogTitle>
        <DialogDescription>
          Ajuste a quantidade de {editingItem.name}
        </DialogDescription>

        <div className="flex items-center space-x-4 my-4 p-4 bg-gray-100 rounded">
          <Image
            src={editingItem.image}
            alt={editingItem.name}
            width={50}
            height={50}
            className="rounded"
          />
          <div>
            <h3 className="text-lg font-semibold">{editingItem.name}</h3>
            <p className="text-sm text-gray-500">
              R$ {editingItem.price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600 italic">
              Preço por {editingItem.measure}
            </p>
          </div>
        </div>

        {/* Seletor de Unidade */}
        <div className="mb-4">
          <label className="font-medium text-sm text-gray-700">
            Como deseja comprar?
          </label>
          <div className="flex gap-6 mt-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="unit"
                value="UN"
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
                  value="KG"
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

        {/* Controle de Quantidade */}
        <div className="flex flex-col space-y-4">
          <div className="p-2 border flex justify-between items-center rounded">
            <button
              disabled={value <= 0}
              onClick={() =>
                setValue((prev) =>
                  unit === "KG" ? parseFloat((prev - 0.1).toFixed(2)) : prev - 1
                )
              }
              className="px-2 text-xl"
            >
              -
            </button>

            <input
              className="text-gray-700 text-center w-16"
              value={unit === "KG" ? value.toFixed(1) : value}
              readOnly
            />

            <button
              onClick={() =>
                setValue((prev) =>
                  unit === "KG" ? parseFloat((prev + 0.1).toFixed(2)) : prev + 1
                )
              }
              className="px-2 text-xl"
            >
              +
            </button>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button
            onClick={handleSave}
            disabled={value <= 0}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Salvar
          </Button>
          <Button
            onClick={() => finishEditingItem(editingItem)}
            className="bg-gray-500 text-white hover:bg-gray-600"
          >
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
