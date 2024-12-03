import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Card from "../pages/Card"
import ProductDetails from "../pages/ProductDetails"
import NotFound from "../pages/NotFound"

const index = () => {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/card" element={<Card />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default index