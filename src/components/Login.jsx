import { X } from "lucide-react";
import { Google } from "./icons/index";
import { Apple } from "./icons/index";
import { useLoginStore } from "../states/Login";
import { useEffect, useState } from "react";

const Login = () => {
    const visibility = useLoginStore((state) => state.loginVisibility);
    const [register, setRegister] = useState(false);
    const toggleLoginVisibility = useLoginStore(
        (state) => state.toggleLoginVisibility
    );

    useEffect(() => {
        if (visibility) {
            document.body.style.overflow = "hidden"
        } else (
            document.body.style.overflow = "auto"
        )
    }, [visibility])

    return (
        <section
            className={`absolute bg-neutral-300/70 backdrop-blur-md w-full h-screen top-0 z-50 px-1 lg:px-0 transition-all ${visibility ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                <ul className="w-[350px] p-3 bg-neutral-100 rounded-md flex flex-col gap-3">
                    <button
                        className="absolute right-0 top-0 bg-neutral-200 hover:bg-neutral-300/80 transition-colors rounded-full p-1 m-1"
                        onClick={toggleLoginVisibility}
                    >
                        <X />
                    </button>
                    <li>
                        <h3 className="text-center text-indigo-500 text-3xl font-medium">
                            {register ? "Register" : "Login"}
                        </h3>
                    </li>
                    <li className={register ? "block" : "hidden"}>
                        <label className="block" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="py-2 px-2 w-full bg-neutral-200 rounded-md border border-neutral-300 focus:outline-none"
                            id="username"
                            type="text"
                            autoComplete="off"
                        />
                    </li>
                    <li>
                        <label className="block" htmlFor="eMail">
                            E-mail
                        </label>
                        <input
                            className="py-2 px-2 w-full bg-neutral-200 rounded-md border border-neutral-300 focus:outline-none"
                            id="eMail"
                            type="email"
                            autoComplete="off"
                        />
                    </li>
                    <li>
                        <label className="block" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="py-2 px-2 w-full bg-neutral-200 rounded-md border border-neutral-300 focus:outline-none"
                            id="password"
                            type="password"
                        />
                    </li>
                    <li className="flex items-center gap-2 text-xs">
                        <div className="w-full h-px bg-neutral-300" />
                        <button onClick={() => setRegister(!register)}>
                            {register ? "Login" : "Register"}
                        </button>
                        <div className="w-full h-px bg-neutral-300" />
                    </li>
                    <li>
                        <button className="btn w-full">
                            {register ? "Register" : "Login"}
                        </button>
                    </li>
                    <li className="flex justify-center gap-3">
                        <button className="p-2 border border-neutral-300 hover:bg-indigo-500/80 hover:text-neutral-100 hover:border-transparent transition-all flex items-center gap-1 text-xs font-medium rounded-md">
                            <Google className="w-5 h-5" />
                            Google
                        </button>
                        <button className="p-2 border border-neutral-300 hover:bg-indigo-500/80 hover:text-neutral-100 hover:border-transparent transition-all flex items-center gap-1 text-xs font-medium rounded-md">
                            <Apple className="w-5 h-5" />
                            Apple
                        </button>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default Login;
