import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext , useAuth} from "@/context/ContextAuth"; // import your auth context

export default function History() {
  const [historyItems, setHistoryItems] = useState([]);
  const { user } = useAuth(); // get user from context

  useEffect(() => {
    if (!user?.id) return; // don't fetch until we have a user ID

    const fetchHistory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/documents-pull", {
          params: { user_id: user.id }, // send user_id as query param
        });
        setHistoryItems(res.data.documents || []);
      } catch (err) {
        console.error("Failed to fetch history:", err);
        setHistoryItems([]);
      }
    };

    fetchHistory();
  }, [user?.id]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-6">User History</h1>

      {historyItems.length > 0 ? (
        historyItems.map((item) => (
          <Card key={item.id} className="mb-4">
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.file_name || "Document"}</p>
                  <p className="text-sm text-gray-500">
                    Uploaded on {item.uploaded_at ? item.uploaded_at.split("T")[0] : "N/A"}
                  </p>
                </div>
                <div className="flex gap-4">
                  <a
                    href={item.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View
                  </a>
                  <a
                    href={item.file_url}
                    download
                    className="text-green-600 underline"
                  >
                    Download
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-gray-500">No history found.</p>
      )}
    </div>
  );
}
