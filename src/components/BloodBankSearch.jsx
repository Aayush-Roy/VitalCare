import React, { useState } from "react";
import { Search } from "lucide-react";

const BloodBankSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const bloodBanks = [
    { id: 1, name: "Red Cross Blood Bank", city: "Delhi", state: "Delhi", contact: "011-12345678" },
    { id: 2, name: "Apollo Blood Bank", city: "Chennai", state: "Tamil Nadu", contact: "044-87654321" },
    { id: 3, name: "Sanjeevani Blood Bank", city: "Mumbai", state: "Maharashtra", contact: "022-23456789" },
    { id: 4, name: "Lifeline Blood Center", city: "Kolkata", state: "West Bengal", contact: "033-34567890" },
    { id: 5, name: "Healing Touch Blood Bank", city: "Bangalore", state: "Karnataka", contact: "080-98765432" },
  ];

  const filteredBloodBanks = bloodBanks.filter(
    (bank) =>
      bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bank.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bank.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Blood Bank Search</h1>
      
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search by name, city, or state..."
          className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {filteredBloodBanks.length > 0 ? (
          filteredBloodBanks.map((bank) => (
            <div key={bank.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900">{bank.name}</h3>
              <p className="text-gray-600">{bank.city}, {bank.state}</p>
              <p className="text-gray-800 font-medium">Contact: {bank.contact}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default BloodBankSearch;
