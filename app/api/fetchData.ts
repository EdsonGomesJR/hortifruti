// pages/api/fetchData.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import fs from "fs";
import path from "path";
import { ApiResponse } from "@/app/types";

const filePath = path.join(process.cwd(), "public/apiData.json");

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
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

      res.status(200).json({ message: "Dados processados com sucesso." });
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
      res.status(500).json({ message: "Erro ao buscar dados da API" });
    }
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}
