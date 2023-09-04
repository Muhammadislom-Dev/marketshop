import { useState } from "react";
import "./Setup.css";
import defaultImg from "../../../../assets/img/default-profile-img.png";
import { FaCamera } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useMutation, useQuery } from "react-query";
import { API, editUserPost, getSetupData, uploadImage } from "../../../../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { t } from "i18next";
import PhoneInput from "react-phone-number-input";

export default function Setup({ refetch, dataValue }) {
  const [data, setData] = useState(null);
  const [value, setValue] = useState();
  const [product, setProduct] = useState({
    language: null,
  });

  const navigate = useNavigate();

  const { mutate: imageMutate } = useMutation(async (payload) => {
    return await API.fileUpload(payload)
      .then((res) => {
        setProduct((prev) => ({
          ...prev,
          photoId: res.data.objectKoinot[0].id,
        }));
        toast.success("Rasim muvofaqiyatli yuklandi");
      })
      .catch((err) => {
        console.log(err);
        toast.danger("Rasim yuklanmadi qaytadan urinib ko'ring");
      });
  });

  const { mutate, isLoading } = useMutation((data) => editUserPost(data), {
    onSuccess: (data) => {
      refetch();
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(product);
  };

  function handleDeleteProfile() {
    localStorage.removeItem("accessToken");
    toast.success("Siz profilingizdan chiqdingiz!");
    navigate("/");
  }

  return (
    <div className="setup">
      <div className="setup-img">
        <h3>{t("hello75")}</h3>
        <label htmlFor="setup-profile-img" className="setup-img-upload">
          {data ? (
            <img src={!!data && URL?.createObjectURL(data)} alt="error" />
          ) : (
            <div className="setup-img-default">
              <img src={defaultImg} alt="error" />
              <FaCamera />
            </div>
          )}

          <input
            type="file"
            id="setup-profile-img"
            accept="image/*"
            onChange={(e) => {
              setData(e.target.files[0]);
              imageMutate({ key: e.target.files[0] });
            }}
          />
          <span>{t("hello76")}</span>
        </label>
      </div>
      <form className="product-create-form" onSubmit={handleSubmit}>
        <label className="product-create-label">
          <h4>First Name</h4>
          <input
            onChange={(e) =>
              setProduct((state) => ({
                ...state,
                firstName: e.target.value,
              }))
            }
            type="text"
            maxLength={500}
            min={3}
            required
          />
        </label>
        <label className="product-create-label">
          <h4>Last Name</h4>
          <input
            onChange={(e) =>
              setProduct((state) => ({
                ...state,
                lastName: e.target.value,
              }))
            }
            type="text"
            maxLength={500}
            min={3}
            required
          />
        </label>
        <label className="product-create-label">
          <h4>{t("hello45")}</h4>
          <PhoneInput
            value={value}
            onChange={setValue}
            international
            defaultCountry="UZ"
            limitMaxLength={14}
          />
        </label>

        <div className="setup-btn-wrapper">
          <button className="product-create-form-button" type="submit">
            {t("hello77")}
          </button>
          <button
            onClick={handleDeleteProfile}
            className="setup-logOut"
            type="button">
            <BiLogOut />
            <span>{t("hello78")}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
