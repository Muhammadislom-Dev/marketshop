import { NavLink } from "react-router-dom";
import "./Category.css";
import { SlArrowRight } from "react-icons/sl";
import { useQuery } from "react-query";
import { getCategory } from "../../api";
import { useState } from "react";
import clothes from "../../assets/category-icons/clothes.svg";
import electronic from "../../assets/category-icons/electronic.svg";
import transport from "../../assets/category-icons/transport.svg";
import cat from "../../assets/category-icons/cat.svg";
import baby from "../../assets/category-icons/baby.svg";

export default function Category({ setisCategory, isCategory }) {
  const [activeCategory, setactiveCategory] = useState(1);
  const { data } = useQuery("get category", getCategory);
  const icons = [clothes, electronic, transport, cat, baby];
  // onMouseEnter={() => setShowCat(true)} onMouseLeave={() => setShowCat(false)}
  // const [showCat, setShowCat] = useState(false);
  // console.log(activeCategory);

  return (
    <div
      className={`${isCategory ? "viewCat" : null} category`}
      onMouseEnter={() => setisCategory(true)}
      onMouseLeave={() => setisCategory(false)}>
      <ul className="category-section-main">
        {data?.objectKoinot?.length
          ? data.objectKoinot.map((el, index) => (
              <li
                key={el.id}
                // onClick={() => setactiveCategory(el.id)}
                onMouseEnter={() => setactiveCategory(el.id)}
                className={
                  activeCategory == el.id
                    ? "category-section-main-item category-section-main-item-active"
                    : "category-section-main-item"
                }>
                {el.photo ? (
                  <img
                    style={{
                      width: "24px",
                      height: "24px",
                      objectFit: "cover",
                    }}
                    src={el.photo.filePath}
                  />
                ) : null}
                <span>{el.nameUz}</span>
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
                    <span>{el.nameUz}</span>
                  </li>
                </NavLink>
              ))
          : null}
      </ul>
      <div className="category-border"></div>
    </div>
  );
}
