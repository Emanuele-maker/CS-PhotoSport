const siteRoute = process.env.NODE_ENV === "production" ? "https://csphotosport.com" : "http://localhost:5000"
const previewsRoute = process.env.NODE_ENV === "production" ? `${siteRoute}/client/build/previews` : `${siteRoute}/previews`
const imagesRoute = process.env.NODE_ENV === "production" ? `${siteRoute}/client/build/img` : `${siteRoute}/img`
const buildRoute = process.env.NODE_ENV === "production" ? `http://localhost:3000/client/build` : "https://csphotosport.com/client/build"

export {
    siteRoute,
    previewsRoute,
    imagesRoute,
    buildRoute
}