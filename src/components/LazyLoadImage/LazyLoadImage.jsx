import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import UploadImage from "../../assets/announcement-placeholder.png";
import "react-lazy-load-image-component/src/effects/blur.css";

function PlaceholderImage({ src, alt, styles, imageFor }) {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      placeholderSrc={UploadImage}
      width={styles.width}
      height={styles.height}
      threshold={100}
      draggable={false}
      effect="blur"
      style={{
        objectFit: "cover",
        ...styles,
      }}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = UploadImage;
      }}
    />
  );
}

export default PlaceholderImage;
