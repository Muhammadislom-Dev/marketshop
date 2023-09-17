import "./ProductHero.css";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { SlArrowRight } from "react-icons/sl";
import { LuSettings2 } from "react-icons/lu";
import { useQuery } from "react-query";
import { fetchRegionData, getCategory, getFilterProductData } from "../../api";
import Card from "../Card/Card";
import NotfindInfo from "../NotfindInfo/NotfindInfo";
import { useParams } from "react-router-dom";
import { t } from "i18next";

export default function ProductHero() {
  const [page, setPage] = useState("12");
  const i18next = localStorage.getItem("i18nextLng");
  const { id } = useParams();
  const [active, setActive] = useState("");
  const [category, setCategory] = useState("");
  const [section, setSection] = useState(0);
  const [regionId, setRegionId] = useState("");
  const [search, setSearch] = useState("");
  const [subcategory, setsubcategory] = useState(1);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const idCategory = category === "" ? id : category;
  const { data } = useQuery("get category", getCategory);
  const { data: region } = useQuery("exampleData", fetchRegionData);
  const categoryByIdName = data?.objectKoinot?.find(
    (evt) => evt.id === Number(id)
  );
  const { data: paramsData, isLoading } = useQuery(
    ["filterParams", category, regionId, search],
    () => getFilterProductData(idCategory, active, regionId, search, page)
  );

  return (
    <>
      <div className="product-hero">
        <form onSubmit={handleSubmit} className="product-hero-form">
          <label htmlFor="product-hero-search" className="product-hero-label">
            <CiSearch />
            <input
              id="product-hero-search"
              type="text"
              required
              onChange={(e) => setSearch(e.target.value)}
              maxLength={100}
              minLength={2}
              placeholder={t("hello42")}
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
                {t("hello93")}
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
                            onClick={() => {
                              setsubcategory(el.id);
                              setCategory(el.id);
                            }}
                            style={
                              subcategory === el.id
                                ? { color: "#F26957" }
                                : null
                            }>
                            {/* {el.nameUz} */}{" "}
                            {i18next === "ru" ? el.nameUz : el.nameUz}
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
                                        {/* {el.nameUz} */}{" "}
                                        {i18next === "ru"
                                          ? el.nameRu
                                          : el.nameUz}
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
                {t("hello20")}
              </span>
              <SlArrowRight
                style={section === 2 ? { rotate: "-90deg" } : null}
              />
              {section === 2 ? (
                <div
                  style={{ height: "130px" }}
                  className="product-hero-filter-category">
                  <div className="product-hero-filter-category-item">
                    <button
                      style={active === "NEW" ? { color: "#F26957" } : null}
                      onClick={(e) => setActive(e.target.value)}
                      value="NEW">
                      {t("hello4")}
                    </button>
                  </div>
                  <div className="product-hero-filter-category-item">
                    <button
                      style={active === "AVERAGE" ? { color: "#F26957" } : null}
                      onClick={(e) => setActive(e.target.value)}
                      value="AVERAGE">
                      {t("hello5")}
                    </button>
                  </div>
                  <div className="product-hero-filter-category-item">
                    <button
                      style={active === "OLD" ? { color: "#F26957" } : null}
                      onClick={(e) => setActive(e.target.value)}
                      value="OLD">
                      {t("hello6")}
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="product-hero-filter-item">
              <span
                onClick={() => setSection((state) => (state === 3 ? 0 : 3))}>
                {t("hello94")}
              </span>
              <SlArrowRight
                style={section === 3 ? { rotate: "-90deg" } : null}
              />
              {section === 3 ? (
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
                            {/* {el.name} */}{" "}
                            {i18next === "ru" ? el.nameRu : el.name}
                          </span>
                        </div>
                      ))
                    : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="producthero-names">
        <h2 className="producthero-name">
          {" "}
          {i18next === "uz"
            ? categoryByIdName?.nameUz
            : categoryByIdName?.nameRu}{" "}
        </h2>
      </div>
      <div className="products filter-product">
        {paramsData?.content?.length ? (
          paramsData?.content?.map((evt, index) => (
            <Card data={evt} key={index} />
          ))
        ) : (
          <NotfindInfo />
        )}
      </div>
      <button onClick={() => setPage(100)} className="products-all-button">
        {t("hello82")}
      </button>
    </>
  );
}
