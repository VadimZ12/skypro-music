"use client";
import { useState } from "react";
import FilterItem from "./FilterItem/FilterItem";
import styles from "./Filters.module.css";
import { Props } from "@/types/types";

export const Filters = ({ uniqueAuthors, uniqueGenre }: Props) => {
  const filterData = [
    { list: uniqueAuthors, title: "исполнителю", value: "author" },
    {
      list: uniqueGenre,
      title: "жанру",
      value: "genre",
    },
    {
      list: ["По умолчанию", "Сначала новые", "Сначала старые"],
      title: "году выпуска",
      value: "release",
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
          />
        ))}
      </div>
    </>
  );
};