import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaStar } from "react-icons/fa";

import {
  Pagination,
  Navigation,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

import { useRef } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
import { supabase } from "../CreateClient";
import LoadingBar from "../components/LoadingBar";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [getProduct, setGetProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [loading, setLoading] = useState(true);
  const array = [1, 2, 3, 4, 5, 6, 7];
  const truncate = (str, maxLength, trunct) => {
    if (str.length >= maxLength) {
      return `${str.substring(0, trunct)}....`;
    } else {
      return str;
    }
  };

  // Menghitung indeks produk untuk halaman saat ini
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = getProduct.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Mengubah halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
    const makanan = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}`, {
        headers: {
          "X-RapidAPI-Key": `${import.meta.env.VITE_APIKEY}`,
          "X-RapidAPI-Host": `the-mexican-food-db.p.rapidapi.com`,
        },
      });
      setData(res.data);
    };
    async function fetchProduct() {
      const { data } = await supabase
        .from("product")
        .select("*")
        .eq("type_product", "Minuman");
      setGetProduct(data);
      console.log(data);
      setLoading(false);
    }
    fetchProduct();
    makanan();
  }, []);

  // console.log(data.map((i) => i.title));
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    // progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  if (loading) {
    return <LoadingBar />;
  }
  return (
    <>
      <Header />
      <img src="./assets/back.png" alt="" className="absolute" />
      {/* section carousel */}
      <section className="bg-white pt-20 px-10" id="home">
        <div className="w-full h-full">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="mySwiper"
          >
            <SwiperSlide>
              <img src="./assets/Berasa1.png" className="w-full" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="./assets/Berasa2.png" className="w-full" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="./assets/Berasa3.png" className="w-full" />
            </SwiperSlide>
            <div className="autoplay-progress" slot="container-end">
              <div ref={progressCircle}></div>
              {/* <span ref={progressContent}></span> */}
            </div>
          </Swiper>
        </div>
      </section>

      {/* section partnership  */}
      <section id="partnership" className="">
        <a href="#partnership"></a>
        <h2 className="font-oswald text-center text-xl mt-24">PARTNERSHIP</h2>

        <div className="flex flex-wrap gap-5 justify-center p-8">
          <div className="border shadow-md w-72 h-32 py-3">
            <img src="./assets/cibugary.png" alt="..." className=" p-5" />
          </div>

          <div className="border shadow-md w-72 h-32 py-3">
            <img src="./assets/cibugary.png" alt="..." className=" p-5" />
          </div>

          <div className="border shadow-md w-72 h-32 py-3">
            <img src="./assets/cibugary.png" alt="..." className=" p-5" />
          </div>

          <div className="border shadow-md w-72 h-32 py-3">
            <img src="./assets/cibugary.png" alt="..." className=" p-5" />
          </div>

          <div className="border shadow-md w-72 h-32 py-3">
            <img src="./assets/cibugary.png" alt="..." className=" p-5" />
          </div>
        </div>
      </section>

      {/* section produk */}
      <section id="foodmenu" className="items-center">
        <a href="#foodmenu"></a>
        <h2 className="font-oswald text-center text-xl mt-24">FOOD MENU</h2>

        <div className="flex items-center justify-center px-5 gap-3 mt-5 mb-5 flex-wrap">
          {data.slice(0, 8).map((p) => (
            <Link to={`/detail/${p.id}`}>
              <div className="card rounded-xl card-compact w-64 bg-base-100 shadow-xl hover:scale-105 transition-all">
                <figure>
                  <img
                    className="w-full object-cover h-32"
                    src={p.image}
                    alt="Shoes"
                  />
                </figure>
                <div className="card-body gap-0">
                  <div className="flex items-center justify-between">
                    <h2 className="card-title">{truncate(p.title, 15, 15)}</h2>
                    <div className="flex items-center">
                      <FaStar className="mb-1" />
                      <h2 className="">5.0</h2>
                    </div>
                  </div>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div className="flex mt-2">
                    <button className="bg-black border-white px-1.5 py-1 rounded-md text-white">
                      {" "}
                      pesan sekarang{" "}
                    </button>
                    <h2 className="mt-1 ms-20">$22</h2>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="join items-center justify-center flex mt-10">
          {[...Array(Math.ceil(data.length / productsPerPage))].map((_, i) => (
            <button
              key={i}
              className={`join-item btn ${
                currentPage === i + 1 ? "btn-active" : ""
              }`}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </section>

      {/* SECTION DRINK MENU */}
      <section id="drinkmenu">
        <a href="#drinkmenu"></a>
        <h2 className="font-oswald text-center text-xl mt-24">DRINK MENU</h2>
        <div className="flex items-center justify-center gap-3 mt-5 mb-5 flex-wrap">
          {currentProducts.slice(0, 8).map((q) => (
            <Link to={`/detail/${q.id}`}>
              <div className="card rounded-xl card-compact w-64 bg-base-100 shadow-xl hover:scale-105 transition-all">
                <figure>
                  <img
                    src={getImage(q.image)}
                    alt="Shoes"
                    className="w-full h-36 object-cover "
                  />
                </figure>
                <div className="card-body gap-0">
                  <div className="flex items-center justify-between">
                    <h2 className="card-title">{q.product_name}</h2>
                    <div className="flex items-center">
                      <FaStar className="mb-1" />
                      <h2 className="">5.0</h2>
                    </div>
                  </div>
                  <p>{q.description}</p>
                  <div className="flex mt-2">
                    <button className="bg-black border-white px-1.5 py-1 rounded-md text-white">
                      {" "}
                      pesan sekarang{" "}
                    </button>
                    <h2 className="mt-1 ms-20">$22</h2>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* pagination */}
        <div className="join items-center justify-center flex mt-10">
          {[...Array(Math.ceil(getProduct.length / productsPerPage))].map(
            (_, i) => (
              <button
                key={i}
                className={`join-item btn ${
                  currentPage === i + 1 ? "btn-active" : ""
                }`}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </section>

      {/* section our location */}

      <section id="location">
        <a href="#location"></a>
        <h2 class="font-oswald text-center text-xl mt-14">OUR LOCATION</h2>
        <div class="flex justify-center mt-5 gap-3 mb-20 flex-wrap">
          <Link to={"/Comingsoon"} class="w-96 md:w-1/3">
            <div class="card rounded-none image-full hover:scale-110 transition-all">
              <figure>
                <img
                  src="https://s3-ceph.indoteam.id/chatnews-bucket-production/wp-content/production/uploads/2023/02/11210443/image-69-768x432.png"
                  class="rounded-none brightness-50"
                />
              </figure>
              <div class="card-body items-center justify-center">
                <h2 class="text-[#ffff] font-black text-4xl">BOGOR</h2>
              </div>
            </div>
          </Link>

          <Link to={"/Comingsoon"} class="w-96 md:w-1/3">
            <div class="card rounded-none image-full hover:scale-110 transition-all">
              <figure>
                <img
                  src="https://s3-ceph.indoteam.id/chatnews-bucket-production/wp-content/production/uploads/2023/02/11210443/image-69-768x432.png"
                  class="rounded-none brightness-50"
                />
              </figure>
              <div class="card-body items-center justify-center">
                <h2 class="text-[#ffff] font-black text-4xl">JAKARTA</h2>
              </div>
            </div>
          </Link>

          <Link to={"/Comingsoon"} class="w-96 md:w-1/3">
            <div class="card rounded-none image-full hover:scale-110 transition-all">
              <figure>
                <img
                  src="https://s3-ceph.indoteam.id/chatnews-bucket-production/wp-content/production/uploads/2023/02/11210443/image-69-768x432.png"
                  class="rounded-none brightness-50"
                />
              </figure>
              <div class="card-body items-center justify-center">
                <h2 class="text-[#ffff] font-black text-4xl">BANDUNG</h2>
              </div>
            </div>
          </Link>

          <Link to={"/Comingsoon"} class="w-96 md:w-1/3">
            <div class="card rounded-none image-full hover:scale-110 transition-all">
              <figure>
                <img
                  src="https://s3-ceph.indoteam.id/chatnews-bucket-production/wp-content/production/uploads/2023/02/11210443/image-69-768x432.png"
                  class="rounded-none brightness-50"
                />
              </figure>
              <div class="card-body items-center justify-center">
                <h2 class="text-[#ffff] font-black text-4xl">JOGJA</h2>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default HomePage;
