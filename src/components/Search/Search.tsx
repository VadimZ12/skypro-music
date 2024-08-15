"use client";
import React, { useState } from "react";
import styles from "./Search.module.css";
import { useAppDispatch } from "@/hooks/store";
import { resetFilters, setFilter } from "@/store/features/playlistSlice";
const Search = () => {
  const dispatch = useAppDispatch();
  const [searchResult, setSearchResult] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setSearchResult(search);
    if (search.trim() === "") {
      dispatch(resetFilters());
    } else {
      dispatch(setFilter({ searchString: search }));
    }
  };
  return (
    <div className={styles.centerblock}>
      <div className={styles.search}>
        <svg className={styles.search__svg}>
          <use xlinkHref="img/icon/sprite.svg#icon-search" />
        </svg>
        <input
          className={styles.search__text}
          type="search"
          placeholder="Поиск"
          name="search"
          value={searchResult}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default Search;