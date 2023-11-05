import { useMutation } from "@tanstack/react-query";

import { useClient } from "@/provider/ClientProvider.tsx";

const getReverseApiUrl = (lat: number, lng: number) =>
  `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;

type ReverseLocationInfoResponse = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  category: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: {
    road: string;
    neighbourhood: string;
    suburb: string;
    city_district: string;
    city: string;
    "ISO3166-2-lvl6": string;
    postcode: string;
    country: string;
    country_code: string;
    quarter: string;
  };
  boundingbox: string[];
};

export function useGetReverseLocationInfo() {
  const { client } = useClient();

  return useMutation({
    mutationFn: ({ lat, lng }: { lat: number; lng: number }) =>
      client.get<ReverseLocationInfoResponse>(getReverseApiUrl(lat, lng)),
  });
}
