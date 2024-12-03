import { useLocation } from "react-router-dom"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Router from "~/Router/router"

const App = () => {
    const location = useLocation()

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-2 lg:px-32 text-neutral-700">
                <Router />
            </div>
            {
                location.pathname == "/" && <Footer />
            }
        </>
    )
}

export default App