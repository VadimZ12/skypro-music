import Image from "next/image";
import Menu from "@/components/Menu/Menu";
import Centerblock from "@/components/Centerblock/Centerblock";
import Sidebar from "@/components/Sidebar/Sidebar";
import Bar from "@/components/Bar/Bar";
import Playlist from "@/components/Playlist/Playlist";
import styles from "./page.module.css";
import Filter from "@/components/Filters/Filters";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className="container">
        <main className="main">
          <nav className="main__nav nav">
            <div className="nav__logo logo">
              <Image
                alt="логотип Скайпро-музыка"
                className="logo__image"
                width={113}
                height={17}
                src="/img/logo.png"
              />
            </div>
            <Menu />
          </nav>
          <div className={styles.mainCenterblock}>
            <Centerblock />
            <Filter />
            <Playlist tracks={[]} playlist={[]}/>
          </div>
          <Sidebar />
        </main>
        <Bar/>
        <footer className="footer" />
      </div>
    </div>
  );
}