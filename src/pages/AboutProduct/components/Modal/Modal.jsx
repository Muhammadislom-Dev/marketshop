import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  CloseButton,
  CallButton,
  DeveloperIcon,
} from "../../../../assets/icon";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  width: 540,
  borderRadius: "15px",
};

function CallModal({ number }) {
  const [open, setOpen] = React.useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const [count, setCount] = useState(4);
  const handleOpen = () => {
    setOpen(true);
    setCount(count - 1 < 0 ? 0 : count - 1);
  };
  const handleClose = () => setOpen(false);

  return (
    <div className="delete">
      <button onClick={handleOpen} className="call__link">
        Qo’ng’iroq qilish
      </button>
      <Modal
        className="delete-modal-product"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        {accessToken ? (
          count === 0 ? (
            <Box sx={style}>
              <div className="delete-list">
                <img src={CloseButton} alt="" />
                <h3 className="delete-name">Kunlik limit tugadi</h3>
                <p className="delete-text">
                  Sizning kunlik limitingiz tugagan!
                </p>
                <button onClick={handleClose} className="call__link">
                  Yopish
                </button>
              </div>
            </Box>
          ) : (
            <Box sx={style}>
              <div className="delete-list">
                <img src={CallButton} alt="" />
                <h3 className="delete-name">{number}</h3>
                <p className="delete-text">
                  Sizda kunlik 3 ta qo’ng’iroqdan {count} ta qoldi
                </p>
                <a href={`tel:+${number}`} className="call__link">
                  Qo‘ng‘iroq qilish
                </a>
              </div>
            </Box>
          )
        ) : (
          <Box sx={style}>
            <div className="delete-list">
              <img src={DeveloperIcon} alt="" />
              <h3 className="delete-name">Ro‘yhatdan o‘tilmagan</h3>
              <p className="delete-text">
                Iltimos raqamni ko’rish va qo’ng’iroq qilish uchun saytdan
                ro’yhatdan o’tishingizni so’raymiz.
              </p>
              <Link to="/" className="call__link">
                Ro‘yhatdan o‘tish
              </Link>
            </div>
          </Box>
        )}
      </Modal>
    </div>
  );
}

export default CallModal;
