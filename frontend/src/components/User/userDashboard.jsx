import UserSidebar from "./userSideBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  BotIcon,
  Search,
  Upload,
  Laptop,
  Cloud,
  Clock,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import axios from "axios";

export default function UserDashboard() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [uploadResponse, setUploadResponse] = useState("");
  const cardRef = useRef(null);
  const chatbotButtonRef = useRef(null);

  const [query, setQuery] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const mockDoctors = [
    { name: "Dr. Ayesha Khan", specialization: "Cardiologist" },
    { name: "Dr. Rohan Mehta", specialization: "Neurologist" },
    { name: "Dr. Priya Sharma", specialization: "Dermatologist" },
    { name: "Dr. Arjun Verma", specialization: "Orthopedic" },
    { name: "Dr. Kavita Joshi", specialization: "Gynecologist" },
    { name: "Dr. Sameer Das", specialization: "Pediatrician" },
    { name: "Dr. Meenal Patel", specialization: "Psychiatrist" },
    { name: "Dr. Nikhil Roy", specialization: "Oncologist" },
    { name: "Dr. Alia Sheikh", specialization: "Dentist" },
    { name: "Dr. Karan Kapoor", specialization: "ENT Specialist" },
    { name: "Dr. Sneha Reddy", specialization: "Radiologist" },
    { name: "Dr. Ravi Chandra", specialization: "Anesthesiologist" },
    { name: "Dr. Neha Singh", specialization: "Pulmonologist" },
    { name: "Dr. Harsh Vardhan", specialization: "Gastroenterologist" },
    { name: "Dr. Isha Malhotra", specialization: "Endocrinologist" },
    { name: "Dr. Aditya Jain", specialization: "Urologist" },
    { name: "Dr. Tanvi Nair", specialization: "Nephrologist" },
    { name: "Dr. Mohit Saxena", specialization: "Hematologist" },
    { name: "Dr. Ritu Agarwal", specialization: "Rheumatologist" },
    { name: "Dr. Yuvraj Bansal", specialization: "General Physician" },
  ];

  useEffect(() => {
    gsap.fromTo(cardRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 });
    gsap.fromTo(chatbotButtonRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, delay: 0.5 });
  }, []);

  const handleSearch = () => {
    const q = query.toLowerCase().trim();
    if (!q) return;
    const results = mockDoctors.filter(
      (doc) =>
        doc.name.toLowerCase().includes(q) ||
        doc.specialization.toLowerCase().includes(q)
    );
    setFilteredDoctors(results);
    setShowResults(true);
  };

  const handleDeviceUpload = () => {
    fileInputRef.current?.click();
  };

  // Cloudinary direct upload handler
  const handleCloudinaryUpload = async (e) => {
  const file = e.target.files[0];
  if (!file || file.type !== "application/pdf") {
    alert("Please select a PDF file");
    return;
  }

  // 1. Upload to Cloudinary
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "veri-med");

  try {
    setUploadResponse("⏳ Uploading to Cloudinary...");
    const cloudinaryRes = await axios.post(
      "https://api.cloudinary.com/v1_1/dsejopp0u/raw/upload",
      formData
    );
    const cloudinaryUrl = cloudinaryRes.data.secure_url;
    console.log("Cloudinary upload successful:", cloudinaryUrl);
    setUploadResponse(`✅ Uploaded to Cloudinary!\n\nURL:\n${cloudinaryUrl}`);

    // 2. Send the file to the AI model for processing
    setUploadResponse("⏳ Sending file to AI model for processing...");
    const aiFormData = new FormData();
    aiFormData.append("file", file);
    const aiResponse = await axios.post(
      "https://verimed-ai.onrender.com/upload",
      aiFormData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    console.log("AI Model Response:", aiResponse.data.result);

    setUploadResponse(
      `✅ File processed by AI model!\n\n${JSON.stringify(aiResponse.data.result, null, 2)}\n\nCloudinary URL: ${cloudinaryUrl}`
    );

    // // 3. Send the Cloudinary URL to your backend for DB storage
    await axios.post("http://localhost:5000/documents", {
      fileUrl: cloudinaryUrl,
      // add any other info you want to save
    });

  } catch (err) {
    console.error("Upload or processing error:", err);
    setUploadResponse("❌ Failed to upload or process. Please check console.");
  }
};

  return (
    <div className="relative h-screen w-full overflow-hidden bg-blue-200">
      <UserSidebar />

      <div className="flex items-center justify-center h-full px-4 sm:px-8">
        <div ref={cardRef} className="w-full max-w-xl p-8 bg-white rounded-2xl shadow-md">
          <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
            WELCOME TO{" "}
            <span className="inline-block text-4xl font-bold text-[#010D2A] border-b-4 border-red-600 pb-1">
              VER<span className="text-red-600">+</span>MED
            </span>
          </h1>

          {/* Search Section */}
          <div className="relative mb-8">
            <div className="flex items-center gap-3">
              <Input
                type="text"
                placeholder="Search doctors by name or specialization"
                className="flex-1 px-4 py-2 rounded-full border border-gray-300"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowResults(false);
                }}
              />
              <Button
                className="bg-[#010D2A] hover:bg-blue-950 text-white px-6 py-2 rounded-full flex items-center gap-2"
                onClick={handleSearch}
              >
                <Search size={18} /> Search
              </Button>
            </div>

            {query && !showResults && (
              <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {mockDoctors
                  .filter(
                    (doc) =>
                      doc.name.toLowerCase().includes(query.toLowerCase()) ||
                      doc.specialization.toLowerCase().includes(query.toLowerCase())
                  )
                  .slice(0, 5)
                  .map((doc, idx) => (
                    <li
                      key={idx}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800"
                      onClick={() => {
                        setQuery(doc.name);
                        setShowResults(false);
                      }}
                    >
                      {doc.name} — {doc.specialization}
                    </li>
                  ))}
              </ul>
            )}
          </div>

          {showResults && filteredDoctors.length > 0 && (
            <div className="bg-gray-100 p-4 rounded-lg max-h-60 overflow-y-auto mb-4">
              <h2 className="text-lg font-semibold mb-2 text-gray-700">Search Results:</h2>
              <ul className="space-y-2">
                {filteredDoctors.map((doc, index) => (
                  <li key={index} className="text-gray-800">
                    <strong>{doc.name}</strong> — {doc.specialization}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Upload Section */}
          <div className="flex flex-col gap-4">
            <input
              type="file"
              accept="application/pdf"
              ref={fileInputRef}
              className="hidden"
              onChange={handleCloudinaryUpload}
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-[#010D2A] hover:bg-blue-950 text-white w-full py-2 rounded-full flex items-center gap-2 justify-center">
                  <Upload size={18} /> Upload File for Analysis
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleDeviceUpload} className="flex items-center gap-2">
                  <Laptop size={16} /> From Device
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => alert("Google Drive integration coming soon!")}
                  className="flex items-center gap-2"
                >
                  <Cloud size={16} /> From Google Drive
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {uploadResponse && (
              <pre className="text-sm text-gray-600 bg-gray-100 p-3 rounded-lg whitespace-pre-wrap">
                {uploadResponse}
              </pre>
            )}

            <Button
              variant="outline"
              className="w-full border border-gray-300 py-2 rounded-full text-gray-700 hover:bg-gray-100 flex items-center gap-2 justify-center"
              onClick={() => navigate("/user/history")}
            >
              <Clock size={18} /> View Past History
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
}