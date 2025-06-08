import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";

export default function PdfTextExtractor() {
  const [pdfText, setPdfText] = useState("");
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async function () {
      const typedArray = new Uint8Array(reader.result);
      const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;

      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map((item) => item.str).join(" ");
        fullText += strings + "\n";
      }
      setPdfText(fullText);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Upload PDF and Extract Text
      </h2>

      <div className="flex flex-col items-center gap-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
          ref={fileInputRef}
          className="hidden"
        />
        <Button onClick={() => fileInputRef.current.click()}>
          Upload PDF
        </Button>
      </div>

      {pdfText && (
        <div className="mt-6 p-4 bg-gray-100 border rounded-lg text-gray-700 whitespace-pre-wrap max-h-[400px] overflow-y-auto">
          <strong>Extracted Text:</strong>
          <p>{pdfText}</p>
        </div>
      )}
    </div>
  );
}
