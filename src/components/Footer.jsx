import Image from "./Image";
import GooglePlay from "/google-play.png";
import AppStore from "/app-store.png";
import { Check } from "lucide-react";
import { Instagram, X, Youtube } from "./icons";

const Footer = () => {
    return (
        <footer className="bg-neutral-200 pt-3">
            <section className="container mx-auto px-2 lg:px-32 mb-3">
                <div className="flex justify-center lg:block">
                    <span className="font-kanit bg-indigo-500 text-indigo-100 px-2">
                        Shopping
                    </span>
                </div>
                <div className="mt-3 flex lg:flex-row lg:gap-0 flex-col gap-5 justify-between">
                    <ul>
                        <h3 className="font-medium mb-1">About us</h3>
                        <li className="text-sm cursor-pointer">Who are we?</li>
                    </ul>
                    <ul>
                        <h3 className="font-medium mb-1">Customer Service</h3>
                        <li className="text-sm cursor-pointer mb-1">Contact us</li>
                        <li className="text-sm cursor-pointer mb-1">Live support</li>
                        <li className="text-sm cursor-pointer">
                            Return and exchange policy
                        </li>
                    </ul>
                    <ul>
                        <h3 className="font-medium mb-1">Information</h3>
                        <li className="text-sm cursor-pointer mb-1">Privacy policy</li>
                        <li className="text-sm cursor-pointer mb-1">User agreement</li>
                        <li className="text-sm cursor-pointer">Delivery and shipping</li>
                    </ul>
                    <div className="flex flex-col">
                        <label className="font-medium" htmlFor="subscribeNewsletter">
                            Subscribe to our newsletter
                        </label>
                        <div className="relative">
                            <input
                                className="w-72 py-1 px-2 rounded-md border-2 border-indigo-200 bg-indigo-50 focus:outline-none focus:border-indigo-400"
                                type="email"
                                id="subscribeNewsletter"
                                name="subscribe to newsletter"
                                placeholder="example@example.com"
                            />
                            <button className="btn absolute right-0 py-1 px-3 top-1/2 -translate-y-1/2 mr-1 rounded hidden lg:block">
                                <Check className="w-5 h-5" />
                            </button>
                        </div>
                        <h3 className="font-medium my-2">Follow us on Social Media</h3>
                        <ul className="flex gap-3 items-center">
                            <li className="bg-indigo-300 cursor-pointer w-9 h-9 rounded-full flex justify-center items-center">
                                <X className="w-4 h-4" />
                            </li>
                            <li className="bg-indigo-300 cursor-pointer w-9 h-9 rounded-full flex justify-center items-center">
                                <Youtube className="w-6 h-6" />
                            </li>
                            <li className="bg-indigo-300 cursor-pointer w-9 h-9 rounded-full flex justify-center items-center">
                                <Instagram className="w-5 h-5" />
                            </li>
                        </ul>
                    </div>
                    <ul>
                        <h3 className="font-medium mb-1">Mobile app</h3>
                        <li>
                            <Image className="w-32 cursor-pointer mb-1" src={GooglePlay} />
                        </li>
                        <li>
                            <Image className="w-32 cursor-pointer" src={AppStore} />
                        </li>
                    </ul>
                </div>
            </section>
            <section className="bg-neutral-100">
                <h3 className="text-center font-medium text-xs py-1 opacity-70">{new Date().getFullYear()} Sopping all rights reserved.</h3>
            </section>
        </footer>
    );
};

export default Footer;
