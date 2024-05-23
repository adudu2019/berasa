import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { supabase } from "../CreateClient";
import toRupiah from "@develoka/angka-rupiah-js";
import LoadingBar from "../components/LoadingBar";

const DetailDrink = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [jumlah, setJumlah] = useState(0);

  const tambahJumlah = () => setJumlah(jumlah + 1);
  const kurangJumlah = () => {
    if (jumlah > 0) {
      setJumlah(jumlah - 1);
    }
  };

  const getImage = (filename) => {
    const { data } = supabase.storage
      .from("image_product")
      .getPublicUrl("products/" + filename);
    return data.publicUrl;
  };

  const addCart = async (id) => {
    if (user == null) {
      window.location.replace("/login");
    }
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
              jumlah_product: jumlah,
            },
          ])
          .select();

        if (!error) {
          alert("Produk ditambahkan ke keranjang");
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
      <h2 className="text-center text-2xl font-oswald pt-10">DETAIL DRINK</h2>
      <div className="flex flex-col md:flex-row h-full md:h-screen md:ms-32 p-5">
        <img
          src={getImage(data.image)}
          className="object-cover w-full md:w-96 md:h-96 shadow-2xl h-80 md:m-14 mb-5 md:mb-0"
          alt={data.product_name}
        />
        <div className="w-full md:w-1/2 md:me-10 mt-5 md:mt-20">
          <h2 className="text-2xl font-oswald">{data.product_name}</h2>
          <h2 className="text-sm font-light">{data.description}</h2>
          <div className="flex flex-wrap mt-1">
            <h2 className="mt-3 text-2xl font-oswald font-semibold">
              IDR {toRupiah(data.price)}
            </h2>
            <s className="mt-3 ms-1 text-xl font-medium">IDR Rp25.000.00</s>
            <h2 className="text-red-400 mt-3 ms-1 text-sm font-oswald font-semibold">
              30% OFF
            </h2>
          </div>

          <h2 className="mt-3 text-xl font-semibold">Size</h2>
          <div className="gap-1 flex flex-wrap mt-3">
            <div className="text-xs p-2 rounded-md border border-black hover:bg-slate-500 cursor-pointer">
              Small
            </div>
            <div className="text-xs p-2 rounded-md border border-black hover:bg-slate-500 cursor-pointer">
              Medium
            </div>
            <div className="text-xs p-2 rounded-md border border-black hover:bg-slate-500 cursor-pointer">
              Large
            </div>
          </div>

          <div className="flex items-center mt-5">
            <div className="flex justify-between gap-2 mt-3 md:mt-0">
              <button className="btn btn-outline" onClick={kurangJumlah}>
                -
              </button>
              <input
                type="text"
                value={jumlah}
                readOnly
                className="w-12 rounded-lg border border-black text-center bg-transparent"
              />
              <button className="btn btn-outline" onClick={tambahJumlah}>
                +
              </button>
            </div>
          </div>

          <button
            onClick={() => addCart(data.id)}
            className="border border-black mt-6 p-4 w-full md:w-96 text-xs font-oswald hover:bg-slate-500"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </>
  );
};

export default DetailDrink;
