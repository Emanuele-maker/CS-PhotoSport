import { useState, useEffect } from "react"
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
import PhotoPage from "./components/pages/PhotoPage/PhotoPage"
import About from "./components/pages/About/About"

const categories = [
  {
    title: "9e595881",
    actualTitle: "DANZA - I 4 Elementi",
    cover: `${previewsRoute}/9e595881/Backstage/IMG_9564.jpg`,
    isPrivate: true,
    albums: [
      {
        title: "Backstage",
        cover: `${previewsRoute}/9e595881/Backstage/IMG_9564.jpg`
      },
      {
        title: "Fuoco Modulo",
        cover: `${previewsRoute}/9e595881/Fuoco Modulo/IMG_9616.jpg`
      },
      {
        title: "Fuoco Corso Moderno Grandi",
        cover: `${previewsRoute}/9e595881/Fuoco Corso Moderno Grandi/IMG_9752.jpg`
      },
      {
        title: "Fuoco Corso Open Mamme",
        cover: `${previewsRoute}/9e595881/Fuoco Corso Open Mamme/IMG_9801.jpg`
      },
      {
        title: "Fuoco Corso Moderno Piccole",
        cover: `${previewsRoute}/9e595881/Fuoco Corso Moderno Piccole/IMG_9987.jpg`
      },
      {
        title: "Fuoco Corso Moderno Avanzato",
        cover: `${previewsRoute}/9e595881/Fuoco Corso Moderno Avanzato/IMG_0306.jpg`
      },
      {
        title: "Fuoco Corso Moderno Juniores",
        cover: `${previewsRoute}/9e595881/Fuoco Corso Moderno Juniores/IMG_0435.jpg`
      },
      {
        title: "Fuoco Hip Hop",
        cover: `${previewsRoute}/9e595881/Fuoco Hip Hop/IMG_0450.jpg`
      },
      {
        title: "Aria Classico Avanzato",
        cover: `${previewsRoute}/9e595881/Aria Classico Avanzato/IMG_0630.jpg`
      },
      {
        title: "Aria Corsi I e II Regolare",
        cover: `${previewsRoute}/9e595881/Aria Corsi I e II Regolare/IMG_0776.jpg`
      },
      {
        title: "Aria Hip Hop",
        cover: `${previewsRoute}/9e595881/Aria Hip Hop/IMG_0879.jpg`
      },
      {
        title: "Aria Corso Aspiranti",
        cover: `${previewsRoute}/9e595881/Aria Corso Aspiranti/IMG_0957.jpg`
      },
      {
        title: "Aria Moderno Intermedio",
        cover: `${previewsRoute}/9e595881/Aria Moderno Intermedio/IMG_1022.jpg`
      },
      {
        title: "Acqua Modulo",
        cover: `${previewsRoute}/9e595881/Acqua Modulo/IMG_1125.jpg`
      },
      {
        title: "Acqua Moderno Juniores e Intermedio",
        cover: `${previewsRoute}/9e595881/Acqua Moderno Juniores e Intermedio/IMG_1248.jpg`
      },
      {
        title: "Acqua Moderno Piccole",
        cover: `${previewsRoute}/9e595881/Acqua Moderno Piccole/IMG_1478.jpg`
      },
      {
        title: "Acqua Moderno Juniores",
        cover: `${previewsRoute}/9e595881/Acqua Moderno Juniores/IMG_1550.jpg`
      },
      {
        title: "Acqua Classico Avanzato",
        cover: `${previewsRoute}/9e595881/Acqua Classico Avanzato/IMG_1674.jpg`
      },
      {
        title: "Acqua Hip Hop Principianti",
        cover: `${previewsRoute}/9e595881/Acqua Hip Hop Principianti/IMG_1795.jpg`
      },
      {
        title: "Acqua Aspiranti",
        cover: `${previewsRoute}/9e595881/Acqua Aspiranti/IMG_1941.jpg`
      },
      {
        title: "Terra Corsi I e II Regolare",
        cover: `${previewsRoute}/9e595881/Terra Corsi I e II Regolare/IMG_2055.jpg`
      },
      {
        title: "Terra Hip Hop Baby",
        cover: `${previewsRoute}/9e595881/Terra Hip Hop Baby/IMG_2205.jpg`
      },
      {
        title: "Terra Moderno Avanzato",
        cover: `${previewsRoute}/9e595881/Terra Moderno Avanzato/IMG_2407.jpg`
      },
      {
        title: "Terra Moderno Intermedio",
        cover: `${previewsRoute}/9e595881/Terra Moderno Intermedio/IMG_2460.jpg`
      },
      {
        title: "Terra Martina Guizzo",
        cover: `${previewsRoute}/9e595881/Terra Martina Guizzo/IMG_2568.jpg`
      },
      {
        title: "Terra Corsi Moderno",
        cover: `${previewsRoute}/9e595881/Terra Corsi Moderno/IMG_2664.jpg`
      },
      {
        title: "Saluti Finali",
        cover: `${previewsRoute}/9e595881/Saluti Finali/IMG_2945.jpg`
      }
    ]
  },
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
        searchType: "number"
      },
      {
        title: "Vivicittà 2ª parte",
        cover: `${previewsRoute}/Running/Vivicittà 2ª parte/84 0000.jpg`,
        isFree: true,
        useSearch: true,
        searchPlaceholder: "Inserisci il pettorale del corridore",
        searchType: "number"
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
        title: "Bomber Waterpolo",
        cover: `${previewsRoute}/Pallanuoto/Bomber Waterpolo/IMG_8086.jpg`,
        isFree: true
      },
      {
        title: "Zero9 vs CN Latina 11.6.2022",
        cover: `${previewsRoute}/Pallanuoto/Zero9 vs CN Latina 11.6.2022/IMG_7414.jpg`,
      },
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
        title: "Fogliano 21 Maggio 2022",
        cover: `${previewsRoute}/Kite, Windsurf & Windfoil/Fogliano 21 Maggio 2022/IMG_5146.jpg`,
      },
      {
        title: "Fogliano 20 Maggio 2022",
        cover: `${previewsRoute}/Kite, Windsurf & Windfoil/Fogliano 20 Maggio 2022/IMG_4154.jpg`,
      },
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
    cover: `${previewsRoute}/Beachvolley/Beach World Champs Rome/IMG_8131.jpg`,
    albums: [
      {
        title: "Beach World Champs Rome",
        cover: `${previewsRoute}/Beachvolley/Beach World Champs Rome/IMG_8131.jpg`,
        isFree: true
      },
      {
        title: "Torneo Promozionale Finale Femminile",
        cover: `${previewsRoute}/Beachvolley/Torneo Promozionale Finale Femminile/IMG_8773.jpg`,
        isFree: true
      },
      {
        title: "FIPAV 27.3.2022",
        cover: require("./cover/Cover FIPAV 27.3.2022.jpg"),
        useSearch: true,
        searchPlaceholder: "Inserisci il cognome del giocatore",
        searchType: "text"
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

let previews = JSON.parse(JSON.stringify(require("./previews.json")))

let cartImages = []

document.cookie += "; SameSite=None; Secure"

export default function App() {
  const [cartCount, setcartCount] = useState(0)
  const [statefulCartImages, setStatefulCartImages] = useState(undefined)
  const [sessionId, setSessionId] = useState("")
  const [shakeCartIcon, setShakeCartIcon] = useState(false)

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
      return image
    }

    return (
      <Router>
        <Layout shakeCartIcon={shakeCartIcon} setShakeCartIcon={setShakeCartIcon} cartCount={cartCount}>
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
              <Route path="/carrello" element={<Cart cartItems={statefulCartImages} sessionId={sessionId} onRemoveItem={(item) => {
                  item.addedToCart = false
                  cartImages.splice(cartImages.indexOf(item), 1)
                  setcartCount(cartCount - 1)
                  setStatefulCartImages(cartImages)
                  return statefulCartImages
              }} />} />
              <Route path="/contatti" element={<Contact sessionId={sessionId} />} />
              <Route path="/news" element={<News />} />
              <Route path="/chi-siamo" element={<About />} />
              <Route path="/news/:post_name" element={<News />} />
              <Route path="/ricerca" element={<SearchPage categories={categories} previewsStruct={previews} onAddImageToCart={onAddToCart} />} />
              <Route path="/success" element={<Success onSetSessionId={(id) => setSessionId(id)} />} />
              <Route path="/:category_name/album/:album_name/:image_name" element={<PhotoPage categories={categories} onAddToCart={onAddToCart} previewsStruct={previews} />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Layout>
      </Router>
    )
}