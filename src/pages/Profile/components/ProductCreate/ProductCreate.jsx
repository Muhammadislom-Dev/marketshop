import "./ProductCreate.css";
import { BsPlusCircle } from "react-icons/bs";
import { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useMutation, useQuery } from "react-query";
import {
  API,
  createProduct,
  fetchDistrictData,
  fetchRegionData,
  getCategory,
  getCategoryById,
} from "../../../../api";
import ProductModal from "../ProductModal/ProductModal";
import { Box, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { t } from "i18next";

export default function ProductCreate({ editId }) {
  const [imgBox, setimageBox] = useState([]);
  const [dataId, setDataId] = useState([]);
  const [activeModal, setActiveModal] = useState(false);
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState({
    categoryId: 1,
    active: true,
    delete: true,
    top: true,
    productQuality: "AVERAGE",
    regionId: 1,
    districtId: 1,
    photosId: [],
  });

  const { mutate: imageMutate } = useMutation(async (payload) => {
    try {
      const res = await API.fileUpload(payload);
      const newPhotoId = res.data.objectKoinot[0].id;

      setProduct((prev) => ({
        ...prev,
        photosId: [...prev.photosId, newPhotoId], // Yangi id ni mavjud arrayga qo'shib qo'yamiz
      }));

      toast.success("Rasm muvaffaqiyatli yuklandi");
    } catch (err) {
      console.log(err);
      toast.danger("Rasm yuklanmadi qaytadan urinib ko'ring");
    }
  });


  const { data: categoryData } = useQuery(
    ["subcategory", category, setDataId],
    () => getCategoryById(category, setDataId)
  );

  const { mutate, isLoading } = useMutation((data) => createProduct(data), {
    onSuccess: (data) => {
      setActiveModal(true);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(product);
  };
  const { data } = useQuery("category", getCategory);
  const region = useQuery("regionId", fetchRegionData);
  const district = useQuery("districtId", () =>
    fetchDistrictData(product.regionId)
  );
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
      {activeModal ? <ProductModal setActiveModal={setActiveModal} /> : null}
      <div className="addImage">
        <h3 className="addImage-title">{t("hello53")}</h3>
        <div className="addImage-box">
          {imgBox?.map((el, index) =>
            el ? (
              <img
                key={index}
                src={URL.createObjectURL(el)}
                alt="error"
                className="addImage-box-item"
              />
            ) : null
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
            onChange={(e) =>
              setProduct((state) => ({
                ...state,
                name: e.target.value,
              }))
            }
            type="text"
            maxLength={500}
            min={3}
            required
          />
        </label>
        <label className="product-create-label">
          <h4>{t("hello57")}</h4>
          <textarea
            onChange={(e) =>
              setProduct((state) => ({
                ...state,
                description: e.target.value,
              }))
            }
            style={{ padding: "8px" }}
            rows="10"
            maxLength={500}
            min={3}
            required></textarea>
        </label>
        <label className="product-create-label">
          <h4>{t("hello58")}</h4>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setProduct((state) => ({
                  ...state,
                  categoryId: e.target.value,
                }));
              }}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}>
              {data?.objectKoinot?.length ? (
                data?.objectKoinot?.map((el, index) => (
                  <MenuItem key={index} value={el?.id}>
                    {el?.nameUz}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value={1}>{t("hello59")}</MenuItem>
              )}
            </Select>
          </FormControl>
        </label>
        <label className="product-create-label">
          <h4>{t("hello58")}</h4>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select displayEmpty inputProps={{ "aria-label": "Without label" }}>
              {dataId?.objectKoinot?.children?.length ? (
                dataId?.objectKoinot.children?.map((el, index) => (
                  <MenuItem key={index} value={el?.id}>
                    {el?.nameUz}
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
              <MenuItem value="AVERAGE">O'rta</MenuItem>
              <MenuItem value="NEW">Yangi</MenuItem>
              <MenuItem value="OLD">Eski</MenuItem>
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
          <h4> {t("hello61")}</h4>
          <input
            onChange={(e) =>
              setProduct((state) => ({
                ...state,
                phoneNumber: e.target.value.slice(1, 13),
              }))
            }
            type="tell"
            maxLength={14}
            min={3}
            required
            placeholder="+998"
            pattern="^[0-9+-]*$"
          />
        </label>

        <button className="product-create-form-button" type="submit">
          {t("hello64")}
        </button>
      </form>
    </div>
  );
}
