import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SignupPage() {
  const { role } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    gender: "",
    age: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("https://verimed.onrender.com/auth/signup", {
        ...user,
        role,
      });

      if (response.status === 201 || response.status === 200) {
        navigate("/");
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 px-4">
      <Card className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-[#010D2A]">
            <span className="inline-block text-4xl font-bold text-[#010D2A] border-b-4 border-red-600 pb-1">
              VER<span className="text-red-600">+</span>MED
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* Doctor Status Badge */}
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium text-gray-700">Doctor Status:</span>
            <Badge variant={role === "doctor" ? "default" : "outline"}>
              {role === "doctor" ? "DOCTOR" : "NOT A DOCTOR"}
            </Badge>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <Input
              name="name"
              type="text"
              placeholder="Name"
              value={user.name}
              onChange={handleChange}
              className="rounded-full px-4 py-2 border border-gray-300"
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              className="rounded-full px-4 py-2 border border-gray-300"
              required
            />
            <Input
              name="gender"
              type="text"
              placeholder="Gender"
              value={user.gender}
              onChange={handleChange}
              className="rounded-full px-4 py-2 border border-gray-300"
              required
            />
            <Input
              name="age"
              type="number"
              placeholder="Age"
              value={user.age}
              onChange={handleChange}
              className="rounded-full px-4 py-2 border border-gray-300"
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              className="rounded-full px-4 py-2 border border-gray-300"
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-[#010D2A] hover:bg-blue-950 text-white py-2 rounded-full"
            >
              Create Account
            </Button>
          </form>

          {/* Already have an account? */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-blue-600 hover:underline cursor-pointer font-medium"
            >
              Login
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
