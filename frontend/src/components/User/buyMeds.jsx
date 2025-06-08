import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { mockMedicines } from "./mockData";

export default function BuyMeds() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(mockMedicines); // show all by default

  const handleSearch = () => {
    const filtered = mockMedicines.filter((med) =>
      med.name.toLowerCase().includes(search.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Buy Medicines</h1>

      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Search for medicine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      <ul className="space-y-4">
        {results.length > 0 ? (
          results.map((med, idx) => (
            <li key={idx} className="p-4 bg-white rounded shadow">
              <h2 className="text-lg font-bold">{med.name}</h2>
              <p>{med.description}</p>
              <p className="text-blue-600 font-semibold">{med.price}</p>
              <Button className="mt-2">Buy Now</Button>
            </li>
          ))
        ) : (
          <p className="text-gray-600">No results found.</p>
        )}
      </ul>
    </div>
  );
}
