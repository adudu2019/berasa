import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../CreateClient";
import TableBody from "./TableAdmin";

const Admin = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoadig] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, []);

  async function fetchProduct() {
    const { data } = await supabase.from("product").select("*");
    setProduct(data);
    setIsLoadig(false);
    console.log(data);
  }

  async function deleteProduct(productId) {
    const { data: getImageById } = await supabase
      .from("product")
      .select("image")
      .eq("id", productId);

    const { data: getImage } = await supabase.storage
      .from("image_product")
      .remove([`products/${getImageById[0].image}`]);

    const { error } = await supabase
      .from("product")
      .delete()
      .eq("id", productId);
    if (!error && getImage) {
      alert("Berhasil hapus product");
      window.location.reload();
    }
  }

  return (
    <>
      <h1 className="text-center mt-8 text-xl font-oswald text-black">
        SELAMAT DATANG ADMIN !!
      </h1>

      <div className="flex w-full lg:flex  lg:w-full  mt-5 gap-3">
        <button
          className="btn hover:bg-neutral-500 text-black mb-3 py-3 px-6 lg:py-3 lg:px-6 btn-outline border-black ms-6"
          onClick={() => navigate("/insert")}
        >
          + Add Product
        </button>

        <button
          className="btn hover:bg-neutral-500 text-black  py-3 px-6 btn-outline border-black"
          onClick={() => navigate("/orderan")}
        >
          Pesanan Customer
        </button>
      </div>

      <div className="overflow-x-auto px-5 pt-5 w-full flex flex-col justify-center items-center">
        <table className="table border flex-col flex justify-center items-center">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th className="p-3 md:p-5 border-b-2 text-black">No</th>
              <th className="w-20 md:w-24 border-b-2 text-black">
                Image Product
              </th>
              <th className="border-b-2 text-black">Name Product</th>
              <th className="border-b-2 text-black">Type Product</th>
              <th className="border-b-2 text-black">Stock Product</th>
              <th className="border-b-2 text-black">Price</th>
              <th className="border-b-2 text-black">Description</th>
              <th className="border-b-2 text-black">Action</th>
            </tr>
          </thead>
          {isLoading ? (
            <>{/* <LoadingBar /> */}</>
          ) : (
            <>
              {product.map((p) => (
                <TableBody
                  key={p.id}
                  deleteProduct={deleteProduct}
                  navigate={navigate}
                  p={p}
                />
              ))}
            </>
          )}
        </table>
      </div>
    </>
  );
};

export default Admin;
