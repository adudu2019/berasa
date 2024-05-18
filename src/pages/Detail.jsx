import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { supabase } from "../CreateClient";
import toRupiah from "@develoka/angka-rupiah-js";
import LoadingBar from "../components/LoadingBar";

const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(data.product_name);

  const { user } = useAuth();

  function getImage(filename) {
    const { data } = supabase.storage
      .from("image_product")
      .getPublicUrl("products/" + filename);
    return data.publicUrl;
  }

  const addCart = async (id) => {
    const { data } = await supabase.from("product").select("*").eq("id", id);

    try {
      if (data) {
        const { error } = await supabase
          .from("keranjang")
          .insert([
            {
              id_user: user.id,
              id_product: data[0].id,
              name_product: data[0].product_name,
              price: data[0].price,
              image: data[0].image,
            },
          ])
          .select();

        if (!error) {
          alert("produk di tambah ke keranjang");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getDetail = async (idNumber) => {
      const { data } = await supabase
        .from("product")
        .select("*")
        .eq("id", idNumber);
      setData(data[0]);
      setLoading(false);
    };
    getDetail(id);
  }, [id]);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <>
      <Header />
      <div className="flex items-center justify-center ms-32">
        <img
          src={getImage(data.image)}
          className="object-cover w-96 md:h-96 shadow-2xl h-80 md:m-14 p-5"
        />
        <div className="md:w-1/2 me-10">
          <h2 className="text-black text-2xl font-oswald">
            {data.product_name}
          </h2>
          <h2 className="text-black text-sm font-light">{data.description}</h2>
          <div className="flex flex-wrap mt-1">
            <h2 className="  text-black mt-3 text-2xl font-oswald font-semibold">
              IDR {toRupiah(data.price)}
            </h2>
            <s className="mt-3 md:ms-1 font-oswald text-1xl font-semibold">
              IDR 1.500.000.00
            </s>
            <h2 className="text-red-400 mt-3 md:ms-1 text-sm font-oswald font-semibold">
              30%.OFF
            </h2>
          </div>

          <h2 className="mt-3 text-1xl font-semibold">Size</h2>
          <div className="gap-1 flex flex-wrap mt-3">
            <div className="text-black text-xs p-1 rounded-md border border-black hover:bg-slate-500">
              Small
            </div>
            <div className="text-black text-xs p-1 rounded-md border border-black hover:bg-slate-500">
              Medium
            </div>
            <div className="text-black text-xs p-1 rounded-md border border-black hover:bg-slate-500">
              Large
            </div>
          </div>

          <div className="flex items-center mt-5">
            <div className="flex justify-between gap-2 mt-3 md:mt-0  md:ms-0">
              <button className="btn btn-outline ">-</button>
              <input
                type="text"
                placeholder="1"
                className="w-12 rounded-lg border border-black text-center bg-transparent"
              />
              <button className="btn btn-outline ">+</button>
            </div>
          </div>

          <button
            onClick={() => addCart(data.id)}
            className="border border-black mt-6 p-4 w-44 text-xs font-oswald  text-black hover:bg-slate-500"
          >
            ADD TO CART
          </button>

          <button className="ms-3 border border-black mt-6 p-4 w-44 text-xs font-oswald text-black hover:bg-slate-500">
            BUY NOW
          </button>
        </div>
      </div>
    </>
  );
};

export default Detail;
