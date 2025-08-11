import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

const doctors = [
  { 
    name: "Dr. Ayesha Khan", 
    specialization: "Cardiologist", 
    description: "Expert in heart-related diseases and treatments.", 
    location: "Delhi, India",
    mobile: "+91 98765 43210"
  },
  { 
    name: "Dr. Rohan Mehta", 
    specialization: "Neurologist", 
    description: "Specializes in brain, spinal cord, and nerve disorders.", 
    location: "Mumbai, India",
    mobile: "+91 91234 56789"
  },
  { 
    name: "Dr. Priya Sharma", 
    specialization: "Dermatologist", 
    description: "Experienced in treating skin, hair, and nail disorders.", 
    location: "Bangalore, India",
    mobile: "+91 99887 77665"
  },
  { 
    name: "Dr. Arjun Verma", 
    specialization: "Orthopedic", 
    description: "Focuses on bones, joints, and musculoskeletal issues.", 
    location: "Chennai, India",
    mobile: "+91 90012 34567"
  },
  { 
    name: "Dr. Kavita Joshi", 
    specialization: "Gynecologist", 
    description: "Specialist in women's reproductive health.", 
    location: "Hyderabad, India",
    mobile: "+91 98888 11122"
  },
  { 
    name: "Dr. Sameer Das", 
    specialization: "Pediatrician", 
    description: "Provides medical care for infants, children, and adolescents.", 
    location: "Kolkata, India",
    mobile: "+91 97777 55544"
  },
  { 
    name: "Dr. Meenal Patel", 
    specialization: "Psychiatrist", 
    description: "Specializes in mental health, including depression and anxiety.", 
    location: "Pune, India",
    mobile: "+91 95555 66677"
  },
  { 
    name: "Dr. Nikhil Roy", 
    specialization: "Oncologist", 
    description: "Expert in diagnosing and treating different types of cancer.", 
    location: "Ahmedabad, India",
    mobile: "+91 92233 44556"
  },
  { 
    name: "Dr. Alia Sheikh", 
    specialization: "Dentist", 
    description: "Specializes in oral health and dental surgeries.", 
    location: "Jaipur, India",
    mobile: "+91 91122 33445"
  },
  { 
    name: "Dr. Karan Kapoor", 
    specialization: "ENT Specialist", 
    description: "Treats ear, nose, and throat disorders.", 
    location: "Lucknow, India",
    mobile: "+91 98876 54321"
  }
];


const DoctorsPage = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        These doctors are associated with <span className="text-blue-600">VERIMED</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <Card className="w-full hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{doctor.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{doctor.specialization}</p>
                </CardContent>
              </Card>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>{doctor.name}</DialogTitle>
                <DialogDescription>{doctor.specialization}</DialogDescription>
              </DialogHeader>
              <p className="mt-4 text-gray-700">
                {doctor.description || "No additional details available."}
              </p>
                <p className="mt-2 text-gray-600">Location: {doctor.location}</p>
                <p className="mt-2 text-gray-600">Mobile: {doctor.mobile}</p>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default DoctorsPage;
