import {
  Box,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import "./ProductHero.css";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { SlArrowRight } from "react-icons/sl";
import { LuSettings2 } from "react-icons/lu";
import { useQuery } from "react-query";
import { fetchRegionData, getCategory, getFilterProductData } from "../../api";
import Card from "../Card/Card";
import { useTranslation } from "react-i18next";

export default function ProductHero() {
  const { t } = useTranslation();
  const [category, setCategory] = useState(1);
  const [section, setSection] = useState(1);
  const [top, setTop] = useState("");
  const [regionId, setRegionId] = useState("");
  const [search, setSearch] = useState("");
  const [subcategory, setsubcategory] = useState(1);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const { data } = useQuery("get category", getCategory);
  const { data: region } = useQuery("exampleData", fetchRegionData);
  const { data: paramsData, isLoading } = useQuery(
    ["filterParams", category, regionId, search],
    () => getFilterProductData(category, regionId, search)
  );
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
    <>
      <div className="product-hero">
        <form onSubmit={handleSubmit} className="product-hero-form">
          <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}>
                <MenuItem value={1}>Barchasi</MenuItem>
                <MenuItem value={2}>Kiyim-Kechak</MenuItem>
              </Select>
            </FormControl>
          </div>
          <label htmlFor="product-hero-search" className="product-hero-label">
            <CiSearch />
            <input
              id="product-hero-search"
              type="text"
              required
              onChange={(e) => setSearch(e.target.value)}
              maxLength={100}
              minLength={2}
              placeholder="Nimadir qidiramizmi?"
            />
          </label>
        </form>
        <div className="product-hero-filter">
          <div className="product-hero-filter-icon">
            <LuSettings2 />
          </div>
          <div className="product-hero-filter-wrapper">
            <div className="product-hero-filter-item">
              <span
                onClick={() => setSection((state) => (state === 1 ? 0 : 1))}>
                {t("hello18")}
              </span>
              <SlArrowRight
                style={section === 1 ? { rotate: "-90deg" } : null}
              />
              {section === 1 ? (
                <div className="product-hero-filter-category">
                  {data?.objectKoinot?.length
                    ? data.objectKoinot.map((el) => (
                        <div
                          key={el.id}
                          className="product-hero-filter-category-item">
                          <span
                            onClick={() => setsubcategory(el.id)}
                            style={
                              subcategory === el.id
                                ? { color: "#F26957" }
                                : null
                            }>
                            {el.nameUz}
                          </span>
                          <SlArrowRight
                            style={
                              subcategory === el.id
                                ? { color: "#F26957" }
                                : null
                            }
                          />
                          <div className="product-hero-filter-subcategory">
                            {data?.objectKoinot?.find(
                              (el) => el.id === subcategory
                            )?.children?.length
                              ? data?.objectKoinot
                                  ?.find((el) => el.id === subcategory)
                                  ?.children.map((el) => (
                                    <div
                                      key={el.id}
                                      className="product-hero-filter-subcategory-item">
                                      <span onClick={() => setSection(0)}>
                                        {el.nameUz}
                                      </span>
                                    </div>
                                  ))
                              : null}
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              ) : null}
            </div>
            <div className="product-hero-filter-item">
              <span
                onClick={() => setSection((state) => (state === 2 ? 0 : 2))}>
                {t("hello19")}
              </span>
              <SlArrowRight
                style={section === 2 ? { rotate: "-90deg" } : null}
              />
              {section === 2 ? (
                <div className="product-hero-filter-category">
                  <div className="product-hero-filter-category-item">
                    <span onChange={(e) => setTop(e.target.value)}>True</span>
                  </div>
                  <div className="product-hero-filter-category-item">
                    <span onChange={(e) => setTop(e.target.value)}>False</span>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="product-hero-filter-item">
              <span
                onClick={() => setSection((state) => (state === 3 ? 0 : 3))}>
                {t("hello20")}
              </span>
              <SlArrowRight
                style={section === 3 ? { rotate: "-90deg" } : null}
              />
              {section === 3 ? (
                <div className="product-hero-filter-category">
                  <div className="product-hero-filter-category-item">
                    <span value="true">True</span>
                  </div>
                  <div className="product-hero-filter-category-item">
                    <span value="false">False</span>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="product-hero-filter-item">
              <span
                onClick={() => setSection((state) => (state === 4 ? 0 : 4))}>
                {t("hello21")}
              </span>
              <SlArrowRight
                style={section === 4 ? { rotate: "-90deg" } : null}
              />
              {section === 4 ? (
                <div className="product-hero-filter-category product-hero-category">
                  {region?.objectKoinot?.content.length
                    ? region.objectKoinot.content.map((el) => (
                        <div
                          key={el.id}
                          onClick={() => setRegionId(el?.id)}
                          className="product-hero-filter-category-item">
                          <span
                            style={
                              subcategory === el.id
                                ? { color: "#F26957" }
                                : null
                            }>
                            {el.name}
                          </span>
                        </div>
                      ))
                    : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        {/*  */}
      </div>
      <div className="products filter-product">
        {paramsData?.content?.length ? (
          paramsData?.content?.map((evt, index) => (
            <Card data={evt} key={index} />
          ))
        ) : (
          <div>{t("hello22")}</div>
        )}
      </div>
    </>
  );
}
