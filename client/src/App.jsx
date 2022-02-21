import { useState, useEffect } from "react"
import axios from "axios"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import Album from "./components/pages/Album/Album"
import Cart from "./components/pages/Cart/Cart"
import Home from "./components/pages/Home/Home"
import Success from "./components/pages/Success/Success"
import "./style.scss"

const albums = [
  {
    title: "Pallanuoto",
    description: "Pallanuoto",
    cover: require("./img/Pallanuoto/IMG_1008-1.jpg")
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
    setSessionId(localStorage.getItem("sessionId"))

    const getFirstSessionInfo = async() => {
      await axios.get("/begin-session", {
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

    if (!sessionId) getFirstSessionInfo()

    setStatefulCartImages(cartImages)
    setBoughtImages(boughtImagesInit)
  }, [!boughtImages, !sessionId])

      function objectsAreEqual(object1, object2) {
        if (!object1 || !object2) return false
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);
      
        if (keys1.length !== keys2.length) {
          return false;
        }
      
        for (let key of keys1) {
          if (object1[key] !== object2[key]) {
            return false;
          }
        }
      
        return true;
      }

    return (
      <Router>
        <Layout cartCount={cartCount}>
            <Routes>
              <Route exact path="/" element={<Home albums={albums} />} />
              <Route path="/album/:album_name" element={<Album onAddToCart={(image) => {
                  cartImages.push(image)
                  setStatefulCartImages(cartImages)
                  setcartCount(cartCount + 1)
                }} cartImages={statefulCartImages} onAddPreviewSrc={(image, previewSrc) => {
                  const cartImageToFind = cartImages.find(img => objectsAreEqual(img, image))
                  if (!cartImageToFind) return
                  cartImageToFind.previewSrc = previewSrc
                  setStatefulCartImages(cartImages)
                }} />} />
              <Route path="/carrello" element={<Cart cartItems={statefulCartImages} sessionId={sessionId} onRemoveItem={(item) => {
                  cartImages.splice(cartImages.indexOf(item), 1)
                  setcartCount(cartCount - 1)
                  setStatefulCartImages(cartImages)
                  return statefulCartImages
              }} />} />
              <Route path="/success" element={<Success onSetSessionId={(id) => setSessionId(id)} onSetBoughtImages={(boughtImages) => setBoughtImages(boughtImages)} onResetBoughtImages={() => setBoughtImages([])} />} />
            </Routes>
          </Layout>
      </Router>
    )
}