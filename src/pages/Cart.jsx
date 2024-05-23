import React, { useEffect, useState } from "react";
import { supabase } from "../CreateClient";
import toRupiah from "@develoka/angka-rupiah-js";
import { useNavigate } from "react-router-dom";
import LoadingBar from "../components/LoadingBar";
import { useAuth } from "../auth/AuthProvider";

const Cart = () => {
  const [getCart, setGetCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkedItems, setCheckedItems] = useState([]);
  const navigate = useNavigate();
  const [grandPrice, setGrandPrice] = useState(0);
  const [jumlah, setJumlah] = useState(0);
  const { user } = useAuth();

  const tambahJumlah = () => {
    setJumlah(jumlah + 1);
  };

  const kurangJumlah = () => {
    if (jumlah > 1) {
      setJumlah(jumlah - 1);
    }
  };

  const hapusSemuaKeranjang = async () => {
    try {
      await supabase.from("keranjang").delete().eq("id_user", user.id);
      console.log("Keranjang berhasil dihapus setelah checkout");
    } catch (error) {
      console.error("Error saat menghapus keranjang:", error.message);
    }
  };

  const handlePesanan = async (e) => {
    e.preventDefault();

    const { data: getName } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id);

    let getNamaProduk = getCart
      .filter((produk) => checkedItems.includes(produk.id))
      .map((produk) => produk.name_product);

    const { data } = await supabase
      .from("pesanan")
      .insert({
        id_pemesan: user.id,
        nama_pemesan: getName[0].full_name,
        nama_produk: getNamaProduk,
        total_harga: totalPrice,
        jumlah_product: jumlah,
      })
      .select();

    if (data) {
      alert("Pesanan segera diproses");
      await hapusSemuaKeranjang(); // Panggil fungsi untuk menghapus keranjang
      navigate("/");
    }
  };

  async function fetchCart() {
    const { data } = await supabase
      .from("keranjang")
      .select("*")
      .eq("id_user", user.id);
    setGetCart(data);
  }

  useEffect(() => {
    fetchCart();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [checkedItems]);

  const calculateTotalPrice = () => {
    const total = getCart
      .filter((item) => checkedItems.includes(item.id))
      .reduce((sum, item) => sum + item.price * item.jumlah_product, 0);
    setTotalPrice(total);
  };

  const handleCheck = (id) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const image = (filename) => {
    console.log(filename);
    try {
      const { data, error } = supabase.storage
        .from("image_product")
        .getPublicUrl("products/" + filename);
      if (error) {
        throw error;
      }
      return data.publicUrl;
    } catch (error) {
      console.error("Error getting image URL:", error.message);
    }
  };

  async function deleteCart(cartId) {
    const { data, error } = await supabase
      .from("keranjang")
      .delete()
      .eq("id", cartId);

    fetchCart();

    if (!error) {
      alert("Pesanan Anda Sudah Selesai");
    }
  }

  if (isLoading) {
    return <LoadingBar />;
  }

  return (
    <>
      <h2 className="text-center text-2xl font-oswald text-black mt-10">
        Silahkan Bayar Pesanan Kamu !!
      </h2>
      <div className="flex flex-col gap-2 mt-10 w-full h-full flex-wrap text-center">
        {getCart.map((g) => (
          <div
            key={g.id}
            className="card py-3 border-y rounded-none flex flex-col md:flex-row w-full h-full items-center"
          >
            <input
              type="checkbox"
              className="checkbox mx-3 ms-10"
              checked={checkedItems.includes(g.id)}
              onChange={() => handleCheck(g.id)}
            />
            <div className="flex items-center">
              <img
                className="object-cover h-32 w-32 m-3"
                src={image(g.image)}
                alt={g.name_product}
              />
            </div>
            <div className="flex flex-col md:flex-row">
              <h1 className="mt-3 md:mt-0 ms-0 md:ms-7 md:w-80 text-black">
                {g.name_product}
              </h1>
              <h2 className="ms-3 md:ms-20 text-black">
                IDR {toRupiah(g.price * g.jumlah_product)}
              </h2>
            </div>
            <div className="flex items-center md:ms-20">
              <div className="flex justify-between gap-2 mt-3 md:mt-0 md:ms-0">
                <button className="btn btn-outline" onClick={kurangJumlah}>
                  -
                </button>
                <input
                  type="text"
                  value={g.jumlah_product}
                  readOnly
                  className="w-12 rounded-lg border border-black text-center bg-transparent"
                />
                <button className="btn btn-outline" onClick={tambahJumlah}>
                  +
                </button>
              </div>
            </div>
            <h1
              className="mt-3 md:mt-0 ms-0 md:ms-16 text-black hover:text-red-500"
              onClick={() => deleteCart(g.id)}
            >
              Selesai
            </h1>
          </div>
        ))}
      </div>
      <div className="card border-t rounded-none flex md:flex md:flex-row justify-between items-center w-full h-5 mt-36 p-5">
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            className="checkbox mx-3"
            onChange={(e) =>
              setCheckedItems(
                e.target.checked ? getCart.map((item) => item.id) : []
              )
            }
          />
          <h2 className="text-black">Pilih Semua Produk()</h2>
        </div>
        <h2 className="text-black mt-4">Total : {toRupiah(totalPrice)}</h2>
        <form onSubmit={handlePesanan} className="">
          <button
            className="btn mt-8 btn-neutral border px-5 py-2 text-white hover:bg-slate-400"
            type="submit"
          >
            Bayar Sekarang
          </button>
        </form>
      </div>
    </>
  );
};

export default Cart;
