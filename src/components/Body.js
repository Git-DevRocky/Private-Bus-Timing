import React, { useEffect, useState } from "react";

import { useRoute } from "../contexts/RouteContext";
import { setTo, setFrom } from "../redux/Location";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import { useDispatch, useSelector } from "react-redux";
import { Audio } from "react-loader-spinner";
import { CSpinner } from "@coreui/react";

function Body() {
  const { dist } = useRoute();

  const {
    // from,
    // to,
    // setFrom,
    // setTo,
    vehicles,
    setVehicles,
    setVehicle,
    setRoutes,
    setTrip,
  } = useRoute();
  const dispatch = useDispatch();
  const { schedules, setSchedules } = useRoute();
  const to = useSelector((state) => state.location.to);
  const from = useSelector((state) => state.location.from);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  schedules.filter((schedule) => {
    if (schedule.route.includes(from) && schedule.route.includes(to)) {
      vehicles.push(schedule["Vehicle Number"]);
      setTrip(schedule);

      setRoutes(schedule.route);
    }
    return "";
  });

  useEffect(() => {
    setVehicles([]);
    console.log(to, from);
  }, [to, from]);

  const uniqueRoutes = [
    ...new Set(schedules.map((schedule) => schedule.route[0])),
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://raw.githubusercontent.com/amith-vp/Kerala-Private-Bus-Timing/main/${dist}.json`
      );
      //
      setSchedules(res.data.busSchedules);
      console.log("fetched data");
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

  const handleClick = (v) => {
    setVehicle(v);
    navigate("/schedule");
  };

  return (
    <div className="flex w-full  flex-col bg-white h-[75vh]  z-50">
      <div>
        <Toaster />
      </div>
      {loading && (
        <div className="h-full w-full z-300 absolute flex items-center justify-center bg-gray-500 bg-opacity-60">
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
          />
        </div>
      )}

      <p className="text-center text-small lg:text-2xl underline font-bold uppercase">
        Route Details - Timings
      </p>

      <div className="flex  lg:p-3  p-1 h-[100vh] w-full  flex-col lg:flex-row">
        <div className="   lg:w-1/2 shadow-lg md:w-full   lg:h-[70vh]  flex flex-col  overflow-y-auto items-center p-1">
          <div className="flex items-center  flex-col  w-full ">
            <button
              onClick={handleSearch}
              className="p-2 bg-green-700 text-white rounded hover:bg-green-600"
            >
              Load Routes
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
                    <option key={index} className="text-sm ">
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
        <div className="  lg:w-1/2 shadow-lg md:w-full   h-[70vh] flex flex-col  overflow-y-auto items-center p-1">
          <h1 className="   bg-blue-800  w-full bg-opacity-94  text-white p-3">{`Bus's Travelling through ${from} to ${to}`}</h1>

          <div className="p-3  w-full">
            {vehicles.map((v) => (
              <div className="flex bg-gray-200 p-3  hover:shadow hover:shadow-gray-200 cursor-pointer m-1 justify-between  rounded ">
                <h1 className="font-bold text-green-600" key={v.id}>
                  {v} :
                </h1>

                <button
                  className="bg-blue-800 hover:bg-blue-600 text-white rounded-md px-3 py-1"
                  onClick={() => handleClick(v)}
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
