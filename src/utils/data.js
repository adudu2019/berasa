import axios from "axios";

const makanan = async () => {
  const res = await axios
    .get(`${import.meta.env.VITE_BASE_URL}`, {
      headers: {
        "X-RapidAPI-Key": `${import.meta.VITE_APIKEY}`,
      },
    })
    .then((res) => console.log(res.data));
};

// headers:{
//     'x-api-key': 'Bearer 12345678')
//           }
