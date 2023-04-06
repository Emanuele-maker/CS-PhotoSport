import { FaShoppingCart, FaBars } from "react-icons/fa"
import { AiOutlineInfoCircle, AiOutlineSearch, AiOutlineUser, AiOutlineUserAdd } from "react-icons/ai"
import "./Header.scss"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Tada from 'react-reveal/Tada'
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai"
import { BsNewspaper } from "react-icons/bs"
import { FaQuestion, FaWallet } from "react-icons/fa"
import { buildRoute } from "../../../staticInfo"
import HeaderItem from "../../HeaderItem/HeaderItem"
// import { AiOutlineGoogle } from "react-icons/ai"
import jwtDecode from "jwt-decode"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Header({ cartCount, setMobileNavbar, shakeCartIcon, setShakeCartIcon, isLoggedIn, logUserIn, profilePicture }) {
    const navigate = useNavigate()
    const [canLoadImage, setCanLoadImage] = useState(false)

    // const login = useGoogleLogin({
    //     onSuccess: response => console.log(response),
    //     flow: "auth-code"
    // })

    const donate = () => {
        window.open("https://donate.stripe.com/cN203Ycfkg1f6xW3cc")
    }

    useEffect(() => {
        if (!profilePicture) return
        axios.get(profilePicture, {
            method: "GET"
        })
        .then(res => {
            setCanLoadImage(res.status === 200)
        })
    }, [])

    return (
        <div className={`header`}>
            <FaBars size="1.5rem" className="icon bars" color="white" onClick={setMobileNavbar} />
            <div className="desktop-left">
                <Link to="/" className="header-site-logo"><img src={`${buildRoute}/favicon.png`} alt="Logo del sito" className="header-site-logo-image" /></Link>
                <div className="header-items-list">
                    <HeaderItem title="Home" icon={<AiOutlineHome size="18px" color="white" />} href="/" />
                    <HeaderItem title="Chi Siamo" icon={<FaQuestion size="18px" color="white" />} href="/chi-siamo" />
                    <HeaderItem title="Informazioni" icon={<AiOutlineInfoCircle size="18px" color="white" />} href="/info" />
                    {/* <HeaderItem title="News" icon={<BsNewspaper size="18px" color="white" />} href="/news" /> */}
                    <HeaderItem title="Social" icon={<AiOutlineMail size="18px" color="white" />} href="/social" />
                </div>
            </div>
            <div className="cart-container">
                <button className="donate-button donate-nav-button" onClick={() => donate()}>
                    <FaWallet size="1rem" color="white" />
                    Dona
                </button>
                {/* <AiOutlineGoogle size="2rem" className="icon search-icon" onClick={() => login()} /> */}
                <div className="search-container" onClick={() => navigate("/ricerca")}>
                    <AiOutlineSearch size="2rem" className="icon search-icon" />
                </div>
                <Link to="/carrello">
                    <Tada spy={shakeCartIcon} onReveal={() => setShakeCartIcon(false)}>
                        <FaShoppingCart color="white" size="1.5rem" className="icon cart-icon" />
                    </Tada>
                </Link>
                <p className="cart-count">{ cartCount }</p>
                    <Link to="/profilo" className="profile-picture-container">
                        {
                            profilePicture ?
                            <img src={profilePicture} className="profile-picture" />
                            :
                            <AiOutlineUser className="profile-picture" color="white" size="2rem" />
                        }
                    </Link>
            </div>
        </div>
    )
}