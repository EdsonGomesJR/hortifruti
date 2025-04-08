import { NextResponse } from "next/server";
import { processData } from "@/app/utils/processData";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "apiData.json"); // Caminho do arquivo JSON

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveToJsonFile(data: any): void {
  if (data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    console.log("Dados salvos em apiData.json");
  } else {
    console.error("Tentativa de salvar dados undefined no arquivo JSON.");
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function readJsonFile(): any | null {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  }
  return null;
}

export async function GET() {
  try {
    const response = await fetch(
      "https://memobox.app/pomarehorta/lista/produtos"
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Erro ao buscar dados da API." },
        { status: response.status }
      );
    }

    const data = await response.json();
    const processedData = processData(data);

    // Verifique se processedData é válido antes de salvar
    if (processedData) {
      const existingData = readJsonFile();

      if (
        !existingData ||
        JSON.stringify(existingData) !== JSON.stringify(processData)
      ) {
        saveToJsonFile(processedData);
      } else {
        console.log(
          "Os dados não foram alterados. Nenhuma Atualização necessária."
        );
      }
    } else {
      console.error("processedData é undefined ou null.");
    }

    return NextResponse.json(processedData);
  } catch (error) {
    console.error("Erro ao chamar a API:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
