"use client";
import { useState } from "react";
import FilterItem from "./FilterItem/FilterItem";
import styles from "./Filters.module.css";
import { Props } from "@/types/types";
import { useAppSelector } from "@/hooks/store";

export const Filters = ({ uniqueAuthors, uniqueGenre }: Props) => {
  const filterData = [
    {
      list: uniqueAuthors,
      title: "исполнителю",
      value: "author",
      selected: useAppSelector((store) => store.playlist.filterOptions.author),
    },
    {
      list: uniqueGenre,
      title: "жанру",
      value: "genre",
      selected: useAppSelector((store) => store.playlist.filterOptions.genre),
    },
    {
      list: ["По умолчанию", "Сначала новые", "Сначала старые"],
      title: "году выпуска",
      value: "release",
      selected: Array.from(useAppSelector((store) => store.playlist.filterOptions.order)),
    },
  ];
  const [filterValue, setFilterValue] = useState<string | null>(null);
  const changeFilterValue = (value: string) => {
    setFilterValue((prev) => (prev === value ? null : value));
  };
  return (
    <>
      <div className={styles.filter}>
        <div className={styles.filter__title}>Искать по:</div>
        {filterData.map((item, index) => (
          <FilterItem
            key={index}
            title={item.title}
            list={item.list}
            value={item.value}
            onClick={changeFilterValue}
            isOpen={filterValue === item.value}
            selected={item.selected}
          />
        ))}
      </div>
    </>
  );
};