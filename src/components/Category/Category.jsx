import { NavLink } from "react-router-dom";
import "./Category.css";
import { SlArrowRight } from "react-icons/sl";
import { useQuery } from "react-query";
import { getCategory } from "../../api";
import { useState } from "react";

export default function Category({ setisCategory, isCategory }) {
  const [activeCategory, setactiveCategory] = useState(1);
  const { data } = useQuery("get category", getCategory);
  const i18next = localStorage.getItem("i18nextLng");

  return (
    <div
      className={`${isCategory ? "viewCat" : null} category`}
      onMouseEnter={() => setisCategory(true)}
      onMouseLeave={() => setisCategory(false)}>
      <ul className="category-section-main">
        {data?.objectKoinot?.length
          ? data.objectKoinot.map((el) => (
              <li
                key={el.id}
                onMouseEnter={() => setactiveCategory(el.id)}
                className={
                  activeCategory == el.id
                    ? "category-section-main-item category-section-main-item-active"
                    : "category-section-main-item"
                }>
                <p
                  dangerouslySetInnerHTML={{
                    __html: el.iconInSelect,
                  }}
                />
                <span>{i18next === "uz" ? el.nameUz : el.nameRu}</span>
                <SlArrowRight />
              </li>
            ))
          : null}
      </ul>
      <div className="category-border"></div>
      <ul className="category-section-secondary">
        {data?.objectKoinot?.find((el) => el.id === activeCategory)?.children
          ?.length
          ? data?.objectKoinot
              ?.find((el) => el.id === activeCategory)
              ?.children.map((el) => (
                <NavLink
                  onClick={() => setisCategory(false)}
                  key={el.id}
                  to={`/${activeCategory}`}
                  style={({ isActive }) =>
                    isActive ? { color: "#F26957" } : { color: "#000" }
                  }>
                  <li className="category-section-secondary-item">
                    <SlArrowRight />
                    <span>{i18next === "uz" ? el.nameUz : el.nameRu}</span>
                  </li>
                </NavLink>
              ))
          : null}
      </ul>
      <div className="category-border"></div>
    </div>
  );
}
