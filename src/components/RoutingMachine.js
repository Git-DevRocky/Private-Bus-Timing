import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

// import toIconUrl from "../assets/from1.png";
// const toIcon = new L.Icon({
//   iconUrl: toIconUrl,
//   iconSize: [32, 32],
//   iconAnchor: [16, 32],
//   popupAnchor: [0, -32],
// });

const createRoutineMachineLayer = ({ fromLatLng, toLatLng }) => {
  const instance = L.Routing.control({
    waypoints: [L.latLng(...fromLatLng), L.latLng(...toLatLng)],
    lineOptions: {
      styles: [{ color: "blue", weight: 4 }],
    },
    routeWhileDragging: true,
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
