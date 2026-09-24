"use client";
import { useState } from "react";

const mockData = [
  {
    id: 1,
    productName: "Emzor Paracetamol 500mg",
    nafdacRegNo: "04-1234",
    status: "APPROVED",
    activeIngredient: "Paracetamol",
    riskReason: "Passed full chemical purity and potency checks.",
    genericAlternative: "GeneRx Paracetamol 500mg (Save ~30%)",
  },
  {
    id: 2,
    productName: "FakeCure Cough Syrup",
    nafdacRegNo: "A6-9999",
    status: "RECALLED",
    activeIngredient: "Diethylene Glycol",
    riskReason: "Contaminated batch flagged in recent NAFDAC regulatory alert.",
    genericAlternative: "N/A - Avoid Usage",
  },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(mockData);
  const [loading, setLoading] = useState(false);

  const handleSearch = (term) => {
    setQuery(term);
    setLoading(true);

    setTimeout(() => {
      if (!term.trim()) {
        setResults(mockData);
      } else {
        const filtered = mockData.filter(
          (item) =>
            item.productName.toLowerCase().includes(term.toLowerCase()) ||
            item.nafdacRegNo.toLowerCase().includes(term.toLowerCase())
        );
        setResults(filtered);
      }
      setLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-teal-100 text-slate-800 font-sans pb-16">
      {/* She Code Africa & Apify Vibrant Header */}
      <header className="bg-gradient-to-r from-purple-900 via-indigo-800 to-teal-700 text-white py-14 px-6 shadow-xl border-b-4 border-orange-500">
        <div className="max-w-4xl mx-auto text-center">
          {/* Brand Badges */}
          {/* <div className="flex justify-center items-center gap-3 mb-4 flex-wrap">
            <span className="bg-orange-500 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
              Orange & Green: Apify
            </span>
            <span className="bg-purple-600 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md border border-purple-400">
              Purple & Teal: She Code Africa
            </span>
          </div> */}

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-cyan-200">
            Pharmify
          </h1>
          <p className="text-teal-100 text-lg font-medium max-w-xl mx-auto">
            Instant NAFDAC drug verification, safety alerts & generic alternatives.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto px-6 -mt-8">
        {/* Glowing Search Bar Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-4 border-2 border-purple-200 mb-8 transform transition hover:scale-[1.01]">
          <div className="relative flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search drug name or NAFDAC No (e.g. Paracetamol)..."
              className="w-full pl-5 pr-14 py-4 text-lg rounded-xl border-2 border-teal-300 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-purple-600 text-slate-900 placeholder-slate-400 font-medium bg-slate-50"
            />
            <button className="absolute right-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-4 py-2.5 rounded-lg shadow-md transition-all">
              Search
            </button>
          </div>
        </div>

        {/* Results Section */}
        {loading ? (
          <div className="text-center py-12 text-purple-800 font-bold text-lg animate-pulse bg-white/80 rounded-2xl border border-purple-200 shadow-md">
            ⚡ Processing via Apify AI backend...
          </div>
        ) : (
          <div className="space-y-6">
            {results.length > 0 ? (
              results.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-6 shadow-xl border-2 border-indigo-100 hover:border-purple-300 transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-black text-purple-950">
                        {item.productName}
                      </h2>
                      <p className="text-sm font-bold text-teal-700 font-mono mt-1 bg-teal-50 inline-block px-2.5 py-1 rounded-md border border-teal-200">
                        NAFDAC REG: {item.nafdacRegNo}
                      </p>
                    </div>
                    <span
                      className={`px-4 py-1.5 text-xs font-black rounded-full uppercase tracking-wider shadow-sm ${
                        item.status === "APPROVED"
                          ? "bg-emerald-500 text-white border-2 border-emerald-600"
                          : "bg-rose-600 text-white border-2 border-rose-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="border-t border-slate-100 pt-4 mt-2 space-y-3">
                    <p className="text-slate-700 text-base">
                      <strong className="text-purple-900 font-bold">Active Ingredient:</strong>{" "}
                      <span className="font-semibold text-slate-800">{item.activeIngredient}</span>
                    </p>
                    <p className="text-slate-700 text-base">
                      <strong className="text-purple-900 font-bold">Safety Summary:</strong>{" "}
                      <span className="text-slate-700">{item.riskReason}</span>
                    </p>
                    
                    {item.status === "APPROVED" ? (
                      <div className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-xl p-4 font-bold shadow-md">
                        💡 <strong>Generic Alternative:</strong> {item.genericAlternative}
                      </div>
                    ) : (
                      <div className="bg-rose-50 border-2 border-rose-200 text-rose-900 rounded-xl p-4 font-bold">
                        ⚠️ <strong>Warning:</strong> Product flagged. Do not purchase or ingest.
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border-2 border-slate-200 text-slate-600 font-bold shadow-md">
                No matching drug records found.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}