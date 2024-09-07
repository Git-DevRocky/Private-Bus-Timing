import axios from "axios";

export const handleGeocode = async (placeName) => {
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: placeName,
          format: "json",
          addressdetails: 1,
        },
      }
    );

    if (response.data && response.data[0]) {
      return response.data[0];
    }
  } catch (err) {
    console.log(err);
  }
};
