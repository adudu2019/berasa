import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingBar from "../components/LoadingBar";

const DetailFood = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const makanan = async () => {
    try {
      const res = await axios.get(
        `https://the-mexican-food-db.p.rapidapi.com/${id}`,
        {
          headers: {
            "X-RapidAPI-Key": `9efe30bc22msh0d780eb4ea54d75p104a04jsn37b488b888f3`,
            "X-RapidAPI-Host": `the-mexican-food-db.p.rapidapi.com`,
          },
        }
      );
      setData(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching the food detail:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    makanan();
  }, []);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <>
      <h2 className="text-center text-2xl font-oswald text-black mt-10">
        DETAIL FOOD
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-center md:ms-32 p-5">
        <img
          src={data.image}
          className="object-cover w-full md:w-96 md:h-96 shadow-2xl h-80 mb-5 md:mb-0 md:m-14"
          alt={data.title}
        />
        <div className="w-full md:w-1/2 md:me-10">
          <h2 className="text-black text-2xl font-oswald">{data.title}</h2>
          <h2 className="text-black text-sm font-light">{data.time}</h2>
          <div className="flex flex-wrap mt-1">
            <h2 className="text-black mt-3 text-2xl font-oswald font-semibold">
              IDR Rp20.000.00
            </h2>
            <s className="mt-3 ms-1 text-xl font-medium">IDR Rp25.000.00</s>
            <h2 className="text-red-400 mt-3 ms-1 text-sm font-oswald font-semibold">
              30% OFF
            </h2>
          </div>

          <h2 className="mt-3 text-xl font-semibold">Size</h2>
          <div className="gap-1 flex flex-wrap mt-3">
            <div className="text-black text-xs p-2 rounded-md border border-black hover:bg-slate-500 cursor-pointer">
              Small
            </div>
            <div className="text-black text-xs p-2 rounded-md border border-black hover:bg-slate-500 cursor-pointer">
              Medium
            </div>
            <div className="text-black text-xs p-2 rounded-md border border-black hover:bg-slate-500 cursor-pointer">
              Large
            </div>
          </div>

          <div className="flex items-center mt-5">
            <div className="flex justify-between gap-2 mt-3 md:mt-0 md:ms-0">
              <button className="btn btn-outline">-</button>
              <input
                type="text"
                readOnly
                className="w-12 rounded-lg border border-black text-center bg-transparent"
              />
              <button className="btn btn-outline">+</button>
            </div>
          </div>

          <button
            onClick={() => addCart(data.id)}
            className="border border-black mt-6 p-4 w-full md:w-96 text-xs font-oswald text-black hover:bg-slate-500"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </>
  );
};

export default DetailFood;
