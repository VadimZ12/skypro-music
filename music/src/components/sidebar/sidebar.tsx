import styles from "./sidebar.module.css";
import Image from "next/image";

export default function Sidebar() {
  return (
    <div className={styles.mainSidebar}>
      <div className={styles.sidebarPersonal}>
        <p className={styles.sidebarPersonalName}>Sergey.Ivanov</p>
        <div className={styles.sidebarIcon}>
          <svg>
            <use xlinkHref="/sprite.svg#logout"></use>
          </svg>
        </div>
      </div>
      <div className={styles.sidebarBlock}>
        <div className={styles.sidebarlist}>
          <div className={styles.sidebarItem}>
            <a className={styles.sidebarlink} href="#">
              <Image
                className={styles.sidebarImg}
                src="/playlist01.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </a>
          </div>
          <div className={styles.sidebarItem}>
            <a className={styles.sidebarlink} href="#">
              <Image
                className={styles.sidebarImg}
                src="/playlist02.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </a>
          </div>
          <div className={styles.sidebarItem}>
            <a className={styles.sidebarlink} href="#">
              <Image
                className={styles.sidebarImg}
                src="/playlist03.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
