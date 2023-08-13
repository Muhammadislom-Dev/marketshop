import "./ProductModal.css";
import modalImg from "../../../../assets/img/product-modal-img.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ProductModal() {
  const history = useNavigate();
  const {t} = useTranslation()
  return (
    <div className="product-modal">
      <div className="product-modal-overlay"></div>
      <div className="product-modal-wrapper">
        <img src={modalImg} alt="error" />
        <h4>{t("hello65")}</h4>
        <p>{t("hello67")}</p>
        <button onClick={() => history("/")}>{t("hello68")}</button>
      </div>
    </div>
  );
}
