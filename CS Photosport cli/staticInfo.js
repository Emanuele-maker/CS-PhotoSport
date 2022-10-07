import dotenv from "dotenv"

dotenv.config()

const siteRoute = process.env.NODE_ENV === "production" ? "https://csphotosport.com" : "http://localhost:3000"
const previewsRoute = process.env.NODE_ENV === "production" ? `${siteRoute}/client/build/previews` : `${siteRoute}/previews`
const imagesRoute = process.env.NODE_ENV === "production" ? `${siteRoute}/client/build/img` : `${siteRoute}/img`
const coverRoute = process.env.NODE_ENV === "production" ? `${siteRoute}/client/build/cover` : `${siteRoute}/cover`
const buildRoute = process.env.NODE_ENV === "production" ? "https://csphotosport.com/client/build" : `http://localhost:3000/client/build`

const routes = {
    siteRoute,
    previewsRoute,
    imagesRoute,
    coverRoute,
    buildRoute
}

export default routes