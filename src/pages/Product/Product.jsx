import ProductHero from "../../components/ProductHero/ProductHero";
import "./Product.css";

export default function Product() {
  return (
    <div style={{ marginTop: "30px" }}>
      <div className="container">
        <ProductHero />
      </div>
    </div>
  );
}
