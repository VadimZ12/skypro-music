import Exit from "../Exit/Exit";
import { Menu } from "../Menu/Menu";
import Search from "../Search/Search";
import styles from "./Header.module.css";
const Header = () => {
  return (
    <div className={styles.centerblock}>
      <Menu />
      <Search />
      <Exit />
    </div>
  );
};

export default Header;