import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import ProductCard from "./ProductCard";
import { useRef, useState } from "react";
import "swiper/css/pagination";
import "swiper/css";

const ProductSlider = ({ products }) => {
    const swiperRef = useRef();
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);

    const handleSlideChange = (swiper) => {
        if (swiper.isBeginning) {
            setIsAtStart(true); 
        } else {
            setIsAtStart(false);
        }

        if (swiper.isEnd) {
            setIsAtEnd(true);
        } else {
            setIsAtEnd(false);
        }
    };

    return (
        <section className="relative mb-1">
            <Swiper
                slidesPerView={7}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                modules={[Pagination]}
                className="h-[272px]"
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
                onSlideChange={handleSlideChange}
                breakpoints={{
                    240: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 4,
                    },
                    1024: {
                        slidesPerView: 5,
                    },
                    1280: {
                        slidesPerView: 6,
                    },
                    1536: {
                        slidesPerView: 7,
                    },
                }}
            >
                {products.length > 0 ? products.map((product, index) => (
                    <SwiperSlide key={index}>
                        <ProductCard product={product} />
                    </SwiperSlide>
                )) : (
                    new Array(8).fill().map((_, index) => (
                        <SwiperSlide className="w-full h-[calc(100%-30px)] rounded-md border border-neutral-300 bg-neutral-200 animate-pulse" key={index}>
                            <div className="bg-neutral-300 h-36" />
                            <div className="px-1 flex flex-col gap-1">
                                <div className="bg-neutral-300 h-4 w-full mt-1 rounded-md" />
                                <div className="bg-neutral-300 h-4 w-20 rounded-md" />
                                <div className="bg-neutral-300 h-4 w-14 rounded-md" />
                                <div className="bg-indigo-300 h-7 w-full rounded-md" />
                            </div>
                        </SwiperSlide>
                    ))
                )}
            </Swiper>
            <button
                className={`hidden lg:block absolute z-10 top-1/2 -translate-y-1/2 -mt-[30px] bg-neutral-200 p-1 -ml-[14px] active:scale-95 rounded-full transition-all ${isAtStart ? "opacity-0 invisible" : "opacity-100 visible"}`}
                onClick={() => swiperRef.current?.slidePrev()}
            >
                <ChevronLeft className="w-5 h-5 opacity-70" />
            </button>
            <button
                className={`hidden lg:block absolute z-10 top-1/2 -translate-y-1/2 -mt-[30px] bg-neutral-200 p-1 -mr-[14px] active:scale-95 rounded-full transition-all right-0 ${isAtEnd ? "opacity-0 invisible" : "opacity-100 visible"}`}
                onClick={() => swiperRef.current?.slideNext()}
            >
                <ChevronRight className="w-5 h-5 opacity-70" />
            </button>
        </section>
    );
};

export default ProductSlider;
