import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/opacity.css"

export default function LazyImage ({ src, alt }) {
  return (
    <LazyLoadImage effect="opacity" src={src} alt={alt} />
  )
}