import Navbar from "./Navbar/Navbar"
import Footer from "./Footer/Footer"

export default function Layout({ children, cartCount }) {
    return (
        <>
            <Navbar cartCount={cartCount} />
                { children }
            <Footer />
        </>
    )
}