import { NextRequest, NextResponse } from "next/server";

const mock = [
  {
    id: "1",
    name: "Maldives Water Villas",
    priceFrom: 4200,
    availability: "high",
    country: "Maldives",
    tags: ["Best Value", "Trending"],
  },
  {
    id: "2",
    name: "Amalfi Coast Suites",
    priceFrom: 3100,
    availability: "medium",
    country: "Italy",
    tags: ["Romantic"],
  },
  {
    id: "3",
    name: "Kyoto Zen Retreat",
    priceFrom: 2200,
    availability: "high",
    country: "Japan",
    tags: ["Luxury Calm"],
  },
];

const airportMap: Record<string, string> = {
  berlin: "BER",
  dusseldorf: "DUS",
  düsseldorf: "DUS",
  munich: "MUC",
  münchen: "MUC",
  london: "LHR",
  paris: "CDG",
  amsterdam: "AMS",
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const airport =
    airportMap[(body.departureCity || "").toLowerCase()] || "FRA";

  return NextResponse.json({
    airport,
    results: mock,
  });
}
