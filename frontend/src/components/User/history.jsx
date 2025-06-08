import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function History() {
  const [historyItems, setHistoryItems] = useState([]);

  useEffect(() => {
    // Replace with API call in real usage
    const uploadedPDFs = [
      {
        id: 1,
        fileName: "blood_report.pdf",
        url: "https://res.cloudinary.com/dsejopp0u/image/upload/v12345/blood_report.pdf",
        uploadedAt: "2024-12-15",
      },
      {
        id: 2,
        fileName: "xray_scan.pdf",
        url: "https://res.cloudinary.com/dsejopp0u/image/upload/v12346/xray_scan.pdf",
        uploadedAt: "2025-01-10",
      },
    ];

    const summaries = [
      {
        id: 1,
        summary: "Mild anemia detected. Suggest further hemoglobin tests.",
        date: "2024-12-15",
      },
      {
        id: 2,
        summary: "No major issues in chest x-ray. Slight inflammation noted.",
        date: "2025-01-10",
      },
    ];

    // Combine data by id or index
    const merged = uploadedPDFs.map((pdf, index) => ({
      ...pdf,
      summary: summaries[index]?.summary || "No summary available.",
    }));

    setHistoryItems(merged);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-6">User History</h1>

      {historyItems.length > 0 ? (
        historyItems.map((item) => (
          <Card key={item.id} className="mb-4">
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.fileName}</p>
                  <p className="text-sm text-gray-500">Uploaded on {item.uploadedAt}</p>
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View PDF
                </a>
              </div>
              <p className="text-gray-700 mt-2">
                <span className="font-semibold">Summary:</span> {item.summary}
              </p>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-gray-500">No history found.</p>
      )}
    </div>
  );
}
