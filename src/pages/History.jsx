import React, { useEffect, useState } from "react";
import { supabase } from "../CreateClient";
import toRupiah from "@develoka/angka-rupiah-js";
import { useAuth } from "../auth/AuthProvider";
import LoadingBar from "../components/LoadingBar";

const History = () => {
  const [getHistory, setGetHistory] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  const getAllHistory = async () => {
    const { data } = await supabase
      .from("pesanan")
      .select("*")
      .eq("id_pemesan", user.id);
    setGetHistory(data);
    setLoading(false);
    console.log(data);
  };

  useEffect(() => {
    getAllHistory();
  }, [getHistory]);

  if (loading) {
    return <LoadingBar />;
  }
  return (
    <>
      <h2 className="text-center text-2xl font-oswald text-black mt-10">
        History Pesanan
      </h2>
      {getHistory !== null ? (
        <>
          <div className="flex flex-col gap-2 w-full h-full flex-wrap p-5 md:p-10">
            {getHistory.map((h) => (
              <div className="card border rounded-none flex flex-col md:flex-row w-full h-full items-center">
                <img
                  className="object-cover h-32 w-42 my-3 md:mx-6"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Jefri_Nichol_in_2019.png/220px-Jefri_Nichol_in_2019.png"
                />
                <div className="flex flex-col md:flex-row w-full md:w-auto justify-between items-center">
                  <h1 className="text-center md:ms-10 text-black w-full md:w-64 h-full ">
                    {h.nama_produk}
                  </h1>

                  <h2 className="mt-3 md:mt-0 ms-0 md:ms-20 text-black">
                    IDR {toRupiah(h.total_harga)}
                  </h2>
                  <h2 className="mt-3 md:mt-0 ms-0 md:ms-20 text-black">
                    Sedang Di Siapkan
                  </h2>
                  <h1
                    className="mt-3 md:mt-0 ms-0 md:ms-20 w-20 me-5 text-center text-black hover:text-red-500 cursor-pointer"
                    // onClick={() => deleteCart(g.id)}
                  >
                    Detail
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="text-center text-2xl font-oswald text-black mt-10">
            Tidak Ada History Pesanan Apapun!
          </h2>
        </>
      )}
    </>
  );
};

export default History;
