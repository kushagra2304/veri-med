import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import axios from "axios";
import { useAuth } from "@/context/ContextAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {login}= useAuth();

  const handleRoleChange = (newRole) => {
    if (newRole) {
      setRole(newRole);
      setError("");
    }
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  const loginData = { email, password, role };

  try {
    const response = await axios.post("https://veri-med.onrender.com/api/login", loginData);

    console.log("Login API response:", response.data);
    console.log("Selected role:", role);

    if (response.status === 200 && response.data.token) {
      // Save auth data
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Store in auth context
      login(response.data.user);

      // Redirect based on role
      if (role === "doctor") {
        navigate("/doctor");
      } else {
        navigate("/userdashboard");
      }
    } else {
      setError("Invalid credentials, please try again.");
    }
  } catch (err) {
    console.error("Login failed:", err);
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
          <ToggleGroup
            type="single"
            value={role}
            onValueChange={handleRoleChange}
            className="mb-6 flex justify-center"
          >
            <ToggleGroupItem
              value="user"
              className={`px-4 py-2 rounded-full text-sm ${
                role === "user" ? "bg-[#010D2A] text-white" : "bg-gray-100"
              }`}
            >
              User
            </ToggleGroupItem>
            <ToggleGroupItem
              value="doctor"
              className={`px-4 py-2 rounded-full text-sm ${
                role === "doctor" ? "bg-[#010D2A] text-white" : "bg-gray-100"
              }`}
            >
              Doctor
            </ToggleGroupItem>
          </ToggleGroup>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-full px-4 py-2 border border-gray-300"
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-full px-4 py-2 border border-gray-300"
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-[#010D2A] hover:bg-blue-950 text-white py-2 rounded-full"
            >
              Login
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer font-medium"
              onClick={() => navigate(`/signup/${role}`)}
            >
              Sign up as {role === "user" ? "User" : "Doctor"}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
