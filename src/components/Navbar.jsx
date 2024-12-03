import { AlignJustify, Search, ShoppingBag, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Login from "./Login";
import { useLoginStore } from "../states/Login";
import { useCardStore } from "../states/Card";
import { useEffect, useState } from "react";

const Navbar = () => {
    const location = useLocation();
    const cardProductsSize = useCardStore((state) => state.productsSize);
    const [mobileNavigation, setMobileNavigation] = useState(false);
    const toggleLoginVisibility = useLoginStore(
        (state) => state.toggleLoginVisibility
    );

    useEffect(() => {
        if (mobileNavigation) {
            document.body.style.overflow = "hidden"
        } else (
            document.body.style.overflow = "auto"
        )
    }, [mobileNavigation])

    return (
        <nav className="text-neutral-700 lg:mb-3">
            <div className="w-full bg-neutral-200 py-1">
                <div className="flex items-center justify-between container mx-auto px-2 lg:px-32">
                    <Link className="font-kanit text-indigo-500" to="/">
                        Shopping
                    </Link>
                    <p className="text-xs opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                        Help&Support
                    </p>
                </div>
            </div>
            <div className="w-full bg-neutral-100">
                <ul className="container mx-auto px-2 lg:px-32 flex items-center justify-between py-2 relative">
                    <li className="hidden lg:block">
                        <span className="flex gap-1 font-medium cursor-pointer pl-0 p-2">
                            <AlignJustify />
                            Filter
                        </span>
                    </li>
                    <li className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:w-fit w-full">
                        <Search className="absolute top-1/2 -translate-y-1/2 ml-2 text-neutral-500 w-5 h-5" />
                        <input
                            className="lg:w-[500px] w-full py-1 lg:py-2 rounded-md bg-neutral-300/70 pl-10 border-2 border-neutral-400/30 focus:border-neutral-400/70 focus:outline-none"
                            placeholder="Search"
                            type="text"
                            name="search"
                            autoComplete="off"
                        />
                    </li>
                    <li className="block lg:hidden ml-2">
                        <button
                            className="bg-neutral-300/70 rounded-md p-[6px] active:scale-95 transition-all"
                            onClick={() => setMobileNavigation(!mobileNavigation)}
                        >
                            {mobileNavigation ? <X /> : <AlignJustify />}
                        </button>
                        <section
                            className={`absolute w-full h-[calc(100vh-83px)] bg-neutral-200 mt-2 z-50 left-0 transition-all ${mobileNavigation ? "opacity-100 visible" : "opacity-0 invisible"
                                }`}
                        >
                            <div className="flex flex-col gap-3 px-2 mt-3">
                                <Link to="/" className={`btn text-center ${location.pathname == "/" ? "hidden" : "block"}`} onClick={() => setMobileNavigation(false)}>Home</Link>
                                <Link to="/card" className="btn text-center" onClick={() => setMobileNavigation(false)}>Card</Link>
                                <button
                                    className="btn text-center"
                                    onClick={toggleLoginVisibility}
                                >
                                    Login
                                </button>
                            </div>
                            <h6 className="text-xs opacity-50 absolute top-[calc(100vh-110px)] left-1/2 -translate-x-1/2">
                                {new Date().getFullYear()} Sopping all rights reserved.
                            </h6>
                        </section>
                    </li>
                    <div className="hidden lg:block">
                        <div className="flex gap-3">
                            <button className="btn" onClick={toggleLoginVisibility}>
                                Login
                            </button>
                            <Link to="/card" className="btn relative">
                                <span
                                    className={`absolute right-0 top-0 border-2 border-neutral-100 rounded-full text-sm font-medium w-6 h-6 text-center bg-indigo-300 -m-2 transition-all ${!cardProductsSize || location.pathname == "/card"
                                        ? "opacity-0 invisible"
                                        : "opacity-100 visible"
                                        }`}
                                >
                                    {cardProductsSize}
                                </span>
                                <ShoppingBag />
                            </Link>
                        </div>
                    </div>
                </ul>
            </div>
            <Login />
        </nav>
    );
};

export default Navbar;
