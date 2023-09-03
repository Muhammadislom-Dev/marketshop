import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  CloseButton,
  CallButton,
  DeveloperIcon,
} from "../../../../assets/icon";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LoginModal from "../../Modal/Modal";

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

function CallModal({ getPhone }) {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const accessToken = localStorage.getItem("accessToken");
  const [count, setCount] = useState(3);
  const handleOpen = () => {
    setOpen(true);
    setCount(count - 1 < 0 ? 0 : count - 1);
  };
  const handleClose = () => setOpen(false);

  console.log(getPhone);

  return (
    <div className="delete">
      <button onClick={handleOpen} className="call__link">
        {t("hello31")}
      </button>
      <Modal
        className="delete-modal-product"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        {accessToken ? (
          getPhone?.phoneNumber === null ? (
            <Box sx={style}>
              <div className="delete-list">
                <img src={CloseButton} alt="" />
                <h3 className="delete-name">{t("hello23")}</h3>
                <p className="delete-text">{t("hello24")}</p>
                <button onClick={handleClose} className="call__link">
                  {t("hello25")}
                </button>
              </div>
            </Box>
          ) : (
            <Box sx={style}>
              <div className="delete-list">
                <img src={CallButton} alt="" />
                <h3 className="delete-name">{getPhone?.phoneNumber}</h3>
                <p className="delete-text">
                  Sizda kunlik {getPhone?.dailyLimitCount} ta qo’ng’iroqdan{" "}
                  {getPhone?.lastDailyLimit} ta qoldi
                </p>
                <a
                  href={`tel:+${getPhone?.phoneNumber}`}
                  className="call__link">
                  {t("hello27")}
                </a>
              </div>
            </Box>
          )
        ) : (
          <Box sx={style}>
            <div className="delete-list">
              <img src={DeveloperIcon} alt="" />
              <h3 className="delete-name">{t("hello28")}</h3>
              <p className="delete-text">{t("hello29")}</p>
              <LoginModal />
            </div>
          </Box>
        )}
      </Modal>
    </div>
  );
}

export default CallModal;
