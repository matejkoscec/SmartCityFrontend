import { useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import Map from "./Map.tsx";

import { useGetReverseLocationInfo } from "@/api/openStreetMap/openStreetMap.ts";
import { useGetAllParkingSpots } from "@/api/parkingSpot/parkingSpot.ts";
import { ParkingSpotResponse } from "@/api/parkingSpot/types.ts";
import freeSpotSrc from "@/assets/free-spot.svg";
import occupiedSpotSrc from "@/assets/occupied-spot.svg";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Switch } from "@/components/ui/switch.tsx";

type Form = { place: string; zone: string; occupied: boolean };

export default function MapPage() {
  const { data, isLoading, isError } = useGetAllParkingSpots();
  const { data: response, mutate, isPending } = useGetReverseLocationInfo();

  const [selectedLocation, setSelectedLocation] = useState<ParkingSpotResponse | null>(null);

  const { register, handleSubmit, setValue } = useForm<Form>();

  const onSubmit: SubmitHandler<Form> = (data) => console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex p-8 w-full z-50">
        <form className="flex items-center flex-grow w-full gap-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <Label htmlFor="place">Place</Label>
            <Input id="place" {...register("place")} />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="zone">Zone</Label>
            <Select onValueChange={(val) => setValue("zone", val)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Zone..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Zone 1</SelectItem>
                <SelectItem value="2">Zone 2</SelectItem>
                <SelectItem value="3">Zone 3</SelectItem>
                <SelectItem value="4">Zone 4</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="occupied">Occupied</Label>
            <div className="h-10 flex items-center">
              <Switch onCheckedChange={(val) => setValue("occupied", val)} />
            </div>
          </div>
          <Button type={"submit"} className="ml-10">
            Filter
          </Button>
        </form>
      </div>
      <div className="flex flex-grow z-0">
        <Card className="mx-8 w-96">
          <CardHeader>
            <CardTitle>Location info</CardTitle>
          </CardHeader>
          <CardContent>
            {isPending && <div>Loading...</div>}
            <div className="grid grid-cols-3 pt-4 gap-2">
              {selectedLocation && (
                <>
                  <span className="font-semibold">Status</span>
                  <span className="col-span-2">
                    {selectedLocation.occupied ? (
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-red-500 h-4 w-4"></div>
                        <span>Occupied</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-emerald-500 h-4 w-4"></div>
                        <span>Free Spot</span>
                      </div>
                    )}
                  </span>
                  <span className="font-semibold">Price</span>
                  <span className="col-span-2">{selectedLocation.price} €</span>
                </>
              )}
              {selectedLocation && response && (
                <div className="col-span-3 my-2 h-1 rounded-full w-full bg-primary-foreground" />
              )}
              {response && (
                <>
                  <span className="font-semibold">City</span>
                  <span className="col-span-2">{response.address.city}</span>
                  <span className="font-semibold">District</span>
                  <span className="col-span-2">{response.address.city_district}</span>
                  <span className="font-semibold">Postcode</span>
                  <span className="col-span-2">{response.address.postcode}</span>
                  <span className="font-semibold">Road</span>
                  <span className="col-span-2">{response.address.road}</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>
        <div className="flex flex-col flex-grow">
          <div className="h-[40rem] flex flex-grow relative">
            <Map
              locationLng={15.973}
              locationLat={45.8}
              zoom={14.5}
              locations={data || []}
              locationsContent={(location) => (
                <div className="flex items-center gap-6 text-sm p-2">
                  <span>
                    {location.occupied ? (
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-red-500 h-4 w-4"></div>
                        <span>Occupied</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-emerald-500 h-4 w-4"></div>
                          <span>Free Spot</span>
                        </div>
                        <span className="font-semibold text-base">{location.price} €</span>
                      </div>
                    )}
                  </span>
                  <Button
                    onClick={() => {
                      mutate({ lat: location.latitude, lng: location.longitude });
                      setSelectedLocation(location);
                    }}
                  >
                    Get Info
                  </Button>
                </div>
              )}
              locationsImgSrc={(location) => (location.occupied ? occupiedSpotSrc : freeSpotSrc)}
              dynamicMarkerContent={({ lat, lng }) => (
                <div className="flex flex-col justify-center items-center p-2">
                  <div className="m-0">Coordinates</div>
                  <div className="m-0">{`Latitude: ${lat}`}</div>
                  <div className="m-0">{`Longitude: ${lng}`}</div>
                </div>
              )}
              className="h-full flex-grow shadow-md rounded-l-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
