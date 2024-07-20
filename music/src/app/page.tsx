import styles from "./page.module.css";
import AudioPlayer from "@/components/audioPlayer/audioPlayer";
import Sidebar from "@/components/sidebar/sidebar";
import NawMenu from "@/components/navMenu/navMenu";
import Centerblock from "@/components/centerblock/centerBlock";

export default function Home() {
  return (
    <body>
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
         <NawMenu/>
        <Centerblock/>
         <Sidebar/>
        </main>
       <AudioPlayer/>
        <footer className={styles.footer}></footer>
      </div>
    </div>
    </body>
  );
}
