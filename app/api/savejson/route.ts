// apiHandler.ts
import axios from "axios";
import fs from "fs";
import path from "path";
import { ApiResponse } from "@/app/types";

const filePath = path.join(__dirname, "apiData.json");

function readJsonFile(): ApiResponse[] | null {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data) as ApiResponse[];
  }
  return null;
}

function saveToJsonFile(data: ApiResponse[]): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

function hasDataChanged(
  newData: ApiResponse[],
  existingData: ApiResponse[]
): boolean {
  return JSON.stringify(newData) !== JSON.stringify(existingData);
}

export async function fetchAndSaveData() {
  try {
    const response = await axios.get<ApiResponse[]>(
      "https://memobox.app/pomarehorta/lista/produtos"
    );
    const newData = response.data;
    const existingData = readJsonFile();

    if (!existingData || hasDataChanged(newData, existingData)) {
      saveToJsonFile(newData);
      console.log("Dados atualizados e salvos em apiData.json");
    } else {
      console.log("Nenhuma alteração nos dados.");
    }
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
  }
}

export function addDataToJson(newItem: ApiResponse) {
  const existingData = readJsonFile() || [];
  existingData.push(newItem);
  saveToJsonFile(existingData);
  console.log("Novo item adicionado ao JSON.");
}
