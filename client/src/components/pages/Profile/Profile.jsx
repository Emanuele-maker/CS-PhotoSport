import Heading from "../../Heading/Heading"
import "./Profile.scss"
import { FiLogOut } from "react-icons/fi"
import { GoogleLogin, googleLogout } from "@react-oauth/google"
import jwtDecode from "jwt-decode"
import { useEffect, useState } from "react"
import axios from "axios"
import { imagesRoute, siteRoute } from "../../../staticInfo"
import ImageCard from "../../ImageCard/ImageCard"
import { AiOutlineUser } from "react-icons/ai"

const Profile = ({ userName, email, isLoggedIn, logUserIn, setIsLoggedIn, profilePicture }) => {
  const boughtImages = JSON.parse(localStorage.getItem("userImages")) || [] 

  const downloadImage = (img, imageSrc) => {
    const link = document.createElement('a')
    link.href = imageSrc
    link.download = img.fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const download = (imageName) => {
    const image = boughtImages.find(img => img.fileName === imageName)
    if (image.subCategory !== undefined) downloadImage(image, `${imagesRoute}/${image.category}/${image.subCategory}/${image.album}/${image.fileName}`)
    else downloadImage(image, `${imagesRoute}/${image.category}/${image.album}/${image.fileName}`)
  }

  return (
    <>
      {
        isLoggedIn ?
        <div className="profile-page">
            <Heading backUrl={-1}>Il tuo account</Heading>
            <div className="profile-info">
                {
                  (profilePicture && isLoggedIn) ?
                  <img src={profilePicture} />
                  :
                  (isLoggedIn && !profilePicture) && 
                  <AiOutlineUser color="white" />
                }
                <h2>{ userName }</h2>
                <h3>{ email }</h3>
                <button className="logout" onClick={() => {
                  googleLogout()
                  setIsLoggedIn(false)
                }}>
                  <FiLogOut size="1.5rem" color="white" />
                  Disconnetti
                </button>
            </div>
            {
              (boughtImages && boughtImages.length > 0) &&
              <div className="bought-images">
                <h1 style={{ width: "100%", color: "white", textAlign: "center" }}>LE TUE FOTO</h1>
                <div className="photos-container grid">
                  {
                    boughtImages.map(image => (
                      <ImageCard download={download} imageName={image.fileName} imageSrc={`${imagesRoute}/${image.category}/${image.album}/${image.fileName}`} />
                    ))
                  }
                </div>
              </div>
            }
        </div>
        :
        <div className="login-page">
          <Heading backUrl={-1}>REGISTRATI</Heading>
          <div className="login-btn">
            <GoogleLogin auto_select onSuccess={res => {
              const { sub, picture, name, email } = jwtDecode(res.credential)
              logUserIn(sub, name, email, picture)
            }} />
          </div>
          <p className="register-explaination">
            Registrati con il tuo account Google per salvare le foto che acquisti su tutti i tuoi dispositivi.
          </p>
        </div>
      }
    </>
  )
}

export default Profile