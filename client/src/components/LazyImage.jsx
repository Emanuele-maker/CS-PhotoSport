import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"

export default function LazyImage ({ src, alt, ...props }) {
  return (
    <LazyLoadImage effect="blur" src={src} alt={alt} onDragStart={() => {}} {...props} />
  )
}