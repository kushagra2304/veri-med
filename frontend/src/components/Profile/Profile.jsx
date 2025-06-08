import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Profile() {
  const [editMode, setEditMode] = useState(false);

  const [user, setUser] = useState({
    name: "Kushagra Sharma",
    email: "kushagra@example.com",
    gender: "Male",
    age: 24,
    password: "kushagra",
    isDoctor: false,
  });

  const [form, setForm] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    setUser(form);
    setEditMode(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-6">User Profile</h1>

      <Card className="max-w-md mx-auto shadow-lg">
        <CardContent className="space-y-4 p-6">
          {editMode ? (
            <>
              <Input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
              />
              <Input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
              />
              <Input
                name="gender"
                placeholder="Gender"
                value={form.gender}
                onChange={handleChange}
              />
              <Input
                name="age"
                type="number"
                placeholder="Age"
                value={form.age}
                onChange={handleChange}
              />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isDoctor"
                  checked={form.isDoctor}
                  onChange={handleChange}
                />
                <label className="text-gray-700">Is Doctor</label>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save</Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Name:</span>
                <span>{user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Email:</span>
                <span>{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Gender:</span>
                <span>{user.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Age:</span>
                <span>{user.age}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Password:</span>
                <span>{user.password}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Doctor Status:</span>
                <Badge variant={user.isDoctor ? "default" : "outline"}>
                  {user.isDoctor ? "Doctor" : "User"}
                </Badge>
              </div>

              <div className="flex justify-end mt-4">
                <Button onClick={() => setEditMode(true)}>Edit</Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
