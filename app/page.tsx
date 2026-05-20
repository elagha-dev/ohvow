"use client";

import { useState } from "react";
import type { SearchForm, SearchResponse } from "@/types";

export default function Page() {
  const [form, setForm] = useState<SearchForm>({
    departureCity: "",
    checkIn: "",
    checkOut: "",
    guests: 2,
  });
  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function search() {
    setLoading(true);
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json: SearchResponse = await res.json();
      setData(json);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-light mb-2">Honeymoon Intelligence</h1>
        <p className="text-white/50 mb-8 text-sm">
          Curated destinations, matched to you
        </p>

        <div className="grid gap-3 bg-white/5 p-4 rounded-xl backdrop-blur border border-white/10">
          <input
            placeholder="Departure city (e.g. Düsseldorf, Berlin)"
            className="p-3 bg-black/40 rounded-lg border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
            value={form.departureCity}
            onChange={(e) => setForm({ ...form, departureCity: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              className="p-3 bg-black/40 rounded-lg border border-white/10 text-white focus:outline-none focus:border-white/30"
              value={form.checkIn}
              onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
            />
            <input
              type="date"
              className="p-3 bg-black/40 rounded-lg border border-white/10 text-white focus:outline-none focus:border-white/30"
              value={form.checkOut}
              onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-3 px-1">
            <span className="text-white/50 text-sm">Guests</span>
            <input
              type="number"
              min={1}
              max={20}
              className="w-20 p-2 bg-black/40 rounded-lg border border-white/10 text-white focus:outline-none focus:border-white/30"
              value={form.guests}
              onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
            />
          </div>

          <button
            onClick={search}
            disabled={loading}
            className="bg-white text-black p-3 rounded-lg font-medium hover:bg-white/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Searching..." : "Discover Honeymoons"}
          </button>
        </div>

        {data?.airport && (
          <p className="mt-4 text-white/40 text-sm">
            Searching flights from <span className="text-white/70">{data.airport}</span>
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {data?.results?.map((r) => (
            <div
              key={r.id}
              className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="flex gap-2 flex-wrap mb-3">
                {r.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-light">{r.name}</h3>
              <p className="text-white/50 text-sm mt-1">{r.country}</p>
              <p className="mt-3 text-lg">
                From <span className="font-medium">€{r.priceFrom.toLocaleString()}</span>
              </p>
              <p
                className={`text-xs mt-1 ${
                  r.availability === "high"
                    ? "text-green-400/70"
                    : r.availability === "medium"
                    ? "text-yellow-400/70"
                    : "text-red-400/70"
                }`}
              >
                {r.availability === "high"
                  ? "Good availability"
                  : r.availability === "medium"
                  ? "Limited availability"
                  : "Very limited"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
