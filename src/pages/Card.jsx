import axios from "axios";
import { ArrowLeftIcon, Minus, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../components/Image";
import { useCardStore } from "../states/Card";
import { Link } from "react-router-dom";

const Card = () => {
    const navigate = useNavigate();
    const [cardProducts, setCardProducts] = useState([]);
    const removeLocalProduct = useCardStore((state) => state.removeProduct);
    const increaseAndReduce = useCardStore((state) => state.editPiece);
    const [localProducts, setLocalProducts] = useState(
        localStorage.length > 0 && JSON.parse(localStorage.getItem("cardProducts")).state.products
    );

    useEffect(() => {
        localProducts && getProducts(localProducts);
    }, []);

    const removeProduct = (id) => {
        removeLocalProduct(id);
        setCardProducts(cardProducts.filter((product) => product.id != id));
    };

    const getProducts = async (products) => {
        try {
            const response = await axios.get(
                import.meta.env.VITE_API_URL +
                `/product?id=${products.map((product) => product.productId)}`
            );
            setCardProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const editPiece = (id, increase) => {
        increaseAndReduce(id, increase);
        setLocalProducts(
            JSON.parse(localStorage.getItem("cardProducts")).state.products
        );
    };

    if (cardProducts[0] != null) {
        return (
            <>
                <button
                    className="bg-neutral-200 flex gap-2 font-medium text-sm px-3 pl-10 py-1 mb-3 mt-3 rounded-full hover:bg-neutral-300 transition-colors border border-neutral-300 group relative"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeftIcon className="w-5 h-5 absolute left-[15px] group-hover:left-2 transition-all" /> Back
                </button>
                <section className="lg:flex gap-8 mt-3">
                    <div className="bg-neutral-200 w-full rounded-md border border-neutral-300 flex flex-col gap-3 px-2 lg:px-3 pb-3">
                        <h3 className="mt-3 font-medium text-xl text-center lg:text-left">Card products</h3>
                        {cardProducts.map((product, index) => {
                            const productPiece = localProducts.find(
                                (id) => id.productId == product.id
                            ).piece;

                            return (
                                <div
                                    key={index}
                                    className="bg-neutral-300 w-full h-28 lg:h-36 rounded-md p-2 flex items-center"
                                >
                                    <div className="bg-white w-52 h-full rounded-md flex justify-center p-2">
                                        <Image
                                            className="h-full object-contain"
                                            src={product.imageUrl}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 ml-2">
                                        <Link
                                            to={`/product/${product.id}`}
                                            className="font-medium text-lg line-clamp-1"
                                        >
                                            {product.name}
                                        </Link>
                                        <p className="text-sm font-medium hidden lg:block">{product.description}</p>
                                        <h4 className="font-semibold">{product.price}$</h4>
                                        <div className="flex gap-5 items-center">
                                            <div className="flex border h-fit border-neutral-400 w-fit gap-7 rounded-md items-center">
                                                <button
                                                    className="bg-neutral-200 rounded-l-md p-[5px] border-r border-neutral-400 group active:p-[7px]"
                                                    onClick={() =>
                                                        productPiece > 1
                                                            ? editPiece(product.id, false)
                                                            : removeProduct(product.id)
                                                    }
                                                >
                                                    {productPiece > 1 ? (
                                                        <Minus className="w-5 h-5 group-active:w-4 group-active:h-4" />
                                                    ) : (
                                                        <Trash className="w-5 h-5 group-active:w-4 group-active:h-4" />
                                                    )}
                                                </button>
                                                <span className="text-lg">{productPiece}</span>
                                                <button
                                                    className="bg-neutral-200 rounded-r-md p-[5px] border-l border-neutral-400 group active:p-[7px]"
                                                    onClick={() => editPiece(product.id, true)}
                                                >
                                                    <Plus className="w-5 h-5 group-active:w-4 group-active:h-4" />
                                                </button>
                                            </div>
                                            <button
                                                className="btn bg-red-500/80 hover:bg-red-500"
                                                onClick={() => removeProduct(product.id)}
                                            >
                                                <Trash className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="bg-neutral-200 fixed flex lg:block gap-2 items-center justify-between lg:static w-full -ml-2 lg:-ml-0 lg:w-[400px] h-fit lg:rounded-md border border-neutral-300 p-2 lg:top-0 top-[calc(100vh-60px)]">
                        <h3 className="mb-2 text-lg font-medium text-center hidden lg:block">
                            Order summary
                        </h3>
                        <div className="w-full h-px bg-neutral-300 hidden lg:block" />
                        {
                            window.screen.width > 1024 && (
                                <ul className="py-1 flex flex-col gap-2">
                                    {cardProducts.map((product, index) => {
                                        const productPiece = localProducts.find(
                                            (id) => id.productId == product.id
                                        ).piece;

                                        return (
                                            <li key={index} className="flex justify-between text-sm gap-2">
                                                <span className="line-clamp-1 ">{product.name}</span>
                                                <span className="font-medium">
                                                    {(product.price * productPiece).toFixed(2)}$
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )
                        }
                        <div className="w-full h-px bg-neutral-300 hidden lg:block" />
                        <div className="py-1 text-nowrap">
                            <span>Total: </span>
                            <span>
                                {cardProducts.length > 0 &&
                                    new Array(
                                        cardProducts.map((product, index) => {
                                            const productPiece = localProducts.find(
                                                (id) => id.productId == product.id
                                            ).piece;
                                            const productPrice = cardProducts.map(
                                                (product) => product.price
                                            )[index];
                                            return productPiece * productPrice;
                                        })
                                    )[0].reduce((acc, num) => acc + num, 0).toFixed(2)}$
                            </span>
                        </div>
                        <button className="btn lg:w-full text-sm py-3 lg:py-[6px]">Confirm cart</button>
                    </div>
                </section>
            </>
        );
    } else {
        return (
            <>
                <button
                    className="bg-neutral-200 flex gap-2 font-medium text-sm px-3 pl-10 py-1 mb-3 mt-3 rounded-full hover:bg-neutral-300 transition-colors border border-neutral-300 group relative"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeftIcon className="w-5 h-5 absolute left-[15px] group-hover:left-2 transition-all" /> Back
                </button>
                <section className="bg-neutral-200 rounded-md p-10 mb-[calc(100vh-474px)]">
                    <h3 className="text-center  text-2xl">Empty basket</h3>
                </section>
            </>
        )
    }
};

export default Card;
