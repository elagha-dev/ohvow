export const getAirport = (city: string): string => {
  const map: Record<string, string> = {
    berlin: "BER",
    dusseldorf: "DUS",
    düsseldorf: "DUS",
    munich: "MUC",
    münchen: "MUC",
    london: "LHR",
    paris: "CDG",
    amsterdam: "AMS",
  };
  return map[city.toLowerCase()] || "FRA";
};
