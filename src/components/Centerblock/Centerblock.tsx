"use client";
import cn from "classnames";
import styles from "./Centerblock.module.css";
import { Filters } from "../Filters/Filters";
import { TrackType } from "@/types/types";
import { timer } from "../helper";
type Props = {
  tracks: TrackType[];
  setTrack: (value: TrackType) => void;
  uniqueAuthors: string[];
  uniqueGenre: string[];
};
export const Centerblock = ({
  uniqueAuthors,
  uniqueGenre,
  tracks,
  setTrack,
}: Props) => {
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
          {tracks.map((value, index: number) => {
            return (
              <div
                className={styles.playlist__item}
                key={index}
                onClick={() => setTrack(value)}
              >
                <div className={styles.playlist__track}>
                  <div className={styles.track__title}>
                    <div className={styles.track__titleImage}>
                      <svg className={styles.track__titleSvg}>
                        <use xlinkHref="img/icon/sprite.svg#icon-note" />
                      </svg>
                    </div>
                    <div className={styles.track__titleText}>
                      <span className={styles.track__titleLink}>
                        {value.name}
                        <span className={styles.track__titleSpan} />
                      </span>
                    </div>
                  </div>
                  <div className={styles.track__author}>
                    <span className={styles.track__authorLink}>
                      {value.author}
                    </span>
                  </div>
                  <div className={styles.track__album}>
                    <span className={styles.track__albumLink}>
                      {value.album}
                    </span>
                  </div>
                  <div className={styles.track__time}>
                    <svg className={styles.track__timeSvg}>
                      <use xlinkHref="img/icon/sprite.svg#icon-like" />
                    </svg>
                    <span className={styles.track__timeText}>
                      {timer(value.duration_in_seconds)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};