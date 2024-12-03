import axios from "axios";
import { useEffect, useState } from "react";
import ProductSlider from "../components/ProductSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "../components/Image";
import { Apple, Canon, Microsoft, Nike, Samsung, Sony, Star } from "../components/icons";
import { Link } from "react-router-dom";
import { Autoplay } from 'swiper/modules';

const Home = () => {
    const [allProduct, setAllProducts] = useState([]);

    useEffect(() => {
        getProductsData();
    }, []);

    const getProductsData = async () => {
        try {
            const response = await axios.get(
                import.meta.env.VITE_API_URL + "/products"
            );
            setAllProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <section className="grid lg:grid-cols-4 grid-cols-2 lg:mb-3 py-2 gap-1 lg:gap-5">
                <span className="cursor-pointer bg-green-500/50 px-3 py-3 font-medium rounded-md text-center text-nowrap lg:text-base text-[9px] text-green-800">Extra discount on $250 and above</span>
                <span className="cursor-pointer bg-indigo-500/50 px-3 py-3 font-medium rounded-md text-center text-nowrap lg:text-base text-xs text-indigo-800">End of Year Discounts</span>
                <span className="cursor-pointer bg-amber-500/50 px-3 py-3 font-medium rounded-md text-center text-nowrap lg:text-base text-xs text-amber-800">Buy Double, Get Half Price</span>
                <span className="cursor-pointer bg-stone-500/50 px-3 py-3 font-medium rounded-md text-center text-nowrap lg:text-base text-xs text-stone-800">Black Friday</span>
            </section>
            {
                allProduct.length > 0 ? (
                    <section className="mb-3 lg:mb-5 lg:grid lg:grid-cols-5 gap-3">
                        <div className="bg-indigo-500/70 col-span-2 rounded-md p-1 relative overflow-hidden">
                            <span className="absolute bg-neutral-100/40 w-52 h-52 rounded-full -top-24 -left-24" />
                            <span className="absolute bg-neutral-100/50 w-48 h-48 rounded-full -top-24 -left-24" />
                            <h1 className="text-neutral-100 text-xl font-medium text-center py-2 lg:py-5">Special for you</h1>
                            <Swiper
                                slidesPerView={2}
                                spaceBetween={5}
                                autoplay={{
                                    delay: 4000,
                                    disableOnInteraction: false,
                                }}
                                modules={[Autoplay]}
                            >
                                {
                                    allProduct.slice(5, 15).map((product, index) => (
                                        <SwiperSlide key={index}>
                                            <Link to={`product/${product.id}`} className="lg:h-[90px] h-[60px] bg-neutral-200 rounded flex items-center gap-1">
                                                <div className="flex justify-center w-24 h-full p-4 bg-white rounded-l">
                                                    <Image className="h-full object-contain" src={product.imageUrl} />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <h5 className="line-clamp-1 text-sm font-medium">{product.name}</h5>
                                                    <div className="flex items-center">
                                                        <span className="text-[8px] font-medium">{product.rating} /</span>
                                                        {
                                                            new Array(Math.floor(product.rating)).fill().map((_, index) => (
                                                                <span className="text-yellow-500" key={index}><Star className="w-3 h-3" /></span>
                                                            ))
                                                        }
                                                    </div>
                                                    <span className="text-xs font-medium">{product.price}$</span>
                                                </div>
                                            </Link>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        </div>

                        {
                            window.screen.width > 1024 && (
                                <div className="bg-indigo-500/70 col-span-3 rounded-md p-1">
                                    <h1 className="text-neutral-100 text-xl font-medium text-center py-5">Discounted products</h1>
                                    <Swiper
                                        slidesPerView={3}
                                        spaceBetween={5}
                                        autoplay={{
                                            delay: 2500,
                                            disableOnInteraction: false,
                                        }}
                                        modules={[Autoplay]}
                                    >
                                        {
                                            allProduct.slice(16, 25).map((product, index) => (
                                                <SwiperSlide className="h-[90px] bg-neutral-200 rounded flex items-center gap-1" key={index}>
                                                    <Link to={`product/${product.id}`} className="lg:h-[90px] h-[60px] bg-neutral-200 rounded flex items-center gap-1">
                                                        <div className="flex justify-center w-24 h-full p-4 bg-white rounded-l">
                                                            <Image className="h-full object-contain" src={product.imageUrl} />
                                                        </div>
                                                        <div className="flex flex-col gap-1">
                                                            <h5 className="line-clamp-1 text-sm font-medium">{product.name}</h5>
                                                            <div className="flex items-center">
                                                                <span className="text-[8px] font-medium">{product.rating} /</span>
                                                                {
                                                                    new Array(Math.floor(product.rating)).fill().map((_, index) => (
                                                                        <span className="text-yellow-500" key={index}><Star className="w-3 h-3" /></span>
                                                                    ))
                                                                }
                                                            </div>
                                                            <span className="text-xs font-medium">{product.price}$</span>
                                                        </div>
                                                    </Link>
                                                </SwiperSlide>
                                            ))
                                        }
                                    </Swiper>
                                </div>
                            )
                        }
                    </section>
                ) : (
                    <section className="mb-5 lg:grid lg:grid-cols-5 gap-3 animate-pulse">
                        <div className="bg-indigo-500/70 col-span-2 h-[110px] lg:h-[166px] rounded-md" />
                        <div className="bg-indigo-500/70 col-span-3 h-[166px] rounded-md hidden lg:block" />
                    </section>
                )
            }
            <ProductSlider products={allProduct.slice(0, 9)} />
            <ProductSlider products={allProduct.slice(9, 17)} />
            <section className="bg-neutral-200 border border-neutral-300 px-20 rounded-md mb-5 w-full h-32 hidden lg:block">
                <h3 className="font-medium text-xl text-center mt-3">Brands you might like</h3>
                <div className="flex justify-between items-center">
                    <Samsung className="w-24 h-24 cursor-pointer" />
                    <Canon className="w-24 h-24 cursor-pointer" />
                    <Apple className="w-14 h-14 cursor-pointer" />
                    <Nike className="w-24 h-24 cursor-pointer" />
                    <Microsoft className="w-24 h-24 cursor-pointer" />
                    <Sony className="w-24 h-24 cursor-pointer" />
                </div>
            </section>
            <ProductSlider products={allProduct.slice(17, 25)} />
        </>
    );
};

export default Home;
