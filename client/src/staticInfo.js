const siteRoute = process.env.NODE_ENV === "production" ? "https://csphotosport.com" : "https://localhost:5000"
const previewsRoute = process.env.NODE_ENV === "production" ? `${siteRoute}/client/build/previews` : `${siteRoute}/previews`
const imagesRoute = process.env.NODE_ENV === "production" ? `${siteRoute}/client/build/img` : `${siteRoute}/img`

export {
    siteRoute,
    previewsRoute,
    imagesRoute
}