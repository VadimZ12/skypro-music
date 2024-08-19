import { trackType } from "@/components/types";
import styles from "./FilterItem.module.css";
import classNames from "classnames";
import { setFilters } from "@/store/features/playlistSlice";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/store";

type FilterItemType = {
  title: string;
  value: "author" | "genre" | "order";
  handleFilterClick: (newFilter: string) => void;
  isOpened: boolean;
  optionList: string[] | string;
};

const order = ["по умолчанию", "сначала новые", "сначала старые"];

export default function FilterItem({
  handleFilterClick,
  title,
  value,
  isOpened,
  optionList,
}: FilterItemType) {
  const [filterNumber, setFilterNumber] = useState<number>(0);
  const tracksData = useAppSelector((state) => state.playlist.initialTracks);
  const dispatch = useAppDispatch();
  
  const getFilterList = () => {
    if (value !== "order") {
      const array = new Set(
        tracksData?.map((track: trackType) => track[value]) || []
      );
      return Array.from(array);
    }
    return order;
  };

  const toggleFilter = (item: string) => {
    if (value !== "order" && optionList && optionList instanceof Array) {
      dispatch(
        setFilters({
          [value]: optionList.includes(item)
            ? optionList.filter((el) => el !== item)
            : [...optionList, item],
        })
      );
    } else {
      dispatch(setFilters({ order: item }));
    }
  };

  useEffect(() => {
    if (value !== "order" && optionList) {
      setFilterNumber(optionList.length);
    }
  }, [optionList, value]);
  getFilterList();
  return (
    <>
      <div>
        <div className={styles.filterCount}>
          <div
            onClick={() => handleFilterClick(title)}
            className={classNames(styles.filterButton, {
              [styles.active]: isOpened,
            })}
          >
            {title}
          </div>
          {optionList.length > 0 && value !== "order" ? (
            <div className={styles.filteredItems}>{filterNumber}</div>
          ) : null}
        </div>

        <div>
          {isOpened && (
              <ul className={styles.filterListDown}>
                {getFilterList().map((item) => (
                  <li
                    onClick={() => toggleFilter(item)}
                    key={item}
                    className={classNames(styles.filterItem, {
                      [styles.filterItemActive]:
                        value === "order"
                          ? item === optionList
                          : optionList.includes(item),
                    })}
                  >
                    {item}
                  </li>
                ))}
              </ul>
          )}
        </div>
      </div>
    </>
  );
}