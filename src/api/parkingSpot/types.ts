export type ParkingSpotResponse = {
  id: string;
  latitude: number;
  longitude: number;
  parkingZone: number;
  occupied: boolean;
  price: number;
};

export const PARKING_ZONES = ["Zone1", "Zone2", "Zone3", "Zone4"] as const;
export type ParkingZone = (typeof PARKING_ZONES)[number];

export function getParkingZone(parkingZone: number): ParkingZone {
  return PARKING_ZONES[parkingZone - 1];
}
