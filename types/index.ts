export interface Destination {
  id: string;
  name: string;
  priceFrom: number;
  availability: "high" | "medium" | "low";
  country: string;
  tags: string[];
}

export interface SearchForm {
  departureCity: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface SearchResponse {
  airport: string;
  results: Destination[];
}
