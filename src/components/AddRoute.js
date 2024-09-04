import React from "react";

function AddRoute() {
  return (
    <div className="h-[90vh] flex items-center justify-center bg-slate-100 ">
      <form action="" className="flex flex-col w-[80vw]">
        <input
          type="text"
          placeholder="Bus Number"
          className="p-3 m-3 outline-none rounded bg-white "
        />
        <input
          type="text"
          placeholder="no of trips"
          className="p-3 m-3 outline-none rounded bg-white"
        />
        <input
          type="text"
          placeholder=" starting sation"
          className="p-3 m-3 outline-none rounded bg-white"
        />
        <input
          type="text"
          placeholder=" departure sation"
          className="p-3 m-3 outline-none rounded bg-white"
        />
        <input
          type="text"
          placeholder=" starting time"
          className="p-3 m-3 outline-none rounded bg-white"
        />
        <input
          type="text"
          placeholder=" departure time"
          className="p-3 m-3 outline-none rounded bg-white"
        />
        <button
          className="font-bold "
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
