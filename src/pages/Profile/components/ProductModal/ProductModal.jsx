import "./ProductModal.css";
import modalImg from "../../../../assets/img/product-modal-img.png";
import { useNavigate } from "react-router-dom";

export default function ProductModal() {
  const history = useNavigate();
  return (
    <div className="product-modal">
      <div className="product-modal-overlay"></div>
      <div className="product-modal-wrapper">
        <img src={modalImg} alt="error" />
        <h4>E’loningiz joylashtirildi</h4>
        <p>Qilgan ehsoningiz qabul bo‘lsin</p>
        <button onClick={() => history("/")}>Bosh sahifaga</button>
      </div>
    </div>
  );
}
