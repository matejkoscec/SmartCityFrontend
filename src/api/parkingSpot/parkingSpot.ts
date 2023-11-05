import { useQuery } from "@tanstack/react-query";

import { ParkingSpotResponse } from "@/api/parkingSpot/types.ts";
import paths from "@/api/paths.ts";
import { useClient } from "@/provider/ClientProvider.tsx";

export function useGetAllParkingSpots() {
  const { client } = useClient();

  return useQuery({
    queryKey: ["parking", "spots"],
    queryFn: () => client.post<ParkingSpotResponse[]>(paths.parkingSpots.all, {}),
    staleTime: Infinity,
  });
}
