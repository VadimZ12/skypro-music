"use client";
import Link from "next/link";
import styles from "./Menu.module.css";
import { useState } from "react";
import { useAppSelector } from "@/hooks/store";
export default function Menu() {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const userName = useAppSelector((state) => state.auth.user?.username);
  return (
    <>
      <div
        onClick={() => setIsOpened((prev) => !prev)}
        className={styles.navBurger}
      >
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </div>
      {isOpened && (
        <div className={styles.navMenu}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <Link href="/tracks" className={styles.menuLink}>
                Главное
              </Link>
            </li>
            {userName && (
              <li className={styles.menuItem}>
                <Link href={"/tracks/favourite"} className={styles.menuLink}>
                  Мой плейлист
                </Link>
              </li>
            )}

            <li className={styles.menuItem}>
              <Link href="/signin" className={styles.menuLink}>
                Войти
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}