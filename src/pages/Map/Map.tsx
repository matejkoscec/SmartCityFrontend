import { ReactNode, useEffect, useState } from "react";

import { Icon, LatLng, Map as LeafletMap } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";

import { ParkingSpotResponse } from "@/api/parkingSpot/types.ts";
import locationPinSrc from "@/assets/location-marker.svg";

import "./style.css";

export type LocationCoordinatesResponse = {
  id: number | string;
  lng: number;
  lat: number;
  name: string;
};

export type FullLocationResponse = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  cityId: number;
  cityName: string;
  countryCode: string;
  countryName: string;
};

export type MapProps = {
  locations: ParkingSpotResponse[];
  locationsContent?: (location: ParkingSpotResponse) => ReactNode;
  locationsImgSrc?: (location: ParkingSpotResponse) => string;
  dynamicMarkerContent?: (latLng: LatLng) => ReactNode;
  dynamicMarkerOnSet?: (latLng: { lat: number; lng: number }) => void;
  onZoom?: (zoom: number) => void;
  className?: string;
  dragging?: boolean;
  locationLng?: number;
  locationLat?: number;
  zoom?: number;
  scrollWheelZoom?: boolean;
  onMount?: (map: LeafletMap) => void;
};

export default function Map({
  locations,
  locationsContent,
  locationsImgSrc,
  dynamicMarkerContent,
  dynamicMarkerOnSet,
  onZoom,
  className,
  dragging,
  locationLng,
  locationLat,
  zoom,
  scrollWheelZoom,
  onMount,
}: MapProps) {
  const [map, setMap] = useState<LeafletMap>();

  useEffect(() => {
    if (map) onMount?.(map);
  }, [map, onMount]);

  return (
    <MapContainer
      center={locationLng && locationLat ? { lat: locationLat, lng: locationLng } : { lat: 26, lng: -21 }}
      zoom={zoom ? zoom : 2.7}
      scrollWheelZoom={scrollWheelZoom !== false}
      maxBounds={[
        [-85, -180.0],
        [85, 180.0],
      ]}
      minZoom={3}
      className={`min-h-20 min-w-20 outline-none ${className}`}
      maxBoundsViscosity={1.0}
      doubleClickZoom={false}
      dragging={dragging !== false}
    >
      <>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((l) => {
          const icon = new Icon({
            iconSize: [16, 16],
            iconAnchor: [8, 10],
            popupAnchor: [0, 0],
            iconUrl: locationsImgSrc?.(l) ?? locationPinSrc,
          });

          return (
            <Marker key={l.id} position={{ lat: l.latitude, lng: l.longitude }} icon={icon}>
              <Popup>
                <div>{locationsContent ? locationsContent(l) : l.id}</div>
              </Popup>
            </Marker>
          );
        })}
        <LocationMarker
          dynamicMarkerContent={dynamicMarkerContent}
          dynamicMarkerOnSet={dynamicMarkerOnSet}
          onZoom={onZoom}
          setMap={setMap}
        />
      </>
    </MapContainer>
  );
}

const pinIcon = new Icon({
  iconSize: [38, 95],
  iconAnchor: [18, 66],
  popupAnchor: [0, -40],
  iconUrl: locationPinSrc,
});

type LocationMarkerProps = {
  dynamicMarkerContent?: (latLng: LatLng) => ReactNode;
  dynamicMarkerOnSet?: (latLng: { lat: number; lng: number }) => void;
  onZoom?: (zoom: number) => void;
  setMap?: (map: LeafletMap) => void;
};

function LocationMarker({ dynamicMarkerContent, dynamicMarkerOnSet, onZoom, setMap }: LocationMarkerProps) {
  const [position, setPosition] = useState<LatLng | null>(null);

  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      dynamicMarkerOnSet?.({ lat: e.latlng.lat, lng: e.latlng.lng });
      // map.locate();
    },
    /* locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    }, */
    zoom() {
      if (onZoom) onZoom(map.getZoom());
    },
  });

  useEffect(() => {
    if (map) setMap?.(map);
  }, [map, setMap]);

  if (position === null) {
    return null;
  }

  return (
    <Marker position={position} icon={pinIcon}>
      {dynamicMarkerContent && <Popup className="custom-popup">{dynamicMarkerContent(position)}</Popup>}
    </Marker>
  );
}
