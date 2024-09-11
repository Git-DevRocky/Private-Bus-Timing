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
import Autocomplete from "./AutoComplete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import BusSchedule from "./BusSchedule";
function Body() {
  const { dist } = useRoute();
  const {
    vehicles,
    setVehicles,
    setVehicle,
    setRoutes,
    setTrip,
    filteredBus,
    upcomingTrips,
  } = useRoute();
  const dispatch = useDispatch();
  const { schedules, setSchedules } = useRoute();
  const to = useSelector((state) => state.location.to);
  const from = useSelector((state) => state.location.from);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isTimeFilter, setIsTimeFilter] = useState(false);
  const [filteredOptionsFrom, setFilteredOptionsFrom] = useState([]);
  const [isOptionsOpenFrom, setIsOptionsOpenFrom] = useState(false);

  schedules.filter((schedule) => {
    if (schedule.route.includes(from) && schedule.route.includes(to)) {
      vehicles.push(schedule);

      setTrip(schedule);

      setRoutes(schedule.route);
    }
    return "";
  });

  useEffect(() => {
    setVehicles([]);
  }, [to, from, isTimeFilter]);

  const uniqueRoutes = [
    ...new Set(schedules.map((schedule) => schedule.route[0])),
  ];
  uniqueRoutes.sort((a, b) => a.localeCompare(b));
  // console.log(uniqueRoutes);

  ////autocompletefrom
  const handleChangeFrom = (event) => {
    const value = event.target.value;

    dispatch(setFrom(value));
    if (value) {
      const filtered = uniqueRoutes.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptionsFrom(filtered);
      setIsOptionsOpenFrom(true);
    } else {
      setFilteredOptionsFrom([]);
      setIsOptionsOpenFrom(false);
    }
  };

  const handleOptionClickFrom = (option) => {
    dispatch(setFrom(option));

    setFilteredOptionsFrom([]);
    setIsOptionsOpenFrom(false);
  };

  const handleBlurFrom = () => {
    setTimeout(() => setIsOptionsOpenFrom(false), 100); // Delay to allow click event on options
  };

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
      toast.error("Failed to load data");
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
    <div className="flex w-full  flex-col bg-road bg-custom bg-cover bg-center h-full  z-50 font-poppins ">
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
          <div className="   h-[60vh] w-[70vw] lg:w-[50vh] flex items-center justify-center bg-white text-black font-silkScreen text-5xl p-4 sticky   rounded-md flex-col  ">
            <p className="text-xs lg:text-lg">select a region to start </p>
            <ClimbingBoxLoader />
            <p> then laod route</p>
          </div>
        </div>
      )}

      {/* <p className="text-center text-small lg:text-2xl underline font-bold uppercase">
        Route Details - Timings
      </p> */}

      <div className="flex  lg:p-3  p-1 h-full w-full  flex-col lg:flex-row text-xs lg:text-sm ">
        <div className="   lg:w-1/2 md:w-full   lg:h-[80vh]  flex flex-col  overflow-y-auto items-center p-1 mr-2">
          <div className="flex items-center  flex-col h-full w-full ">
            <div className="flex justify-center items-center flex-col">
              <button
                onClick={handleSearch}
                className=" p-2 bg-green-700 text-white rounded hover:bg-green-600 "
              >
                Load Routes <CachedIcon />
              </button>
              <div className="flex  items-center justify-center m-2 ">
                <p className="px-3  text-xs text-green-800 font-bold ">
                  filter with Time
                </p>
                <div
                  className="px-2 rounded-full cursor-pointer w-20 bg-gray-100  shadow-lg  border  "
                  value={isTimeFilter}
                  onClick={() => setIsTimeFilter(!isTimeFilter)}
                >
                  {!isTimeFilter ? (
                    <div className="flex justify-start">
                      <CancelIcon color="disabled" />
                    </div>
                  ) : (
                    <div className="flex justify-end">
                      <CheckCircleIcon color="inherit" />
                    </div>
                  )}
                </div>

                <p>{new Date().toLocaleTimeString()}</p>
              </div>
            </div>
            <img
              src="https://img.freepik.com/premium-vector/logo-bus-icon-vector-silhouette-isolated-design-school-bus-concept-black-icon_653669-3331.jpg?w=740"
              alt=""
              width={200}
              height={200}
              className=" m-0 p-0"
            />

            <div className=" text-black flex p-3   flex-col lg:w-full">
              <div className="flex items-center bg-gray-300  p-2 rounded m-3 lg:rounded-full  lg:mx-3 w-full justify-between ">
                <div className="flex items-center justify-center">
                  <LocationOnIcon />
                  <p>From</p>
                </div>
                <div className="flex flex-col lg:flex-row ">
                  <select
                    value={from ? from : ""}
                    className="p-1  outline-none bg-gray-300 cursor-pointer w-full "
                    onChange={(e) => dispatch(setFrom(e.target.value))}
                  >
                    {/* <option value="">Select Starting point</option> */}
                    {uniqueRoutes.map((route, index) => (
                      <option key={index} className="text-sm">
                        {route}
                      </option>
                    ))}
                  </select>
                  <div
                    className=" inline-block w-[100%] "
                    onBlur={handleBlurFrom}
                  >
                    <input
                      type="text"
                      value={from}
                      className=" p-2 rounded bg-gray-300 border w-full  shadow-md  outline-none"
                      placeholder="type place"
                      onChange={handleChangeFrom}
                      onFocus={() => setIsOptionsOpenFrom(true)}
                    />
                    {isOptionsOpenFrom && filteredOptionsFrom.length > 0 && (
                      <ul className="absolute lg:top-[75vh] top-20 left-20 right-0 lg:bottom-5 bottom-[30vh] border lg:cursor-pointer bg-white  text-black shadow max-h-25 w-1/2 m-3 overflow-y-scroll z-10  ">
                        {filteredOptionsFrom.map((option, index) => (
                          <li
                            key={index}
                            onMouseDown={() => handleOptionClickFrom(option)}
                            onClick={() => handleOptionClickFrom(option)}
                            className="p-2 cursor-pointer hover:shadow-lg m-1  flex justify-center"
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center bg-gray-300 p-1 lg:p-2 rounded lg:rounded-full m-3  lg:mx-3 w-full justify-between ">
                <div className="flex ">
                  <NotListedLocationIcon />
                  <p>To</p>
                </div>
                <div className="flex  flex-col lg:flex-row">
                  <select
                    value={to}
                    className="p-1  outline-none bg-gray-300 cursor-pointer w-full "
                    onChange={(e) => dispatch(setTo(e.target.value))}
                  >
                    {uniqueRoutes.map((route, index) => (
                      <option key={index} className="text-sm ">
                        {route}
                      </option>
                    ))}
                  </select>
                  <Autocomplete options={uniqueRoutes} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="  lg:w-1/2 shadow-lg md:w-full   h-[80vh] flex flex-col  overflow-y-auto items-center p-1">
          <h1 className="   bg-blue-800  w-full bg-opacity-94  text-white p-3">{`Bus's Travelling through ${from} to ${to}`}</h1>

          {isTimeFilter ? (
            <BusSchedule />
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Body;
