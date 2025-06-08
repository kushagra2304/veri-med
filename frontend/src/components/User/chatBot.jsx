import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Replace with your actual Gemini API key
const genAI = new GoogleGenerativeAI("AIzaSyC0AfAPLZ91hDa-DhjBooUpzWW9swTpr5c");

export default function HealthAdviceChat() {
  const [symptoms, setSymptoms] = useState("");
  const [disease, setDisease] = useState("");
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `
        A patient has the following symptoms: ${symptoms}.
        They suspect this disease: ${disease}.
        Should they consult a doctor? Answer yes/no and give a short reason.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      setAdvice(text);
    } catch (error) {
      console.error("Gemini API error:", error);
      setAdvice("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Symptom-Based Health Advice
      </h2>

      <div className="space-y-4">
        <Input
          placeholder="Enter your symptoms (e.g. fever, cough, headache)"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />
        <Input
          placeholder="Suspected disease (optional)"
          value={disease}
          onChange={(e) => setDisease(e.target.value)}
        />

        <Button
          onClick={handleSubmit}
          className="bg-blue-600 text-white hover:bg-blue-700 w-full"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Get Advice"}
        </Button>

        {advice && (
          <div className="mt-6 p-4 bg-gray-100 border rounded-lg text-gray-700 whitespace-pre-line">
            <strong>Advice:</strong> {advice}
          </div>
        )}
      </div>
    </div>
  );
}
