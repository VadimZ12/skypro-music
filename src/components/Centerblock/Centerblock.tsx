"use client";
import cn from "classnames";
import styles from "./Centerblock.module.css";
import { Filters } from "../Filters/Filters";
import { TrackType } from "@/types/types";
import Track from "../Track/Track";
type Props = {
  tracks: TrackType[];
  uniqueAuthors: string[];
  uniqueGenre: string[];
};
export const Centerblock = ({ uniqueAuthors, uniqueGenre, tracks }: Props) => {
  return (
    <div className={styles.centerblock}>
      <div className={styles.search}>
        <svg className={styles.search__svg}>
          <use xlinkHref="img/icon/sprite.svg#icon-search" />
        </svg>
        <input
          className={styles.search__text}
          type="search"
          placeholder="Поиск"
          name="search"
        />
      </div>
      <h2 className={styles.heading}>Треки</h2>

      <Filters uniqueAuthors={uniqueAuthors} uniqueGenre={uniqueGenre} />
      <div className={styles.content}>
        <div className={styles.content__title}>
          <div className={cn(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={cn(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={cn(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={cn(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="img/icon/sprite.svg#icon-watch" />
            </svg>
          </div>
        </div>
        <div className={styles.content__playlist}>
          {tracks.map((value) => {
            return <Track track={value} tracks={tracks} key={value.id} />;
          })}
        </div>
      </div>
    </div>
  );
};