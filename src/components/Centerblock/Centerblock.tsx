"use client";
import cn from "classnames";
import styles from "./Centerblock.module.css";
import { TrackType } from "@/types/types";
import Track from "../Track/Track";

type Props = {
  tracks: TrackType[];
 };
export const Centerblock = ({ tracks}: Props) => {
  return (
    <div className={styles.centerblock}>
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
          {tracks?.map((value) => {
            return <Track track={value} tracks={tracks} key={value.id} />;
          })}
        </div>
      </div>
    </div>
  );
};