import { BsPlusCircle } from "react-icons/bs";
import { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useMutation, useQuery } from "react-query";
import {
  API,
  API_URL,
  createProduct,
  fetchDistrictData,
  fetchRegionData,
  getCategory,
} from "../../../../api";
import { Box, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import ProductModal from "../ProductModal/ProductModal";
import { useTranslation } from "react-i18next";
import axios from "axios";

function ProductEdit({ editId }) {
  const [imgBox, setimageBox] = useState([]);
  const [moderData, setModerData] = useState();
  const [idArray, setIdArray] = useState([]);
  const i18next = localStorage.getItem("i18nextLng");
  const [activeModal, setActiveModal] = useState(false);
  const [product, setProduct] = useState({
    id: editId,
    active: true,
    delete: true,
    top: true,
  });

  const { mutate: imageMutate } = useMutation(async (payload) => {
    try {
      const res = await API.fileUpload(payload);
      const newPhotoId = res.data.objectKoinot[0].id;
      setIdArray((prevIds) => [...prevIds, newPhotoId]);

      toast.success("Rasm muvaffaqiyatli yuklandi");
    } catch (err) {
      toast.danger("Rasm yuklanmadi qaytadan urinib ko'ring");
    }
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/product/v1/${editId}`)
      .then((res) => {
        setModerData(res.data);
      })
      .catch((err) => console.log(err));
  }, [editId]);

  const { mutate, isLoading } = useMutation((data) => createProduct(data), {
    onSuccess: (data) => {
      setActiveModal(true);
    },
    onError: (error) => {},
  });

  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...product,
      name: moderData.name,
      description: moderData.description,
      photosId: idArray,
      regionId: moderData.regionId,
      districtId: moderData.districtId,
      categoryId: moderData.categoryId,
      productQuality: moderData.quality,
      phoneNumber: moderData?.phoneNumber,
    };
    mutate(submitData);
  };
  const { data } = useQuery("category", getCategory);
  const region = useQuery("regionId", fetchRegionData);
  const district = useQuery("districtId", () =>
    fetchDistrictData(moderData?.regionId)
  );

  const handleChange = (key, value) => {
    setModerData((prevState) => ({ ...prevState, [key]: value }));
  };

  useEffect(() => {
    const updateIdArray = () => {
      const ids = moderData?.photos?.map((item) => item.id);
      setIdArray(ids);
    };

    updateIdArray();
  }, [moderData]);

  useEffect(() => {
    district.refetch();
  }, [moderData?.regionId]);

  useEffect(() => {
    setProduct((state) => ({
      ...state,
      districtId: district?.data?.objectKoinot?.content[0]?.id,
    }));
  }, [district.data]);

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
    <div>
      {activeModal ? <ProductModal /> : null}
      {!!moderData && (
        <>
          <div className="addImage">
            <h3 className="addImage-title">{t("hello531")}</h3>
            <div className="addImage-box">
              {moderData?.photos?.map((evt, key) => (
                <img
                  key={key}
                  src={evt.filePath}
                  alt=""
                  className="addImage-box-item"
                />
              ))}
              {imgBox?.map((el, index) =>
                el ? (
                  <img
                    key={index}
                    src={URL.createObjectURL(el)}
                    alt="error"
                    className="addImage-box-item"
                  />
                ) : (
                  <img
                    key={index}
                    src={moderData.photos[0].filePath}
                    alt="error"
                    className="addImage-box-item"
                  />
                )
              )}
              <label
                htmlFor="create-product-img"
                className="addImage-box-button">
                <BsPlusCircle />
                <span>{t("hello53")}</span>
                <input
                  type="file"
                  id="create-product-img"
                  accept="image/*"
                  onChange={(e) => {
                    setimageBox((state) => [...state, e.target.files[0]]);
                    imageMutate({ key: e.target.files[0] });
                  }}
                />
              </label>
            </div>
          </div>

          <form className="product-create-form" onSubmit={handleSubmit}>
            <label className="product-create-label">
              <h4>{t("hello56")}</h4>
              <input
                type="text"
                maxLength={500}
                min={3}
                value={moderData?.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </label>
            <label className="product-create-label">
              <h4>{t("hello57")}</h4>
              <textarea
                value={moderData?.description}
                onChange={(e) => handleChange("description", e.target.value)}
                style={{ padding: "5px 15px" }}
                rows="10"
                maxLength={500}
                min={3}
                required></textarea>
            </label>
            <label className="product-create-label">
              <h4>{t("hello58")}</h4>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  onChange={(e) => handleChange("categoryId", e.target.value)}
                  value={moderData?.categoryId}
                  inputProps={{ "aria-label": "Without label" }}>
                  {data?.objectKoinot?.map((el, index) => (
                    <MenuItem key={index} value={el?.id}>
                      {i18next === "uz" ? el.nameUz : el.nameRu}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </label>
            <label className="product-create-label">
              <h4>{t("hello60")}</h4>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  onChange={(e) =>
                    handleChange("productQuality", e.target.value)
                  }
                  value={moderData?.quality}
                  inputProps={{ "aria-label": "Without label" }}>
                  <MenuItem value="AVERAGE">{t("hello5")}</MenuItem>
                  <MenuItem value="NEW">{t("hello4")}</MenuItem>
                  <MenuItem value="OLD">{t("hello6")}</MenuItem>
                </Select>
              </FormControl>
            </label>
            <label className="product-create-label">
              <h4>{t("hello21")}</h4>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  onChange={(e) => handleChange("regionId", e.target.value)}
                  value={moderData?.regionId}
                  inputProps={{ "aria-label": "Without label" }}>
                  {region.data.objectKoinot.content.map((el) => (
                    <MenuItem key={el.id} value={el.id}>
                      {i18next === "ru" ? el.nameRu : el.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </label>
            <label className="product-create-label">
              <h4>{t("hello41")}</h4>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  onChange={(e) => handleChange("districtId", e.target.value)}
                  value={!!moderData?.districtId && moderData?.districtId}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}>
                  {moderData?.districtId ? (
                    <>
                      {district?.data?.objectKoinot?.content?.map((el) => (
                        <MenuItem key={el?.id} value={el?.id}>
                          {i18next === "ru" ? el?.nameRu : el?.name}
                        </MenuItem>
                      ))}
                    </>
                  ) : (
                    "Hello world"
                  )}
                </Select>
              </FormControl>
            </label>
            <label className="product-create-label">
              <h4>{t("hello61")}</h4>
              <div className="product-edit-input" style={{ width: "100%" }}>
                <input
                  value={moderData?.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  type="tell"
                  maxLength={14}
                  className="product-edit-input"
                  min={3}
                  required
                  pattern="^[0-9+-]*$"
                />
              </div>
            </label>
            <button className="product-create-form-button" type="submit">
              {t("hello66")}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default ProductEdit;
