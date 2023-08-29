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
  const token = localStorage.getItem("tokenReview");
  const [data, setData] = useState(null);
  const [value, setValue] = useState();
  const [product, setProduct] = useState({
    photosId: "",
    sendAgain: true,
    codeToVerifyPhoneNumber: null,
    tokenToVerifyPhoneNumber: null,
  });
  const [profile, setProfile] = useState({
    photosId: null,
    firstname: null,
    lastname: null,
    sendAgain: true,
    tokenToVerifyPhoneNumber: token,
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

  const handleReview = (e) => {
    e.preventDefault();
    mutate(profile);
  };

  function handleDeleteProfile() {
    localStorage.removeItem("accessToken");
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
            // defaultValue={dataValue.objectKoinot.firstName}
            onChange={(e) =>
              setProduct((state) => ({
                ...state,
                firstname: e.target.value,
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
            // defaultValue={dataValue.objectKoinot.lastname}
            onChange={(e) =>
              setProduct((state) => ({
                ...state,
                lastname: e.target.value,
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
          {/* <input
            // defaultValue={dataValue.objectKoinot.phoneNumber}
            onChange={(e) =>
              setProduct((state) => ({
                ...state,
                name: e.target.value,
              }))
            }
            type="number"
            maxLength={14}
            min={3}
            required
          /> */}
          <PhoneInput
            international
            defaultCountry="UZ"
            limitMaxLength={14}
            onChange={(e) =>
              setProduct((state) => ({
                ...state,
                phoneNumber: e?.target?.value?.slice(1, 14),
              }))
            }
          />
        </label>
        {/* {open === true ? (
          <label className="product-create-label">
            <h4>Sms Code</h4>
            <input
              onChange={(e) =>
                setProfile((state) => ({
                  ...state,
                  codeToVerifyPhoneNumber: e.target.value,
                }))
              }
              type="number"
              maxLength={5}
              min={3}
              required
            />
          </label>
        ) : (
          " "
        )} */}
        <div className="setup-btn-wrapper">
          <button className="product-create-form-button" type="submit">
            {t("hello77")}
          </button>
          {/* {open === true ? (
            <button
              onClick={handleReview}
              className="product-create-form-button">
              Tasdiqlash
            </button>
          ) : (
            <button className="product-create-form-button" type="submit">
              Yangilash
            </button>
          )} */}
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
