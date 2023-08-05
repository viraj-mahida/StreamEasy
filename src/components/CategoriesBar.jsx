import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideosData } from "@/store/actions/listVideos-action";
import { listVideosSliceAction } from "@/store/slices/listVideos-slice";
import s from "@/styles/categoriesBar.module.css";

const CategoriesBar = () => {
  const dispatch = useDispatch();
  const scrollContainerRef = useRef(null);
  const [toggleRightScrollBtn, setToggleRightScrollBtn] = useState(false);
  const [toggleLeftScrollBtn, setToggleLeftScrollBtn] = useState(true);

  const res = useSelector((state) => state.listVideosSlice.listCategoriesState);
  const videoCategories = res.filter(
    (element) =>
      element.snippet.title !== "Short Movies" &&
      element.snippet.title !== "Videoblogging" &&
      element.snippet.title !== "Foreign" &&
      element.snippet.title !== "Sci-Fi/Fantasy" &&
      element.snippet.title !== "Shows"
  );

  const activeCategory = useSelector(
    (state) => state.listVideosSlice.activeCategory
  );

  const handleOnScroll = () => {
    const scrollContainer = scrollContainerRef.current;

    setToggleRightScrollBtn(
      scrollContainer.scrollLeft + scrollContainer.clientWidth + 50 >=
        scrollContainer.scrollWidth
    );

    setToggleLeftScrollBtn(scrollContainer.scrollLeft <= 1);
  };

  const handleOnClickRight = () => {
    const scrollContainer = scrollContainerRef.current;
    scrollContainer.scrollLeft += 1000;
  };

  const handleOnClickLeft = () => {
    const scrollContainer = scrollContainerRef.current;
    scrollContainer.scrollLeft -= 1000;
  };

  useEffect(() => {
    dispatch(fetchVideosData("/videoCategories"));
  }, [dispatch]);

  const unFilterVideos = () => {
    dispatch(listVideosSliceAction.saveActiveCategoriReducer(999));
    dispatch(fetchVideosData("/videos", null, null, null, null, null));
  };

  const filterVideosByCategory = (categoryId) => {
    if (activeCategory !== categoryId) {
      dispatch(listVideosSliceAction.saveActiveCategoriReducer(categoryId));
      dispatch(fetchVideosData("/search", null, categoryId, null, null, null));
    } else {
      unFilterVideos();
    }
  };

  return (
    <>
      <div
        className={s.categoriesBarParent}
        onScroll={handleOnScroll}
        ref={scrollContainerRef}
      >
        <li
          className={`${s.catList} ${activeCategory === 999 ? s.active : ""}`}
          onClick={unFilterVideos}
        >
          All
        </li>

        {videoCategories.map((element) => (
          <li
            key={element.id}
            className={`${s.catList} ${
              activeCategory === element.id ? s.active : ""
            }`}
            onClick={() => filterVideosByCategory(element.id)}
          >
            {element.snippet.title}
          </li>
        ))}

        <button
          id="LBtn"
          className={`${toggleLeftScrollBtn ? '' : s.scrollX} ${s.catBarLeftBtn}`}
          onClick={handleOnClickLeft}
        >
          <p className={s.leftScrollBtnIcon}>
            <i className="fa-solid fa-chevron-left"></i>
          </p>
        </button>
        <button
          id="RBtn"
          className={`${toggleRightScrollBtn ? '': s.scrollX} ${s.catBarRightBtn}`}
          onClick={handleOnClickRight}
        >
          <p className={s.rightScrollBtnIcon}>
            <i className="fa-solid fa-chevron-right"></i>
          </p>
        </button>
      </div>
    </>
  );
};

export default CategoriesBar;
