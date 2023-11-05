import paths from "@/api/paths.ts";
import {useClient} from "@/provider/ClientProvider.tsx";
import {useQuery} from "@tanstack/react-query";
import {ReservationResponse} from "@/api/reservations/types.ts";

export function useGetAllReservations() {
  const { client } = useClient();

  return useQuery({
    queryKey: ["reservations", "all"],
    queryFn: () => client.post<ReservationResponse[]>(paths.reservations.all, {}),
    staleTime: Infinity,
  });
}