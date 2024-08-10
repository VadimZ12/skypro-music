import { useDispatch } from "react-redux";
import styles from "./FilterItem.module.css";
import cn from "classnames";
import { useAppDispatch } from "@/hooks/store";
import { setFilter } from "@/store/features/playlistSlice";

type Props = {
  title: string;
  list: string[];
  onClick: (value: string) => void;
  value: string;
  isOpen: boolean;
  selected: string[] | string;
};
const FilterItem = ({
  title,
  list,
  onClick,
  value,
  isOpen,
  selected = [],
}: Props) => {
  const dispatch = useAppDispatch();
  const toggleFilter = (item: string) => {
    if (value === "release") {
      dispatch(setFilter({ order: item }));
      return;
    }
    if (selected instanceof Array)
      dispatch(
        setFilter({
          [value]: selected.includes(item)
            ? selected.filter((el) => el !== item)
            : [...selected, item],
        })
      );
  };

  return (
    <div>
      <div
        className={cn(styles.filter__button, styles.btnText, {
          [styles.active]: isOpen,
        })}
        onClick={() => {
          onClick(value);
        }}
      >
        {selected.length > 0 && value !== "release" ? (
          <div className={styles.filterCount}>{selected.length}</div>
        ) : null}

        {title}
      </div>

      {isOpen && (
        <div className={styles.listContainer}>
          <ul className={styles.listBox}>
            {list.map((item, index) => (
              <li
                key={index}
                className={cn(styles.listText, {
                  [styles.listTextActive]:
                    value === "release"
                      ? selected === item
                      : selected.includes(item),
                })}
                onClick={() => toggleFilter(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterItem;