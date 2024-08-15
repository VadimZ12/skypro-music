"use client";
import Link from "next/link";
import styles from "./Menu.module.css";
import Image from "next/image";
import { useState } from "react";

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prevState) => !prevState);
  return (
    <nav className={styles.nav}>
      <div>
        <Link href="/">
          <Image
            className={styles.logoImage}
            src="/img/logo.png"
            width={113}
            height={17}
            alt="Логотип скайпро музыка"
          />
        </Link>
      </div>
      <button className={styles.navBurger} onClick={toggleMenu}>
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </button>
      {isOpen && (
        <div className={styles.navMenu}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <Link className={styles.menuLink} href="/">
                Главное
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link className={styles.menuLink} href="/tracks/favorite">
                Мой плейлист
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/signin" className={styles.menuLink}>
                Войти
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};