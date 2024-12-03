import { Link } from "react-router-dom"
import { Star } from "./icons"
import Image from "./Image"
import { useCardStore } from "../states/Card"

const ProductCard = ({ product }) => {
    const addProductToCard = useCardStore((state) => state.addProduct)

    return (
        <div className="w-full h-[calc(100%-30px)] bg-neutral-200 rounded-md border border-neutral-300">
            <div className="bg-white p-2 rounded-t-md">
                <Image className="w-full h-32 object-contain" src={product.imageUrl} alt="product image" />
            </div>
            <div className="px-1 flex flex-col gap-px">
                <Link to={`/product/${product.id}`} className="line-clamp-1 font-medium">{product.name}</Link>
                <div className="flex items-center">
                    <span className="text-[10px] font-medium">{product.rating} /</span>
                    {
                        new Array(Math.floor(product.rating)).fill().map((_, index) => (
                            <span className="text-yellow-500" key={index}><Star/></span>
                        ))
                    }
                </div>
                <span className="text-sm font-medium">{product.price}$</span>
                <button className="btn w-full py-1 text-sm" onClick={() => addProductToCard(product.id)}>Add to card</button>
            </div>
        </div>
    )
}

export default ProductCard