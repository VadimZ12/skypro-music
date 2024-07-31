import styles from "./Main.module.css";
import { Menu } from "../Menu/Menu";
import { Centerblock } from "../Centerblock/Centerblock";
import { Sidebar } from "../Sidebar/Sidebar";
import { Player } from "../Player/Player";
import { TrackType } from "@/types/types";

export type Props = {
  tracks: TrackType[];
};
export const Main = ({ tracks }: Props) => {
  // const [track, setTrack] = useState<null | TrackType>(null);
  const uniqueAuthors = Array.from(
    new Set(tracks.map((track) => track.author))
  );
  const uniqueGenre = Array.from(new Set(tracks.map((track) => track.genre)));
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Menu />
          <Centerblock
            tracks={tracks}
            uniqueAuthors={uniqueAuthors}
            uniqueGenre={uniqueGenre}
          />
          <Sidebar />
        </main>
        <Player />
        <footer className={styles.footer} />
      </div>
    </div>
  );
};