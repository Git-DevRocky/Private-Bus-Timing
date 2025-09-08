import React, { useState, useEffect } from "react";
import { useRoute } from "../contexts/RouteContext";
import { useSelector } from "react-redux";

const BusSchedule = () => {
  const { vehicles, setUpcomingTrips } = useRoute();
  const to = useSelector((state) => state.location.to);
  const from = useSelector((state) => state.location.from);
  const [upcomingTrips, setUpcomingTripsState] = useState([]);

  const convertTo24Hour = (time) => {
    const [timePart, modifier] = time.split(" ");
    let [hours, minutes] = timePart.split(":");
    if (modifier === "pm" && hours !== "12") {
      hours = parseInt(hours, 10) + 12;
    }
    if (modifier === "am" && hours === "12") {
      hours = 0;
    }
    return `${hours.toString().padStart(2, "0")}:${minutes}`;
  };

  const isWithinNextThreeHours = (arrivalTime) => {
    const currentTime = new Date();
    const [currentHours, currentMinutes] = [
      currentTime.getHours(),
      currentTime.getMinutes(),
    ];

    const [arrivalHours, arrivalMinutes] = arrivalTime.split(":").map(Number);
    const arrivalDate = new Date();
    arrivalDate.setHours(arrivalHours, arrivalMinutes, 0, 0);

    const threeHoursLater = new Date();
    threeHoursLater.setHours(currentHours + 2, currentMinutes, 0, 0);

    return arrivalDate >= currentTime && arrivalDate <= threeHoursLater;
  };

  useEffect(() => {
    if (!vehicles || vehicles.length === 0) return; // Early return if no vehicles data

    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    // Iterate over each vehicle and filter their schedules
    const filteredTrips = vehicles.flatMap((vehicle) =>
      vehicle.schedule.flatMap((trip) =>
        trip.stations
          .filter((station) => {
            const arrivalTime24 = convertTo24Hour(station.arrivalTime);
            return isWithinNextThreeHours(arrivalTime24);
          })
          .map((station) => ({
            trip: trip.trip,
            station: station.station,
            arrivalTime: station.arrivalTime,
            vehicleNumber: vehicle["Vehicle Number"],
            arrivalTime24: convertTo24Hour(station.arrivalTime),
            // Add 24-hour format time for sorting
          }))
      )
    );

    // Sort the filtered trips by arrival time
    const sortedTrips = filteredTrips.sort((a, b) => {
      return a.arrivalTime24.localeCompare(b.arrivalTime24);
    });

    setUpcomingTripsState(sortedTrips);
    setUpcomingTrips(sortedTrips); // If you need to update the global state as well
  }, [vehicles, to, from]);

  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="uppercase text-md">
        Upcoming Bus Trips in the Next 2 Hours
      </h1>
      <div className="p-2 flex flex-col text-xs bg-white w-full items-center justify-center">
        {upcomingTrips.length > 0 ? (
          upcomingTrips.map((trip, index) => (
            <div
              key={index}
              className="p-8 m-2 border bg-white border-black hover-shadow rounded w-full flex justify-between"
            >
              <p>
                Vehicle:{" "}
                <span className="text-yellow-700 font-semibold">
                  {" "}
                  {trip.vehicleNumber}
                </span>{" "}
              </p>
              <p>
                - Arrival{" "}
                <span className="text-violet-700 font-semibold">
                  {trip.station}
                </span>{" "}
                at{" "}
                <span className="text-violet-700 font-semibold">
                  {trip.arrivalTime}
                </span>
              </p>
              <p>
                Trip <span className="text-red-700 font-bold">{trip.trip}</span>
              </p>
            </div>
          ))
        ) : (
          <p>No upcoming trips within the next 2 hours.</p>
        )}
      </div>
    </div>
  );
};

export default BusSchedule;
