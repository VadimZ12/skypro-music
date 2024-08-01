"use client";
import React from "react";
import styles from "./Track.module.css";
import cn from "classnames";
import { TrackType } from "@/types/types";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { setCurrentTrack, setIsPlaying } from "@/store/features/playlistSlice";
import { timer } from "../helper";
type Props = {
  track: TrackType;
  tracks: TrackType[];
};
const Track = ({ track, tracks }: Props) => {
  const dispatch = useAppDispatch();
  const { name, author, album, duration_in_seconds } = track;
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const isCurrentTrack = currentTrack?.id === track.id;
  const isPlaying = useAppSelector((state) => state.playlist.isPlaying);
  const handleTrackClick = () => {
    dispatch(setCurrentTrack({ currentTrack: track, tracks }));
    if (!isPlaying) dispatch(setIsPlaying());
    console.log(isPlaying);
  };

  return (
    <div className={styles.playlist__item} onClick={handleTrackClick}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            {isCurrentTrack ? (
              <div
                className={cn(styles.playingDot, {
                  [styles.playingDotActive]: isPlaying,
                })}
              ></div>
            ) : (
              <svg className={cn(styles.track__titleSvg)}>
                <use xlinkHref="img/icon/sprite.svg#icon-note" />
              </svg>
            )}
          </div>
          <div className={styles.track__titleText}>
            <span className={styles.track__titleLink}>
              {name}
              <span className={styles.track__titleSpan} />
            </span>
          </div>
        </div>
        <div className={styles.track__author}>
          <span className={styles.track__authorLink}>{author}</span>
        </div>
        <div className={styles.track__album}>
          <span className={styles.track__albumLink}>{album}</span>
        </div>
        <div className={styles.track__time}>
          <svg className={styles.track__timeSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-like" />
          </svg>
          <span className={styles.track__timeText}>
            {timer(duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Track;