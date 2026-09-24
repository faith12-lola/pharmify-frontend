'use client';

import { useState } from 'react';

// Hardcoded sample data directly in the file to eliminate import errors
const mockData = [
  {
    "dataType": "REGISTERED_DRUG",
    "productName": "Emzor Paracetamol 500mg",
    "nafdacRegNo": "04-1234",
    "activeIngredient": "Paracetamol",
    "manufacturer": "Emzor Pharmaceutical Ind. Ltd.",
    "status": "APPROVED",
    "genericAlternative": "Paracetamol BP 500mg (Generic)"
  },
  {
    "dataType": "REGISTERED_DRUG",
    "productName": "Augmentin 625mg",
    "nafdacRegNo": "04-5678",
    "activeIngredient": "Amoxicillin / Clavulanic Acid",
    "manufacturer": "GlaxoSmithKline",
    "status": "APPROVED",
    "genericAlternative": "Amoxiclav 625mg (Generic)"
  },
  {
    "dataType": "RECALL_ALERT",
    "productName": "Unverified Cough Syrup Batch #881",
    "nafdacRegNo": "04-9999",
    "activeIngredient": "Promethazine",
    "manufacturer": "Unknown Laboratory",
    "status": "RECALLED",
    "reason": "Flagged by NAFDAC for harmful contaminants"
  }
];

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(mockData);

  const handleSearch = (term) => {
    setQuery(term);
    if (!term.trim()) {
      setResults(mockData);
    } else {
      const filtered = mockData.filter(item =>
        item.productName.toLowerCase().includes(term.toLowerCase()) ||
        item.nafdacRegNo.toLowerCase().includes(term.toLowerCase())
      );
      setResults(filtered);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Pharmify</h1>
            <p className="text-sm text-gray-500">NAFDAC Drug Verification Engine</p>
          </div>
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
            🟢 Powered by Apify
          </span>
        </div>

        {/* Search Box */}
        <div className="bg-white p-4 rounded-xl shadow-sm border mb-6">
          <input
            type="text"
            placeholder="Search drug name (e.g. Paracetamol) or Reg No..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full border p-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Quick Demo Presets */}
          <div className="flex gap-2 mt-3 text-xs">
            <span className="text-gray-400">Click to test:</span>
            <button 
              onClick={() => handleSearch('Emzor')} 
              className="text-blue-600 underline font-semibold"
            >
              Verified Drug
            </button>
            <button 
              onClick={() => handleSearch('Cough')} 
              className="text-red-600 underline font-semibold"
            >
              Recalled Drug
            </button>
            <button 
              onClick={() => handleSearch('')} 
              className="text-gray-500 underline ml-auto"
            >
              Show All
            </button>
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          {results.map((drug, index) => (
            <div key={index} className="bg-white p-5 rounded-xl border shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-bold text-lg text-gray-900">{drug.productName}</h2>
                  <p className="text-xs text-gray-500">Active Ingredient: {drug.activeIngredient}</p>
                </div>
                
                {drug.status === 'APPROVED' ? (
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded-full">
                    🟢 Approved
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 text-xs font-bold px-2.5 py-1 rounded-full">
                    🔴 Recalled
                  </span>
                )}
              </div>

              <div className="text-xs text-gray-600 mt-3 pt-2 border-t flex justify-between">
                <span>NAFDAC Reg No: <strong>{drug.nafdacRegNo}</strong></span>
                <span>Manufacturer: {drug.manufacturer}</span>
              </div>

              {drug.reason && (
                <div className="mt-2 bg-red-50 text-red-700 text-xs p-2 rounded border border-red-200">
                  ⚠️ {drug.reason}
                </div>
              )}

              {drug.genericAlternative && (
                <div className="mt-2 bg-blue-50 text-blue-800 text-xs p-2 rounded border border-blue-200 font-medium">
                  💡 Generic Alternative: {drug.genericAlternative}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}