import styles from "./Main.module.css";
import { Menu } from "../Menu/Menu";
import { Centerblock } from "../Centerblock/Centerblock";
import { Sidebar } from "../Sidebar/Sidebar";
import { Player } from "../Player/Player";
import { TrackType } from "@/types/types";
import { getTracks } from "@/api/track";

export const Main = async () => {
  const tracks: TrackType[] = await getTracks();
  const uniqueAuthors = Array.from(
    new Set(tracks.map((track) => track.author))
  );
  const uniqueGenre = Array.from(new Set(tracks.map((track) => track.genre)));
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Menu />
          <Centerblock tracks={tracks} uniqueAuthors={uniqueAuthors} uniqueGenre={uniqueGenre} />
          <Sidebar />
        </main>
        <Player tracks={tracks} />
        <footer className={styles.footer} />
      </div>
    </div>
  );
};