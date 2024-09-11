import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTo } from "../redux/Location";

const Autocomplete = ({ options }) => {
  // const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const to = useSelector((state) => state.location.to);

  const dispatch = useDispatch();
  const handleChange = (event) => {
    const value = event.target.value;
    // setInputValue(value);
    dispatch(setTo(value));
    if (value) {
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
      setIsOptionsOpen(true);
    } else {
      setFilteredOptions([]);
      setIsOptionsOpen(false);
    }
  };

  const handleOptionClick = (option) => {
    // setInputValue(option);
    dispatch(setTo(option));
    setFilteredOptions([]);
    setIsOptionsOpen(false);
  };

  const handleBlur = () => {
    setTimeout(() => setIsOptionsOpen(false), 100); // Delay to allow click event on options
  };

  return (
    <div className=" inline-block w-[100%]" onBlur={handleBlur}>
      <input
        type="text"
        value={to}
        className=" p-2 rounded w-full border bg-gray-300  shadow-md  outline-none"
        placeholder="type place"
        onChange={handleChange}
        onFocus={() => setIsOptionsOpen(true)}
      />

      {isOptionsOpen && filteredOptions.length > 0 && (
        <ul className="absolute lg:top-[80vh]  top-40 left-20 right-0 bottom-[60vh] lg:bottom-5 border bg-white  text-black shadow min-h-30  w-1/2 m-3  z-10 overflow-y-scroll">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onMouseDown={() => handleOptionClick(option)}
              onClick={() => handleOptionClick(option)}
              className="p-2 cursor-pointer hover:shadow-lg m-1 w-1/2 flex justify-center"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
