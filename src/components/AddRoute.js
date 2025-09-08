import React from "react";

function AddRoute() {
  return (
    <div className="h-[80vh] flex w-sreen items-center justify-center  border ">
      <form
        action=""
        className="flex flex-col  pt-1 border-4 border-black-700  rounded-md w-[75vw] items-center justify-center shadow-lg"
      >
        <input
          required="true"
          type="text"
          placeholder="Bus Number"
          className="p-3 mx-3 outline-none rounded bg-gray-200 w-2/4 "
        />
        <input
          required="true"
          type="text"
          placeholder="no of trips"
          className="p-3 mx-3 mt-1 outline-none rounded bg-gray-200   w-2/4 "
        />
        <input
          required="true"
          type="text"
          placeholder=" starting sation"
          className="p-3 mx-3 mt-1  outline-none rounded bg-gray-200   w-2/4 "
        />
        <input
          required="true"
          type="text"
          placeholder=" departure sation"
          className="p-3 mx-3 mt-1 outline-none rounded bg-gray-200   w-2/4 "
        />
        <input
          required="true"
          type="text"
          placeholder=" starting time"
          className="p-3 mx-3 mt-1 outline-none rounded bg-gray-200   w-2/4 "
        />
        <input
          required="true"
          type="text"
          placeholder=" departure time"
          className="p-3 mx-3 mt-1 outline-none rounded bg-gray-200   w-2/4 "
        />
        <button
          className="font-bold   bg-black m-3 px-2 py-1 text-white rounded w-1/4 "
          onClick={() => alert("need admin permission")}
        >
          {" "}
          Add
        </button>
      </form>
    </div>
  );
}

export default AddRoute;
