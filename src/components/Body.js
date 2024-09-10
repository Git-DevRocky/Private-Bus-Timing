import React, { useEffect, useState } from "react";

import { useRoute } from "../contexts/RouteContext";
import { setTo, setFrom } from "../redux/Location";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import { useDispatch, useSelector } from "react-redux";
import { BarLoader, ClimbingBoxLoader } from "react-spinners";
import CachedIcon from "@mui/icons-material/Cached";

function Body() {
  const { dist } = useRoute();

  const { vehicles, setVehicles, setVehicle, setRoutes, setTrip } = useRoute();
  const dispatch = useDispatch();
  const { schedules, setSchedules } = useRoute();
  const to = useSelector((state) => state.location.to);
  const from = useSelector((state) => state.location.from);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  schedules.filter((schedule) => {
    if (schedule.route.includes(from) && schedule.route.includes(to)) {
      vehicles.push(schedule);

      setTrip(schedule);

      setRoutes(schedule.route);
    }
    return "";
  });
  console.log(schedules);

  useEffect(() => {
    setVehicles([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to, from]);

  const uniqueRoutes = [
    ...new Set(schedules.map((schedule) => schedule.route[0])),
  ];
  uniqueRoutes.sort((a, b) => a.localeCompare(b));
  // console.log(uniqueRoutes);
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://raw.githubusercontent.com/amith-vp/Kerala-Private-Bus-Timing/main/${dist}.json`
      );
      //
      setSchedules(res.data.busSchedules);

      setTimeout(() => {}, 3000);
      setVehicles([]);
      setLoading(false);
      toast.success("success");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  const handleClick = (vehicleNUm) => {
    setVehicle(vehicleNUm);
    navigate("/schedule");
  };

  return (
    <div className="flex w-full  flex-col bg-road bg-custom bg-cover bg-center h-full  z-50 font-poppins">
      <div>
        <Toaster />
      </div>
      {loading && (
        <div className="h-full w-full z-300 absolute flex items-center justify-center bg-black bg-opacity-90">
          <BarLoader loading={loading} color="#FFFFFF" />
        </div>
      )}

      {!dist && (
        <div className="flex items-center justify-center h-screen w-screen fixed bg-black bg-opacity-90  ">
          <div className=" z-400  h-[60vh] w-[70vw] lg:w-[50vh] flex items-center justify-center bg-white text-black font-silkScreen text-5xl p-4 sticky   rounded-md flex-col  ">
            <p className="text-xs lg:text-lg">select a region to start </p>
            <ClimbingBoxLoader />
            <p> then laod route</p>
          </div>
        </div>
      )}

      {/* <p className="text-center text-small lg:text-2xl underline font-bold uppercase">
        Route Details - Timings
      </p> */}

      <div className="flex  lg:p-3  p-1 h-full w-full  flex-col lg:flex-row text-xs lg:text-sm">
        <div className="   lg:w-1/2 shadow-lg md:w-full   lg:h-[80vh]  flex flex-col  overflow-y-auto items-center p-1">
          <div className="flex items-center  flex-col h-full w-full ">
            <button
              onClick={handleSearch}
              className=" p-2 bg-green-700 text-white rounded hover:bg-green-600 "
            >
              Load Routes <CachedIcon />
            </button>
            <img
              src="https://img.freepik.com/premium-vector/logo-bus-icon-vector-silhouette-isolated-design-school-bus-concept-black-icon_653669-3331.jpg?w=740"
              alt=""
              width={200}
              height={200}
              className=" m-0 p-0"
            />

            <div className=" text-black flex p-3   flex-col lg:w-full">
              <div className="flex items-center bg-gray-300  p-2 rounded-full m-3  lg:mx-3 w-full justify-between">
                <LocationOnIcon />
                <p>From</p>
                <select
                  className="p-1  outline-none bg-gray-300 cursor-pointer w-full"
                  onChange={(e) => dispatch(setFrom(e.target.value))}
                >
                  {/* <option value="">Select Starting point</option> */}
                  {uniqueRoutes.map((route, index) => (
                    <option key={index} className="text-sm">
                      {route}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center bg-gray-300  p-2 rounded-full m-3  lg:mx-3 w-full justify-between ">
                <NotListedLocationIcon />
                <p>To</p>
                <select
                  className="p-1  outline-none bg-gray-300 cursor-pointer w-full"
                  onChange={(e) => dispatch(setTo(e.target.value))}
                >
                  {/* <option value="">Select Your Destination</option> */}
                  {uniqueRoutes.map((route, index) => (
                    <option key={index} className="text-sm">
                      {route}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="  lg:w-1/2 shadow-lg md:w-full   h-[80vh] flex flex-col  overflow-y-auto items-center p-1">
          <h1 className="   bg-blue-800  w-full bg-opacity-94  text-white p-3">{`Bus's Travelling through ${from} to ${to}`}</h1>

          <div className="p-3  w-full">
            {vehicles.map((v, index) => (
              <div
                key={index}
                className="flex bg-gray-200 p-3  hover:shadow hover:shadow-gray-200 cursor-pointer m-1 justify-between  rounded "
              >
                <h1 className="font-bold text-green-600" key={v.id}>
                  {v["Vehicle Number"]} :
                </h1>

                <button
                  className="bg-blue-800 hover:bg-blue-600 text-white rounded-md px-3 py-1"
                  onClick={() => handleClick(v["Vehicle Number"])}
                >
                  View Route
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
