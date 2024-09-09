import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { useSelector } from "react-redux";
import { handleGeocode } from "../api/fetchLocation";
import { HashLoader } from "react-spinners";
import toIconUrl from "../assets/from1.png";
import { useNavigate } from "react-router-dom";

const Map = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fromLatLng, setFromLatLng] = useState([9.5916, 76.5223]);
  const [toLatLng, setToLatLng] = useState([9.2615, 76.7878]);
  const to = useSelector((state) => state.location.to);
  const from = useSelector((state) => state.location.from);
  const navigate = useNavigate();
  const toIcon = new L.Icon({
    iconUrl: toIconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

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
        // console.error("Error fetching location:", error);

        navigate("/error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [to, from]);

  const mapRef = useRef();
  useEffect(() => {
    try {
      if (!mapRef.current) return;
      const map = mapRef.current;
      console.log("hey we are iside");

      map.eachLayer((layer) => {
        if (layer instanceof L.Routing.control) {
          map.removeControl(layer);
        }
      });

      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(fromLatLng[0], fromLatLng[1]),
          L.latLng(toLatLng[0], toLatLng[1]),
        ],
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
        console.log(e);
        const route = e.routes[0];
        const bounds = route.getBounds();
        map.fitBounds(bounds);
      });

      return () => {
        map.eachLayer((layer) => {
          if (layer instanceof L.Routing.control) {
            map.removeControl(layer);
          }
        });
      };
    } catch (error) {
      navigate("/error");
      console.log(error);
    }
  }, []);

  return (
    <div className="h-screen  text-white">
      {isLoading ? (
        <div className="bg-white bg-opacity-90 flex items-center justify-center h-full w-full ">
          <HashLoader color="#3d8050" loading={isLoading} />
        </div>
      ) : (
        <div>
          <div className="">
            <MapContainer
              center={fromLatLng ? fromLatLng : toLatLng}
              zoom={13}
              id="mapId"
              whenReady={(map) => (mapRef.current = map)}
              style={{ height: "100vh", width: "100vw" }}
              className="z-300 absolute"
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
