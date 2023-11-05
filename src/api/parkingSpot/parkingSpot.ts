import { useMutation, useQuery } from "@tanstack/react-query";

import { ParkingSpotResponse } from "@/api/parkingSpot/types.ts";
import paths from "@/api/paths.ts";
import { useClient } from "@/provider/ClientProvider.tsx";
import { Id } from "@/api/types.ts";

export function useGetAllParkingSpots(filter: {
  latitude?: number;
  longitude?: number;
  radius?: number;
  parkingZone?: number;
  isOccupied?: boolean;
  price?: number;
}) {
  const { client } = useClient();

  return useQuery({
    queryKey: ["parking", "spots", filter],
    queryFn: () => client.post<ParkingSpotResponse[]>(paths.parkingSpots.all, filter),
    staleTime: Infinity,
  });
}

export function useDeleteParkingSpot(onSuccess?: () => void | Promise<void>) {
  const { client } = useClient();

  return useMutation({
    mutationFn: (id: Id) => client.delete(paths.parkingSpots.delete(id)),
    onSuccess,
  });
}
