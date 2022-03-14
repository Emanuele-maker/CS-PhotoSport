import LazyLoad from "react-lazyload"

export default function LazyImage ({ src, alt }) {
  return (
    <LazyLoad>
      <img src={src} alt={alt}/>
    </LazyLoad>
  )
}