import React from "react";

function AddRoute() {
  return (
    <div className="h-[90vh] flex items-center justify-center bg-slate-300 ">
      <form action="" className="flex flex-col lg:w-[50vw] w-full">
        <input
          required="true"
          type="text"
          placeholder="Bus Number"
          className="p-3 m-3 outline-none rounded bg-white "
        />
        <input
          required="true"
          type="text"
          placeholder="no of trips"
          className="p-3 m-3 outline-none rounded bg-white"
        />
        <input
          required="true"
          type="text"
          placeholder=" starting sation"
          className="p-3 m-3 outline-none rounded bg-white"
        />
        <input
          required="true"
          type="text"
          placeholder=" departure sation"
          className="p-3 m-3 outline-none rounded bg-white"
        />
        <input
          required="true"
          type="text"
          placeholder=" starting time"
          className="p-3 m-3 outline-none rounded bg-white"
        />
        <input
          required="true"
          type="text"
          placeholder=" departure time"
          className="p-3 m-3 outline-none rounded bg-white"
        />
        <button
          className="font-bold  text-black  "
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
