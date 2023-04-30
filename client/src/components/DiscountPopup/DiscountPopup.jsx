import "./DiscountPopup.scss"
import cameraGIF from "../../assets/camera.gif"
import { ImCross } from "react-icons/im"
import stackedPhotos4 from "../../assets/stacked-photo-4.svg"
import stackedPhotos10 from "../../assets/stacked-photo-10.svg"
import stackedPhotos30 from "../../assets/stacked-photo-30.svg"
import stackedPhotos50 from "../../assets/stacked-photo-50.svg"
import getPrice from "../../getTotalPrice"

const DiscountPopup = ({ setIsPopupVisible }) => {
  return (
    <>
        <div className="discount-popup">
          <section className="top">
              <div className="left"></div>
              <div className="center">
                  <img className="flashing-gif" src={cameraGIF} alt="" />
                  <h1>OFFERTA SPECIALE!</h1>
              </div>
              <ImCross size="2rem" color="#F0F0F0" onClick={() => setIsPopupVisible(false)} />
          </section>
          <main>
            <h2>Approfitta dei nuovi bundle!</h2>
            <ul>
              <li>
                <img src={stackedPhotos4} alt="stacked photos 4x" />
                <span>4 foto = {Math.round(getPrice(4) / 100)}</span>
              </li>
              <li>
                <img src={stackedPhotos10} alt="stacked photos 10x" />
                <span>10 foto = {Math.round(getPrice(10) / 100)}</span>
              </li>
              <li>
                <img src={stackedPhotos30} alt="stacked photos 30x" />
                <span>30 foto = {Math.round(getPrice(30) / 100)}</span>
              </li>
              <li>
                <img src={stackedPhotos50} alt="stacked photos 50x" />
                <span>50 foto = {Math.round(getPrice(50) / 100)}</span>
              </li>
            </ul>
            <h3>Questi sconti vengono applicati automaticamente</h3>
          </main>
        </div>
    </>
  )
}

export default DiscountPopup