import { useQuery } from "@tanstack/react-query";

import paths from "@/api/paths.ts";
import { useClient } from "@/provider/ClientProvider.tsx";

export function useGetZoneOccupancy(params: Record<string, string>) {
  const { client } = useClient();

  return useQuery({
    queryKey: ["zoneOccupancy", params],
    queryFn: () => client.get(paths.analytics.zoneOccupancy, { params }),
    enabled: !!client.token,
    retry: 0,
  });
}
