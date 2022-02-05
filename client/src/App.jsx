import { useState, useEffect } from "react"
import axios from "axios"
import { Route, BrowserRouter as Router } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import Album from "./components/pages/Album/Album"
import Cart from "./components/pages/Cart/Cart"
import Home from "./components/pages/Home/Home"
import "./style.scss"

let albums = [
  {
    id: 1,
    title: "Pallanuoto",
    description: "Scatti di pallanuoto a livello giovanile e di Serie A2",
    cover: null
  },
  {
    id: 2,
    title: "Monumenti e Paesaggi",
    description: "Scatti in giro per l'Italia e per il mondo",
    cover: null
  },
  {
    id: 3,
    title: "Famiglia",
    description: "Gli scatti della mia famiglia",
    cover: null
  },
  {
    id: 4,
    title: "Album Prova",
    description: "Descrizione",
    cover: null
  },
  {
    id: 5,
    title: "Album Prova 2",
    description: "Descrizione 2",
    cover: null
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

    const getLatestSessionInfo = async () => {
      await axios.get(`/begin-session/${sessionId}`, {
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(res => {
        setSessionId(res.data.session.id)
        localStorage.setItem("sessionId", res.data.session.id)
        if (res.data.session.boughtImages) setBoughtImages(res.data.session.boughtImages)
      })
    }

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

    if (sessionId) {
      getLatestSessionInfo()
    } else {
      getFirstSessionInfo()
    }

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
      <Route exact path="/">
        <Layout cartCount={cartCount}>
          <Home albums={albums} />
        </Layout>
      </Route>
      <Route path="/album/:album_name">
        <Layout cartCount={cartCount}>
          <Album onAddToCart={(image) => {
            cartImages.push(image)
            setStatefulCartImages(cartImages)
            setcartCount(cartCount + 1)
          }} cartImages={statefulCartImages} onAddPreviewSrc={(image, previewSrc) => {
            const cartImageToFind = cartImages.find(img => objectsAreEqual(img, image))
            if (!cartImageToFind) return
            cartImageToFind.previewSrc = previewSrc
            setStatefulCartImages(cartImages)
          }} />
        </Layout>
      </Route>
      <Route path="/cart">
        <Layout cartCount={cartCount}>
          <Cart cartItems={statefulCartImages} sessionId={sessionId} onRemoveItem={(item) => {
            cartImages.splice(cartImages.indexOf(item), 1)
            setcartCount(cartCount - 1)
            setStatefulCartImages(cartImages)
            return statefulCartImages
          }} />
        </Layout>
      </Route>
    </Router>
  )
}