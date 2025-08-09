import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const doctors = [
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

const DoctorsPage = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        These doctors are associated with <span className="text-blue-600">VERIMED</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor, index) => (
          <Card
            key={index}
            className="w-full hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{doctor.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{doctor.specialization}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DoctorsPage;
