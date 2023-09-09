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
  const [moderData, setModerData] = useState([]);
  const [idArray, setIdArray] = useState([]);
  const i18next = localStorage.getItem("i18nextLng");
  const [activeModal, setActiveModal] = useState(false);
  const [product, setProduct] = useState({
    id: editId,
    categoryId: 1,
    active: true,
    delete: true,
    top: true,
    productQuality: "AVERAGE",
    regionId: 1,
    districtId: 1,
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
      .then((res) => setModerData(res.data))
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
      photosId: idArray,
      name: moderData.name,
      description: moderData.description,
      phoneNumber: moderData.phoneNumber,
    };
    mutate(submitData);
  };
  const { data } = useQuery("category", getCategory);
  const region = useQuery("regionId", fetchRegionData);
  const district = useQuery("districtId", () =>
    fetchDistrictData(product.regionId)
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
  }, [product.regionId]);

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
      <div className="addImage">
        <h3 className="addImage-title">{t("hello53")}</h3>
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
          <label htmlFor="create-product-img" className="addImage-box-button">
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
        <h4 className="addImage-warning">{t("hello54")}</h4>
        <span className="addImage-warning-desc">{t("hello55")}</span>
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
              value={product.categoryId}
              onChange={(e) =>
                setProduct((state) => ({
                  ...state,
                  categoryId: e.target.value,
                }))
              }
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}>
              {data?.objectKoinot?.length ? (
                data?.objectKoinot?.map((el, index) => (
                  <MenuItem key={index} value={el?.id}>
                    {i18next === "uz" ? el.nameUz : el.nameRu}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value={1}>{t("hello59")}</MenuItem>
              )}
            </Select>
          </FormControl>
        </label>
        <label className="product-create-label">
          <h4>{t("hello60")}</h4>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              onChange={(e) =>
                setProduct((state) => ({
                  ...state,
                  productQuality: e.target.value,
                }))
              }
              value={product.productQuality}
              displayEmpty
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
              onChange={(e) =>
                setProduct((state) => ({
                  ...state,
                  regionId: e.target.value,
                }))
              }
              value={product.regionId}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}>
              {region.data
                ? region.data.objectKoinot.content.map((el) => (
                    <MenuItem key={el.id} value={el.id}>
                      {el.name}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
        </label>
        <label className="product-create-label">
          <h4>{t("hello41")}</h4>
          {district.data ? (
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                onChange={(e) =>
                  setProduct((state) => ({
                    ...state,
                    districtId: e.target.value,
                  }))
                }
                value={product.districtId}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}>
                {district.data.objectKoinot.content.map((el) => (
                  <MenuItem key={el.id} value={el.id}>
                    {el.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : null}
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
    </div>
  );
}

export default ProductEdit;
