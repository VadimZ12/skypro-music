import styles from "./FilterItem.module.css";
import cn from "classnames";
type Props = {
  title: string;
  list: string[];
  onClick: (value: string) => void;
  value: string;
  isOpen: boolean;
};
const FilterItem = ({ title, list, onClick, value, isOpen }: Props) => {
  return (
    <div>
      <div
        className={cn(styles.filter__button, styles.btnText, {[styles.active]:isOpen})}
        onClick={() => {
          onClick(value);
        }}
      >
        {title}
      </div>

      {isOpen && (
        <div className={styles.listContainer}>
          <ul className={styles.listBox}>
            {list.map((item, index) => (
              <li key={index} className={styles.listText}>
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