import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useSelector } from "react-redux";
import { handleGeocode } from "../api/fetchLocation";
import { HashLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

import { MapContainer, Marker, Popup, WMSTileLayer } from "react-leaflet";
import toIconUrl from "../assets/from1.png";
const toIcon = new L.Icon({
  iconUrl: toIconUrl,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});
const Map = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fromLatLng, setFromLatLng] = useState([9.5916, 76.5223]);
  const [toLatLng, setToLatLng] = useState([9.2615, 76.7878]);
  const to = useSelector((state) => state.location.to);
  const from = useSelector((state) => state.location.from);
  const navigate = useNavigate();
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (to) {
          const res1 = await handleGeocode(to.replace(/\s+/g, ""));
          if (!isNaN(res1?.lat)) {
            const formatLat = parseFloat(res1?.lat).toFixed(2);
            const formatLon = parseFloat(res1?.lon).toFixed(2);
            setToLatLng([parseFloat(formatLat), parseFloat(formatLon)]);
          }
        }
        if (from) {
          const res2 = await handleGeocode(from.replace(/\s+/g, ""));
          if (!isNaN(res2.lat)) {
            const formatLat = parseFloat(res2?.lat).toFixed(2);
            const formatLon = parseFloat(res2?.lon).toFixed(3);
            setFromLatLng([parseFloat(formatLat), parseFloat(formatLon)]);
          }
        }
      } catch (error) {
        navigate("/error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [to, from, navigate]);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current.leafletElement;

    if (map && fromLatLng && toLatLng) {
      const routingControl = L.Routing.control({
        waypoints: [L.latLng(...fromLatLng), L.latLng(...toLatLng)],
        router: L.Routing.osrmv1({
          language: "en",
          profile: "driving",
        }),
        lineOptions: {
          styles: [{ color: "blue", weight: 20 }],
        },
        routeWhileDragging: true,
      }).addTo(map);

      routingControl.on("routesfound", (e) => {
        const route = e.routes[0];
        const bounds = route.getBounds();
        map.fitBounds(bounds);
      });

      return () => {
        map.removeControl(routingControl);
      };
    }
  }, [fromLatLng, toLatLng]);

  return (
    <div className="h-screen text-white">
      {isLoading ? (
        <div className="bg-white bg-opacity-90 flex items-center justify-center h-full w-full">
          <HashLoader color="#3d8050" loading={isLoading} />
        </div>
      ) : (
        <div id="mapId">
          <MapContainer
            center={fromLatLng ? fromLatLng : toLatLng}
            zoom={13}
            id="mapId"
            style={{ height: "100vh", width: "100%" }}
          >
            <WMSTileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={19}
            />
            <Marker position={fromLatLng} icon={toIcon}>
              <Popup>From Point</Popup>
            </Marker>
            <Marker position={toLatLng} icon={toIcon}>
              <Popup>To Point</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default Map;
