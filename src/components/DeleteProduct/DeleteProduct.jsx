import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import backet from "../../assets/backet.svg";
import "./DeleteProduct.css";
import { DeleteBanner } from "../../assets/img";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function DeleteProduct({ mutate, data }) {
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
            <h3 className="delete-name">E’lonni o‘chirish</h3>
            <p className="delete-text">Qilgan ehsoningiz qabul bo‘lsin</p>
            <button onClick={handleDelete} className="delete-submit">
              O’chirish
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default DeleteProduct;
