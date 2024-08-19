"use client";

import { useAppSelector } from "@/hooks/store";
import styles from "./Filter.module.css";
import FilterItem from "./FilterItem/FilterItem";
import { useState } from "react";

type filtersType = {
  title: string;
  value: "author" | "genre" | "order";
}
const filters: filtersType[] = [
  {
    title: "исполнителю",
    value: "author",
  },
  {
    title: "году выпуска",
    value: "order",
  },
  {
    title: "жанру",
    value: "genre",
  },
];

export default function Filter() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
const {author, genre,order} = useAppSelector((store)=> store.playlist.filterOptions)
  function handleFilterClick(newFilter: string) {
    setActiveFilter((prev) => (prev === newFilter ? null : newFilter));
  }
  return (
    <div className={styles.centerblockFilter}>
      <div className={styles.filterTitle}>Искать по:</div>

      <FilterItem
        isOpened={activeFilter === filters[0].title}
        handleFilterClick={handleFilterClick}
        title={filters[0].title}
        value={filters[0].value}
        optionList={author}
        
      />

      <FilterItem
        isOpened={activeFilter === filters[1].title}
        handleFilterClick={handleFilterClick}
        title={filters[1].title}
        value={filters[1].value}
        optionList={order}
      />

      <FilterItem
        isOpened={activeFilter === filters[2].title}
        handleFilterClick={handleFilterClick}
        title={filters[2].title}
        value={filters[2].value}
        optionList={genre}
      />
    </div>
  );
}