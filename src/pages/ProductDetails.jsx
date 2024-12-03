import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";
import { Star } from "../components/icons/index";
import Image from "../components/Image";
import { useCardStore } from "../states/Card";
import { ArrowLeftIcon } from "lucide-react";

const Product = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const addProductToCard = useCardStore((state) => state.addProduct);

    useEffect(() => {
        getproduct(id);
        window.scrollTo(0, 0)
    }, []);

    const getproduct = async (id) => {
        try {
            const response = await axios.get(
                import.meta.env.VITE_API_URL + `/product?id=${id}`
            );
            setProduct(response.data[0]);
        } catch (error) {
            console.log(error);
        }
    };

    if (product != 0) {
        return (
            <>
                <button
                    className="bg-neutral-200 flex gap-2 font-medium text-sm px-3 pl-10 py-1 mb-3 mt-3 rounded-full hover:bg-neutral-300 transition-colors border border-neutral-300 group relative"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeftIcon className="w-5 h-5 absolute left-[15px] group-hover:left-2 transition-all" /> Back
                </button>
                <section className="lg:flex justify-between gap-10 mb-20">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className="border border-neutral-300 rounded-md lg:w-[800px] lg:h-[550px]"
                    >
                        {new Array(4).fill().map((_, index) => (
                            <SwiperSlide key={index}>
                                <Image
                                    className="w-full h-full object-contain p-20"
                                    src={product.imageUrl}
                                    alt="Product Image"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="w-full flex flex-col gap-2 max-w-[500px]">
                        <h3 className="text-2xl font-semibold mt-2 lg:mt-0">{product.name}</h3>
                        <div className="flex items-center">
                            <span className="text-sm font-medium">{product.rating} /</span>
                            {product.rating &&
                                new Array(Math.floor(product.rating)).fill().map((_, index) => (
                                    <span className="text-yellow-500" key={index}>
                                        <Star />
                                    </span>
                                ))}
                        </div>
                        <div className="border border-neutral-300 px-2 py-1 flex w-fit rounded-md">
                            <span className="font-medium text-xs">
                                Vendor:
                                <span className="ml-1 font-kanit text-indigo-500">Shopping</span>
                            </span>
                        </div>
                        <h3 className="text-2xl font-medium">{product.price}$</h3>
                        <div>
                            <span
                                className={`text-sm font-medium ${product.category == "Electronics" ||
                                    product.category == "Footwear" ||
                                    product.category == "Wearables"
                                    ? "block"
                                    : "hidden"
                                    }`}
                            >
                                Colors
                            </span>
                            <ul
                                className={`flex gap-2 ${product.category == "Electronics" ||
                                    product.category == "Footwear" ||
                                    product.category == "Wearables"
                                    ? "block"
                                    : "hidden"
                                    }`}
                            >
                                {new Array(4).fill().map((_, index) => (
                                    <li
                                        key={index}
                                        className="border border-neutral-300 rounded-md p-2 w-28 h-10 lg:h-20 flex justify-center items-center overflow-hidden cursor-pointer"
                                    >
                                        <Image
                                            className="object-contain p-5"
                                            src={product.imageUrl}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button className="btn" onClick={() => addProductToCard(product.id)}>
                            Add to card
                        </button>
                        <div
                            className={`${product.category == "Electronics" ? "block" : "hidden"
                                }`}
                        >
                            <span className="font-medium text-sm">Additional warranty</span>
                            <ul className="flex gap-2">
                                {new Array(3).fill().map((_, index) => (
                                    <li
                                        key={index}
                                        className="w-32 border border-neutral-300 p-2 rounded-md cursor-pointer"
                                    >
                                        <span className="font-medium text-sm">
                                            Additional {index + 1} year warranty
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <span className="font-medium text-sm">Description</span>
                            <p className="text-sm border border-neutral-300 p-2 rounded-md">
                                {product.description}
                            </p>
                        </div>
                    </div>
                </section>
            </>
        );
    } else {
        return (
            <section className="lg:flex gap-10 animate-pulse mb-20 lg:mb-0">
                <div className="flex-auto lg:w-[640px] h-[400px] lg:h-[550px] bg-neutral-300 rounded-md" />
                <div className="flex flex-col gap-2 flex-auto mt-2 lg:mt-0">
                    <div className="w-72 lg:w-[400px] h-8 bg-neutral-300 rounded-md" />
                    <div className="w-28 h-7 bg-neutral-300 rounded-md" />
                    <div className="w-32 h-7 bg-neutral-300 rounded-md" />
                    <div className="w-28 h-8 bg-neutral-300 rounded-md" />
                    <div className="flex gap-2 overflow-auto">
                        {new Array(4).fill().map((_, index) => (
                            <div
                                key={index}
                                className="w-full h-10 lg:h-20 bg-neutral-300 rounded-md"
                            />
                        ))}
                    </div>
                    <div className="w-full h-10 bg-indigo-300 rounded-md" />
                    <div className="flex gap-2 overflow-auto">
                        {new Array(3).fill().map((_, index) => (
                            <div
                                key={index}
                                className="w-32 h-20 bg-neutral-300 rounded-md"
                            />
                        ))}
                    </div>
                    <div className="w-full h-20 bg-neutral-300 rounded-md" />
                </div>
            </section>
        );
    }
};

export default Product;
