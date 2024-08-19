"use client";
import classNames from "classnames";
import Track from "../Track/Track";
import styles from "./Playlist.module.css";
import { getTracks } from "@/api/tracks";
import { trackType } from "../types";
import { useEffect, useState } from "react";

export default function Playlist({
  tracks,
  playlist,
}: {
  tracks: trackType[];
  playlist: trackType[];
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTracks().then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div className={styles.centerblockContent}>
        <div className={styles.contentTitle}>
          <div className={classNames(styles.playlistTitleCol, styles.col01)}>
            Трек
          </div>
          <div className={classNames(styles.playlistTitleCol, styles.col02)}>
            Исполнитель
          </div>
          <div className={classNames(styles.playlistTitleCol, styles.col03)}>
            Альбом
          </div>
          <div className={classNames(styles.playlistTitleCol, styles.col04)}>
            <svg className={styles.playlistTitleSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch" />
            </svg>
          </div>
        </div>
        <div className={styles.contentPlaylist}>
          {loading
            ? "Идёт загрузка"
            : tracks?.length
            ? tracks?.map((track) => (
                <Track key={track._id} track={track} tracksData={playlist} />
              ))
            : "Ничего не найдено"}
        </div>
      </div>
    </>
  );
}