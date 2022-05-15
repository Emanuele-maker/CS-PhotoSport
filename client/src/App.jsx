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
import { siteRoute, imagesRoute, previewsRoute } from "./staticInfo"
import SearchPage from "./components/pages/SearchPage/SearchPage"
import News from "./components/pages/News/News"
// import { initializeApp } from "firebase/app"
// import { getAnalytics } from "firebase/analytics"

const categories = [
  {
    title: "Triathlon",
    cover: `${previewsRoute}/Triathlon/The Green Race Nuoto/IMG_9955.jpg`,
    albums: [
      {
        title: "The Green Race Corsa",
        cover: `${previewsRoute}/Triathlon/The Green Race Corsa/IMG_1121.jpg`
      },
      {
        title: "The Green Race Nuoto",
        cover: `${previewsRoute}/Triathlon/The Green Race Nuoto/IMG_0048.jpg`
      },
      {
        title: "The Green Race Ciclismo",
        cover: `${previewsRoute}/Triathlon/The Green Race Ciclismo/IMG_0723.jpg`
      }
    ]
  },
  {
    title: "Running",
    cover: `${previewsRoute}/Running/Vivicittà Latina 2022/1 2 6.jpg`,
    albums: [
      {
        title: "Mezza Latina 2022",
        cover: `${previewsRoute}/Running/Mezza Latina 2022/IMG_2331.jpg`
      },
      {
        title: "Vivicittà Latina 2022",
        cover: `${previewsRoute}/Running/Vivicittà Latina 2022/1 2 6.jpg`,
        isFree: true,
        useSearch: true,
        searchPlaceholder: "Inserisci il pettorale del corridore",
      },
      {
        title: "Vivicittà 2ª parte",
        cover: `${previewsRoute}/Running/Vivicittà 2ª parte/84 0000.jpg`,
        isFree: true,
        useSearch: true,
        searchPlaceholder: "Inserisci il pettorale del corridore",
      }
    ]
  },
  {
    title: "Eventi",
    cover: `${previewsRoute}/Eventi/X Summer 10.4.2022/IMG_3575.jpg`,
    albums: [
      {
        title: "PRE XSummer",
        cover: `${previewsRoute}/Eventi/PRE XSummer/IMG_8568.jpg`,
        isFree: true
      },
      {
        title: "X Summer 10.4.2022",
        cover: `${previewsRoute}/Eventi/X Summer 10.4.2022/IMG_8476.jpg`,
        isFree: true
      },
      {
        title: "X Summer 2ª parte",
        cover: `${previewsRoute}/Eventi/X Summer 2ª parte/IMG_8620.jpg`,
        isFree: true
      }
    ]
  },
  {
    title: "Pallanuoto",
    cover: `${imagesRoute}/Pallanuoto/CN Latina vs Muri Antichi/IMG_1716.jpg`,
    albums: [
      {
        title: "CN Latina vs Aquademia Velletri",
        cover: `${previewsRoute}/Pallanuoto/CN Latina vs Aquademia Velletri/IMG_9617.jpg`,
        isFree: true
      },
      {
        title: "Castelli Romani vs CN Latina",
        cover: `${previewsRoute}/Pallanuoto/Castelli Romani vs CN Latina/IMG_9386.jpg`,
        isFree: true
      },
      {
        title: "F&D H2O vs Brizz Nuoto",
        cover: `${previewsRoute}/Pallanuoto/F&D H2O vs Brizz Nuoto/IMG_9497.jpg`,
        isFree: true
      },
      {
        title: "CN Latina vs Olympic Roma",
        cover: `${previewsRoute}/Pallanuoto/CN Latina vs Olympic Roma/IMG_2722.jpg`,
        isFree: true,
        useNews: true
      },
      {
        title: "Anzio Waterpolis vs CN Latina",
        cover: `${previewsRoute}/Pallanuoto/Anzio Waterpolis vs CN Latina/IMG_2552.jpg`,
        isFree: true
      },
      {
        title: "CN Latina vs Muri Antichi",
        cover: `${imagesRoute}/Pallanuoto/CN Latina vs Muri Antichi/IMG_1258.jpg`
      },
      {
        title: "Open Waterpolo 2019",
        cover: require("./cover/Cover open waterpolo.jpg")
      },
      {
        title: "CN Latina vs Villa York",
        cover: require("./cover/Cover CN Latina vs Villa York.jpg")
      }
    ]
  },
  {
    title: "Kite, Windsurf & Windfoil",
    cover: `${imagesRoute}/Kite, Windsurf & Windfoil/Fogliano 2 Febbraio 2022/IMG_6924.jpg`,
    albums: [
      {
        title: "Fogliano 20 Marzo 2022",
        cover: require("./cover/Cover Fogliano 20 Marzo 2022.jpg")
      },
      {
        title: "Fogliano 12 marzo 2022",
        cover: require("./cover/51935679994_4080fb8de3_c.jpg")
      },
      {
        title: "Fogliano 2 Febbraio 2022",
        cover: `${imagesRoute}/Kite, Windsurf & Windfoil/Fogliano 2 Febbraio 2022/IMG_6955.jpg`
      },
      {
        title: "Fogliano 26 Gennaio 2022",
        cover: `${imagesRoute}/Kite, Windsurf & Windfoil/Fogliano 26 Gennaio 2022/IMG_6658.jpg` 
      }
    ]
  },
  {
    title: "Beachvolley",
    cover: require("./cover/Cover beachvolley.jpg"),
    albums: [
      {
        title: "FIPAV 27.3.2022",
        cover: require("./cover/Cover FIPAV 27.3.2022.jpg"),
        useSearch: true,
        searchPlaceholder: "Inserisci il cognome del giocatore",
      },
      {
        title: "Torneo Opes 2021",
        cover: require("./cover/Cover torneo opes.jpg")
      },
      {
        title: "Rome Beach Finals 2019",
        cover: `${previewsRoute}/Beachvolley/Rome Beach Finals 2019/IMG_8952.jpg`,
        isFree: true
      }
    ]
  }
]

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyD3t6-qDFoiMOYWU7QxlYWfYWPfDX_-qCc",
//   authDomain: "csphotosport-17cb4.firebaseapp.com",
//   projectId: "csphotosport-17cb4",
//   storageBucket: "csphotosport-17cb4.appspot.com",
//   messagingSenderId: "503941906380",
//   appId: "1:503941906380:web:86798537544f0e8c152769",
//   measurementId: "G-E1E7J2L996"
// }

// // Initialize Firebase
// const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)

let previews = JSON.parse(JSON.stringify(require("./previews.json")))

let cartImages = []

export default function App() {
  const [cartCount, setcartCount] = useState(0)
  const [statefulCartImages, setStatefulCartImages] = useState(undefined)
  const [sessionId, setSessionId] = useState("")

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

    getSessionInfo()

    setStatefulCartImages(cartImages)

    const img = document.querySelectorAll("img")
    img.forEach(image => image.ondragstart = () => { return false })

  }, [])

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
              <Route path="/:category_name/:sub_category_name" element={<AlbumList categories={categories} />} />
              <Route path="/:category_name" element={<AlbumList categories={categories} />} />
              <Route path="/:category_name/album/:album_name" element={<Album categories={categories} previewsStruct={previews} onAddToCart={(image) => {
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
              <Route path="/:category_name/:sub_category_name/:album_name" element={<Album categories={categories} previewsStruct={previews} onAddToCart={(image) => {
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
              <Route path="/news" element={<News />} />
              <Route path="/news/:post_name" element={<News />} />
              <Route path="/ricerca" element={<SearchPage categories={categories} />} />
              <Route path="/success" element={<Success onSetSessionId={(id) => setSessionId(id)} />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Layout>
      </Router>
    )
}