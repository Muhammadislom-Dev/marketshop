import React, { useState } from "react";
import "./Announcement.css";
import edit from "../../../../assets/edit.svg";
import cricle from "../../../../assets/cricle.svg";
import { API, getProfileProductData, productActivePost } from "../../../../api";
import { useMutation, useQuery } from "react-query";
import { Box, CircularProgress } from "@mui/material";
import DeleteProduct from "../../../../components/DeleteProduct/DeleteProduct";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function Announcement({ setValue, setEditId }) {
  const { data, isLoading, refetch } = useQuery(
    "profileData",
    getProfileProductData
  );

  const [active, setActive] = useState(false);
  const [newId, setNewId] = useState("");
  const { mutate: activeMutate } = useMutation(
    ["activeParams", active, newId],
    () => productActivePost(active, newId)
  );

  const handleToogle = (e) => {
    setActive(e.target.value);
    activeMutate();
  };

  const { t } = useTranslation();
  const { mutate: imageMutate } = useMutation(async (payload) => {
    return await API.deleteProductData(payload)
      .then((res) => {
        toast.success("Mahsulot muvaffaqiyatli o'chirildi");
        refetch();
      })
      .catch((err) => {
        if (err.message == "Request failed with status code 403") {
          toast.error(
            "Mahsulot o'chirish uchun admin tomonidan ruxsat olishingiz kerak"
          );
        }
      });
  });

  const handleClickEdit = () => {
    setValue(3);
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={"80vh"}>
        <CircularProgress
          color="success"
          style={{ width: "100px", height: "100px" }}
        />
      </Box>
    );
  }

  return (
    <div className="announcement">
      <div className="container">
        <div className="announcement-list">
          {data?.content?.map((evt, index) => (
            <div key={evt.id} className="announcement-card">
              <div className="card__left">
                {evt.photos ? (
                  <LazyLoadImage
                    src={evt?.photos[0]?.filePath}
                    placeholderSrc={evt?.photos[0]?.filePath}
                    alt="Image"
                    draggable={false}
                    effect="blur"
                    className="announcement-picture"
                    onError={(e) => {
                      e.target.onerror = null;
                    }}
                  />
                ) : null}
              </div>
              <div className="card__right">
                <h2 className="card__right_title">{evt.name}</h2>
                <div className="card__right_subTitle">
                  {evt?.region?.name}, {evt?.district?.name} {t("hello3")}
                </div>
                <div className="card__right_blok">
                  {evt.quality === "NEW" ? (
                    <span className="blok__old card__new">{t("hello4")}</span>
                  ) : evt.quality === "OLD" ? (
                    <span className="blok__old card__medium">
                      {t("hello6")}
                    </span>
                  ) : evt.quality === "AVERAGE" ? (
                    <span className="blok__old">{t("hello5")}</span>
                  ) : (
                    ""
                  )}
                  <button
                    value={evt.id}
                    onClick={(e) => {
                      handleClickEdit();
                      setEditId(e.target.value);
                    }}
                    className="blok__edit">
                    <span>
                      <img src={edit} alt="edit" />
                    </span>
                    {t("hello52")}
                  </button>
                  <DeleteProduct mutate={imageMutate} data={evt.id} />
                </div>
                <label className="switch">
                  {evt.active === true ? (
                    <input
                      type="checkbox"
                      value={false}
                      defaultChecked
                      onChange={(e) => {
                        handleToogle(e);
                        setNewId(evt?.id);
                      }}
                    />
                  ) : (
                    <input
                      type="checkbox"
                      value={true}
                      onChange={(e) => {
                        handleToogle(e);
                        setNewId(evt?.id);
                      }}
                    />
                  )}
                  <span className="sliderr round"></span>
                </label>
              </div>

              <img src={cricle} alt="cricle" className="card__cricles" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Announcement;
