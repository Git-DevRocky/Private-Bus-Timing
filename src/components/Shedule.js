import React, { useState } from "react";
import { useRoute } from "../contexts/RouteContext";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

import CloseIcon from "@mui/icons-material/Close";

function Shedule() {
  const { vehicle, routes, trip } = useRoute();
  const [isActive, setIsActive] = useState(false);
  const [curr, setCurr] = useState([]);

  const currTrip = trip.schedule;

  const handleExpand = (curr) => {
    setCurr(curr);
    setIsActive(true);
  };

  return (
    <div className="flex flex-col p-4  items-center justify-center  bg-slate-100">
      <div className="bg-white bg-opacity-70 w-full i rounded">
        <div className=" flex  bg-opacity-90 items-center justify-center">
          <h1 className="font-bold text-2xl text-yellow-600"> {vehicle}</h1>
        </div>
        <div className="flex p-2 m-2 overflow-y-auto  shadow-md items-center w-full justify-center  ">
          {routes.map((route) => (
            <>
              <p className="text-xs    m-1   ">
                {route !== "" ? route : "name error"}
              </p>
              <KeyboardDoubleArrowRightIcon />
            </>
          ))}
        </div>
      </div>

      <div className=" h-[80vh]  w-screen overflow-y-auto overflow-x-auto flex  flex-col  items-center  text-center ">
        {currTrip?.map((curr) => (
          <div className="flex flex-col lg:flex-row p-3 bg-white bg-opacity-80  w-full lg:w-[150vh] m-1 rounded uppercase justify-between  items-center text-left hover:shadow-lg cursor-pointer ">
            {/* <ArrowDownward /> */}
            <p>Trip No:{curr.trip}</p>
            <div className="flex flex-col items-start text-left justify-center p-1 m-1">
              <p className="text-left">
                Starting station :
                <span className="font-bold text-blue-600">
                  {curr.stations[0].station}
                </span>
              </p>
              <p>
                Arrival:
                <span className="font-bold text-green-600">
                  {" "}
                  {curr.stations[0].arrivalTime}
                </span>
              </p>
            </div>
            <div className="flex flex-col items-center text-left justify-center p-1 m-1 text-sm">
              <p className="text-left">
                Ending station :
                <span className="font-bold text-blue-600">
                  {curr.stations[curr.stations?.length - 1].station}
                </span>
              </p>
              <p>
                Departure:
                <span className="font-bold text-red-600">
                  {curr.stations[curr.stations?.length - 1].departureTime}
                </span>
              </p>
            </div>

            <button
              className="p-1 bg-slate-900 hover:bg-slate-600 text-white px-2 rounded-full  "
              onClick={() => handleExpand(curr)}
            >
              more
              <FullscreenIcon className=" text-2xl  p-1 " />
            </button>
          </div>
        ))}
      </div>
      {isActive && (
        <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-50 left-50 z-50 flex flex-col  md:inset-0 h-[calc(100%-1rem)]  bg-black bg-opacity-85 text-white">
          <button onClick={() => setIsActive(false)} className="justify-end">
            <CloseIcon className="bg-white p-2 rounded-full text-black text-2xl font-bold m-4" />
          </button>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold ">Intermediate Stations</h1>
            <div className="w-[80vw] m-3 overflow-y-auto ">
              <div className="p-3  flex bg-white m-1  text-black font-bold">
                <p className="w-1/3">Station</p>
                <p className="w-1/3">Arrival</p>
                <p className="w-1/3">Departure</p>
              </div>
              {curr.stations.map((station) => (
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
