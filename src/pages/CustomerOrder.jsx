import React, { useEffect, useState } from "react";
import toRupiah from "@develoka/angka-rupiah-js";
import { useAuth } from "../auth/AuthProvider";
import { supabase } from "../CreateClient";
import LoadingBar from "../components/LoadingBar";

const CustomerOrder = () => {
  const [getPesanan, setGetPesanan] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const getAllPesanan = async () => {
    const { data } = await supabase.from("pesanan").select("*");
    setGetPesanan(data);
  };

  async function deletePesanan(cartId) {
    const { data, error } = await supabase
      .from("pesanan")
      .delete()
      .eq("id", cartId);

    getAllPesanan(data);

    if (!error) {
      alert("Berhasil Delete");
    }
  }

  // Menggunakan useEffect untuk memuat data saat komponen pertama kali dimuat
  useEffect(() => {
    getAllPesanan();
    setLoading(false);
  }, []);

  if (loading) {
    return <LoadingBar />;
  }
  return (
    <>
      <h2 className="text-center text-2xl font-oswald text-black mt-10">
        Pesanan Customer
      </h2>

      <div className="flex flex-col gap-2 w-full h-full flex-wrap p-5 md:p-10">
        {getPesanan.map((p) => (
          <div
            key={p.id}
            className="card border rounded-none flex flex-col md:flex-row w-full h-full items-center text-center"
          >
            <img
              className="object-cover h-32 w-42 ms-0 md:ms-16 my-3 md:my-0"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Jefri_Nichol_in_2019.png/220px-Jefri_Nichol_in_2019.png"
              alt="produk"
            />
            <div className="flex flex-col md:flex-row w-full md:w-auto justify-between items-center">
              <h1 className="ms-0 md:ms-10 w-full md:w-72 text-black">
                {p.nama_produk}
              </h1>

              <h2 className="mt-3 md:mt-0 ms-0 md:ms-24 w-full md:w-20 text-black">
                {p.nama_pemesan}
              </h2>
              <h2 className="mt-3 md:mt-0 ms-0 md:ms-24 text-black">
                IDR {toRupiah(p.total_harga)}
              </h2>
              <h1
                className="mt-3 md:mt-0 ms-0 md:ms-14 w-full md:w-20 text-black hover:text-red-500 cursor-pointer"
                onClick={() => deletePesanan(p.id)}
              >
                Hapus
              </h1>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CustomerOrder;
