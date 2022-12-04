import { GoogleLogin } from "@react-oauth/google"
import jwtDecode from "jwt-decode"
import { useState } from "react"
import { ImCross } from "react-icons/im"
import "./LoginPopup.scss"

const LoginPopup = ({ logUserIn, isVisible, setIsVisible }) => {
  return (
    <>
        <div className={`login-popup-${isVisible ? "visible" : "invisible"}`}>
            <div className="head">
                <h3>PREFERITI</h3>
                <ImCross onClick={() => setIsVisible(false)} color="black" size="1rem" />
            </div>
            <p>Accedi al tuo account Google per salvare le tue foto preferite!</p>
            <div className="login-btn">
                <GoogleLogin auto_select onSuccess={res => {
                    const { sub, picture, name, email } = jwtDecode(res.credential)
                    logUserIn(sub, name, email, picture)
                    setIsVisible(false)
                }} />
            </div>
        </div>
        <div className={`obfuscator ${isVisible ? "visible" : "invisible"}`}></div>
    </>
  )
}

export default LoginPopup