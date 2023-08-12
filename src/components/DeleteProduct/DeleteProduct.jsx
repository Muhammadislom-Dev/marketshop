import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import backet from "../../assets/backet.svg";
import "./DeleteProduct.css";
import { DeleteBanner } from "../../assets/img";
import { useTranslation } from "react-i18next";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "15px",
};

function DeleteProduct({ mutate, data }) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    mutate(data);
  };
  return (
    <div className="delete">
      <button className="delete-button" onClick={handleOpen}>
        {" "}
        <img src={backet} alt="backet" className="blok__backet" />
      </button>
      <Modal
        className="delete-modal-product"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="delete-list">
            <img src={DeleteBanner} alt="" className="delete-img" />
            <h3 className="delete-name">{t("hello7")}</h3>
            <p className="delete-text">{t("hello8")}</p>
            <button onClick={handleDelete} className="delete-submit">
              {t("hello9")}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default DeleteProduct;
