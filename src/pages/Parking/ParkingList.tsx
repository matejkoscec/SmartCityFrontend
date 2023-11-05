import { Trash2 } from "lucide-react";

import { useDeleteParkingSpot, useGetAllParkingSpots } from "@/api/parkingSpot/parkingSpot.ts";
import { getParkingZone } from "@/api/parkingSpot/types.ts";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";

export default function ParkingList() {
  const { data, isLoading, isError, refetch } = useGetAllParkingSpots({});
  const { mutate: del } = useDeleteParkingSpot(async () => {
    await refetch();
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-col items-center pt-8">
      <Card>
        <CardHeader className="text-2xl font-semibold">All Parking Spots</CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 w-96">
            {data?.map((parkingSpot) => (
              <div key={parkingSpot.id} className="flex h-10 items-center">
                <span className="flex-grow">
                  Lat: {parkingSpot.latitude.toFixed(5)} Lng: {parkingSpot.longitude.toFixed(5)} -{" "}
                  {getParkingZone(parkingSpot.parkingZone)}
                </span>
                <Button variant={"destructive"} onClick={() => del(parkingSpot.id)}>
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
