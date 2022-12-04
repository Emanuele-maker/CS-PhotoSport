import { useState, useEffect } from "react"
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import Album from "./components/pages/Album/Album"
import Cart from "./components/pages/Cart/Cart"
import Home from "./components/pages/Home/Home"
import Success from "./components/pages/Success/Success"
import "./style.scss"
import NotFound from "./components/pages/404/404"
import AlbumList from "./components/AlbumList/AlbumList"
import Contact from "./components/pages/Contact/Contact"
import { siteRoute } from "./staticInfo"
import SearchPage from "./components/pages/SearchPage/SearchPage"
import News from "./components/pages/News/News"
import PhotoPage from "./components/pages/PhotoPage/PhotoPage"
import About from "./components/pages/About/About"
import formatURL from "./formatURL"
import axios from "axios"
import Profile from "./components/pages/Profile/Profile"
import PrivacyPolicy from "./components/pages/PrivacyPolicy/PrivacyPolicy"

const categories = JSON.parse(JSON.stringify(require("./categories.json"))).categories
let previews = JSON.parse(JSON.stringify(require("./previews.json")))

let cartImages = JSON.parse(localStorage.getItem("cartImages")) || []
let cartCountInit = cartImages.length

export default function App() {
  const [cartCount, setcartCount] = useState(cartCountInit)
  const [statefulCartImages, setStatefulCartImages] = useState(undefined)
  const [sessionId, setSessionId] = useState("")
  const [shakeCartIcon, setShakeCartIcon] = useState(false)
  const [userName, setUserName] = useState()
  const [userId, setUserId] = useState()
  const [userPicture, setUserPicture] = useState()
  const [userEmail, setUserEmail] = useState()
  const [userImages, setUserImages] = useState([])
  const [userFavorites, setUserFavorites] = useState(JSON.parse(localStorage.getItem("userFavorites")))
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const getSessionInfo = async() => {
      await fetch(`${siteRoute}/api/begin-session/${localStorage.getItem("sessionId")}`, {
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(res => {
        return res.json()
      })
      .then(({ session }) => {
        setSessionId(session.id)
        localStorage.setItem("sessionId", session.id)
      })
    }

    const getUserInfo = async() => {
      if (!localStorage.getItem("userId")) return
      await fetch(`${siteRoute}/api/myUser/${localStorage.getItem("userId")}`, {
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(res => {
        return res.json()
      })
      .then(({ user }) => {
        setLoggedIn(true)
        setUserEmail(user.email)
        setUserId(user.id)
        localStorage.setItem("userId", user.id)
        setUserName(user.userName)
        setUserPicture(user.picture)
        setUserImages(JSON.parse(user.images))
        setUserImages(JSON.parse(user.favorites))
        localStorage.setItem("userImages", JSON.stringify(JSON.parse(user.images)))
        localStorage.setItem("userFavorites", JSON.stringify(JSON.parse(user.favorites)))
        localStorage.setItem("profilePicture", user.picture)
      })
    }

    getUserInfo()
    getSessionInfo()

    setStatefulCartImages(cartImages)

  }, [sessionId])

      function objectsAreEqual(object1, object2) {
        if (!object1 || !object2) return false
        const keys1 = Object.keys(object1)
        const keys2 = Object.keys(object2)
      
        if (keys1.length !== keys2.length) {
          return false
        }
      
        for (let key of keys1) {
          if (object1[key] !== object2[key]) {
            return false
          }
        }
      
        return true
      }

    const onAddToCart = (image) => {
      image.addedToCart = true
      cartImages.push(image)
      setStatefulCartImages(cartImages)
      setcartCount(cartCount + 1)
      setShakeCartIcon(true)
      localStorage.setItem("cartImages", JSON.stringify(statefulCartImages))
      if (loggedIn) setUserImages([...userImages, image])
      return image
    }


    const logUserIn = (id, name, email, picture) => {
      setLoggedIn(true)
      setUserEmail(email)
      setUserName(name)
      setUserId(id)
      setUserPicture(picture)
      localStorage.setItem("userId", id)
      localStorage.setItem("profilePicture", picture)
      axios.post(`${siteRoute}/api/user`, {
        id,
        userName: name,
        email,
        picture
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
    }

    return (
      <Router>
        <Layout profilePicture={userPicture} logUserIn={logUserIn} isLoggedIn={loggedIn} setIsLoggedIn={setLoggedIn} shakeCartIcon={shakeCartIcon} setShakeCartIcon={setShakeCartIcon} cartCount={cartCount}>
            <Routes>
              <Route exact path="/" element={<Home categories={categories} />} />
              <Route path="/:category_name/:sub_category_name" element={<AlbumList categories={categories} />} />
              <Route path="/:category_name" element={<AlbumList categories={categories} />} />
              <Route path="/:category_name/album/:album_name" element={<Album categories={categories} previewsStruct={previews} onAddToCart={onAddToCart} cartImages={statefulCartImages} onAddPreviewSrc={(image, previewSrc) => {
                  const cartImageToFind = cartImages.find(img => objectsAreEqual(img, image))
                  if (!cartImageToFind) return
                  cartImageToFind.previewSrc = previewSrc
                  setStatefulCartImages(cartImages)
              }} />} />
              <Route path="/:category_name/:sub_category_name/:album_name" element={<Album categories={categories} previewsStruct={previews} onAddToCart={onAddToCart} cartImages={statefulCartImages} onAddPreviewSrc={(image, previewSrc) => {
                  const cartImageToFind = cartImages.find(img => objectsAreEqual(img, image))
                  if (!cartImageToFind) return
                  cartImageToFind.previewSrc = previewSrc
                  setStatefulCartImages(cartImages)
              }} />} />
              <Route path="/carrello" element={<Cart categories={categories} cartItems={statefulCartImages} sessionId={sessionId} onRemoveItem={(item) => {
                  item.addedToCart = false
                  cartImages.splice(cartImages.indexOf(item), 1)
                  setcartCount(cartCount - 1)
                  setStatefulCartImages(cartImages)
                  localStorage.setItem("cartImages", JSON.stringify(statefulCartImages))
                  return statefulCartImages
              }} />} />
              <Route path="/contatti" element={<Contact sessionId={sessionId} />} />
              {/* <Route path="/news" element={<News />} /> */}
              <Route path="/chi-siamo" element={<About />} />
              {/* <Route path="/news/:post_name" element={<News />} /> */}
              <Route path="/ricerca" element={<SearchPage categories={categories} previewsStruct={previews} onAddImageToCart={onAddToCart} />} />
              <Route path="/success" element={<Success isLoggedIn={loggedIn} logUserIn={logUserIn} onSetSessionId={(id) => setSessionId(id)} />} />
              <Route path="/:category_name/album/:album_name/:image_name" element={<PhotoPage logUserIn={logUserIn} setUserFavorites={setUserFavorites} userFavoritesState={userFavorites} isLoggedIn={loggedIn} categories={categories} onAddToCart={onAddToCart} previewsStruct={previews} />} />
              <Route path="/9e595881" element={<Navigate to={formatURL("/Danza/album/Mode Modalità Danza I 4 Elementi")} />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/profilo" element={<Profile userFavoritesState={userFavorites} boughtImages={userImages} userName={userName} email={userEmail} isLoggedIn={loggedIn} profilePicture={userPicture} logUserIn={logUserIn} setIsLoggedIn={setLoggedIn} />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Layout>
      </Router>
    )
}