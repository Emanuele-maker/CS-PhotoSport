import { useState, useEffect } from "react"
import axios from "axios"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import Album from "./components/pages/Album/Album"
import Cart from "./components/pages/Cart/Cart"
import Home from "./components/pages/Home/Home"
import Success from "./components/pages/Success/Success"
import "./style.scss"
import NotFound from "./components/pages/404/404"
import AlbumList from "./components/AlbumList/AlbumList"
import Contact from "./components/pages/Contact/Contact"

const categories = [
  {
    title: "Pallanuoto",
    cover: require("./previews/Pallanuoto/Centro Nuoto Latina vs Aquademia Velletri/51878695352_dc43b59fa1_c.jpg"),
    albums: [  
      {
        title: "Anzio Waterpolis vs Centro Nuoto Latina",
        cover: require("./previews/Pallanuoto/Anzio Waterpolis vs Centro Nuoto Latina/51894535542_5c5ac2cc52_c.jpg")
      },
      {
        title: "Centro Nuoto Latina vs Aquademia Velletri",
        cover: require("./previews/Pallanuoto/Centro Nuoto Latina vs Aquademia Velletri/51887613288_e614d363e9_c.jpg")
      }
    ]
  }
]

let cartImages = []
let boughtImagesInit = []

export default function App() {
  const [cartCount, setcartCount] = useState(0)
  const [statefulCartImages, setStatefulCartImages] = useState(undefined)
  const [boughtImages, setBoughtImages] = useState(undefined)
  const [sessionId, setSessionId] = useState("")

  useEffect(() => {
    const getFirstSessionInfo = async() => {
      await axios.get("http://csphotosport.com/api/begin-session", {
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(res => {
        setSessionId(res.data.session.id)
        localStorage.setItem("sessionId", res.data.session.id)
      })
    }

    if (!localStorage.getItem("sessionId")) getFirstSessionInfo()
    else setSessionId(localStorage.getItem("sessionId"))

    setStatefulCartImages(cartImages)
    setBoughtImages(boughtImagesInit)
  }, [boughtImages, sessionId])

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

    return (
      <Router>
        <Layout cartCount={cartCount}>
            <Routes>
              <Route exact path="/" element={<Home categories={categories} />} />
              <Route path="/:category_name" element={<AlbumList categories={categories} />} />
              <Route path="/:category_name/:album_name" element={<Album onAddToCart={(image) => {
                  image.addedToCart = true
                  cartImages.push(image)
                  setStatefulCartImages(cartImages)
                  setcartCount(cartCount + 1)
                  return image
              }} cartImages={statefulCartImages} onAddPreviewSrc={(image, previewSrc) => {
                  const cartImageToFind = cartImages.find(img => objectsAreEqual(img, image))
                  if (!cartImageToFind) return
                  cartImageToFind.previewSrc = previewSrc
                  setStatefulCartImages(cartImages)
              }} />} />
              <Route path="/carrello" element={<Cart cartItems={statefulCartImages} sessionId={sessionId} onRemoveItem={(item) => {
                  item.addedToCart = false
                  cartImages.splice(cartImages.indexOf(item), 1)
                  setcartCount(cartCount - 1)
                  setStatefulCartImages(cartImages)
                  return statefulCartImages
              }} />} />
              <Route path="/contatti" element={<Contact sessionId={sessionId} />} />
              <Route path="/success" element={<Success onSetSessionId={(id) => setSessionId(id)} onSetBoughtImages={(boughtImages) => setBoughtImages(boughtImages)} onResetBoughtImages={() => setBoughtImages([])} />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Layout>
      </Router>
    )
}