import React, { useState } from "react";
import { useRoute } from "../contexts/RouteContext";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import CloseIcon from "@mui/icons-material/Close";

import BrowseGalleryIcon from "@mui/icons-material/BrowseGallery";
function Shedule() {
  const { vehicle, vehicles } = useRoute();
  const [isActive, setIsActive] = useState(false);
  const [curr, setCurr] = useState({});

  // console.log(trip, "tripp");
  const currTrip = vehicles.filter((v) => v["Vehicle Number"] === vehicle);

  const newRoutes = currTrip[0]?.schedule;

  const handleExpand = (curr) => {
    setCurr(curr);
    setIsActive(true);
  };

  return (
    <div className="flex flex-col p-4  items-center justify-center  bg-white ">
      {" "}
      <div className="bg-white bg-opacity-70 w-full i rounded">
        <div className=" flex  bg-opacity-90 items-center justify-center overflow-y-auto">
          <p className="font-bold text-2xl text-yellow-600">
            {" "}
            {vehicle}{" "}
            <span className="text-blue-800">
              {new Date().toLocaleTimeString()}
            </span>
          </p>
        </div>
        <div className="flex p-2 m-2 overflow-y-auto  shadow-md items-center w-full justify-center  ">
          {currTrip[0]?.route?.map((route, index) => (
            <div key={index}>
              <p className="text-xs    m-1   ">
                {route !== "" ? route : "name error"}
                <KeyboardDoubleArrowRightIcon />
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-[100%]">
        {newRoutes?.map((route) => (
          <div className="flex w-full auto  ">
            <div className="flex flex-col  w-3 items-center justifu-center ">
              <FlagCircleIcon color="primary" />

              <div className="bg-newRoad h-3/4 bg-cover  bg-center">
                <p className="p-1    border-2 b"> </p>
              </div>
            </div>
            <div className=" flex flex-col lg:flex-row  justify-between lg:h-20 lg:p-5  p-3   rounded m-2 w-full border  border-black">
              <div className="flex flex-col  lg:p-4 items-center justify-center lg:m-1 ">
                <p className="p-1 m-1 font-bold">
                  START:{route.stations[0].station}{" "}
                </p>
                <p className="p-1 m-1">
                  <BrowseGalleryIcon color="secondary" className="mx-3" />
                  {route.stations[0].arrivalTime}
                </p>
              </div>
              <div className="flex flex-col lg:p-4 items-center  justify-center lg:m-1">
                <p className="p-1 m-1 font-bold">
                  END:{route.stations[route.stations.length - 1].station}
                </p>
                <p className="p-1 m-1">
                  <BrowseGalleryIcon color="error" className="mx-3" />
                  {route.stations[route.stations.length - 1].departureTime}
                </p>
              </div>

              <button
                onClick={() => handleExpand(route)}
                className="px-2 py-1 right-0 bg-black font-semibold text-white rounded cursor-pointer hover:bg-white hover:text-black border hover:border-black "
              >
                view
              </button>
            </div>
          </div>
        ))}
      </div>
      {isActive && (
        <div className="overflow-y-auto overflow fixed top-0 right-50 left-50 z-50 flex flex-col  md:inset-0 h-[calc(100%-1rem)]  bg-black bg-opacity-85 text-white">
          <button onClick={() => setIsActive(false)} className="justify-end">
            <CloseIcon className="bg-white p-2 rounded-full text-black text-2xl font-bold m-4" />
          </button>
          <div className="flex flex-col items-center text-xs uppercase justify-center">
            <h1 className=" font-bold  ">Intermediate Stations</h1>
            <div className="w-[80vw] m-3 overflow-y-auto ">
              <div className="p-3  flex bg-white m-1  text-black font-bold">
                <p className="w-1/3">Station</p>
                <p className="w-1/3">Arrival</p>
                <p className="w-1/3">Departure</p>
              </div>
              {curr?.stations?.map((station) => (
                <div className="p-3  flex bg-slate-700  m-1 cursor-pointer hover:bg-slate-600  overflow-y-auto">
                  <p className="w-1/3">{station.station}</p>
                  <p className="w-1/3">{station.arrivalTime}</p>
                  <p className="w-1/3">{station.departureTime}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Shedule;
