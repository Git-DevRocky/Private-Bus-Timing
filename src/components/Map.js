// src/MapComponent.js
import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import LRM from "leaflet-routing-machine";
import { useSelector } from "react-redux";
import { handleGeocode } from "../api/fetchLocation";

import toIconUrl from "../assets/from.png";

const Map = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fromLatLng, setFromLatLng] = useState([9.5916, 76.5223]);
  const [toLatLng, setToLatLng] = useState([9.2615, 76.7878]);
  console.log(fromLatLng);
  const to = useSelector((state) => state.location.to);
  const from = useSelector((state) => state.location.from);

  const toIcon = new L.Icon({
    iconUrl: toIconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);
      if (to) {
        const res1 = await handleGeocode(to);
        setToLatLng([res1.lat, res1.lon]);
      }
      if (from) {
        const res2 = await handleGeocode(from);
        setFromLatLng([res2.lat, res2.lon]);
      }
    };
    setTimeout(() => {}, 1500);

    fetchLocations();
    setIsLoading(false);
  }, [to, from]);

  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    // Clear previous routing if any
    map.eachLayer((layer) => {
      if (layer instanceof LRM.Routing.Control) {
        map.removeControl(layer);
      }
    });

    const existingRoutingControl = map.getControl("routing");
    if (existingRoutingControl) {
      map.removeControl(existingRoutingControl);
    }

    // Add routing control
    const routingControl = LRM.control({
      waypoints: [L.latLng(fromLatLng), L.latLng(toLatLng)],
      lineOptions: {
        styles: [{ color: "blue", weight: 10 }],
      },
      routeWhileDragging: true,
    }).addTo(map);

    // Fit map bounds to the route
    routingControl.on("routesfound", (e) => {
      const route = e.routes[0];
      const bounds = route.getBounds();
      map.fitBounds(bounds);
    });

    // Cleanup
    return () => {
      map.removeControl(routingControl);
    };
  }, [fromLatLng, toLatLng]);

  return (
    <div className="h-screen bg-black bg-opacity-90 text-white">
      {isLoading ? (
        <div>
          <h1>map is loading....</h1>
        </div>
      ) : (
        <MapContainer
          center={[9.5916, 76.5223]} // Initial center, will be adjusted by fitBounds
          zoom={13}
          style={{ height: "100vh", width: "100vw" }}
          whenCreated={(map) => (mapRef.current = map)}
          className=" z-10 relative"
        >
          <TileLayer
            url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
          />
          <Marker position={fromLatLng} icon={toIcon}>
            <Popup>From Point</Popup>
          </Marker>
          <Marker position={toLatLng} icon={toIcon}>
            <Popup>To Point</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default Map;
