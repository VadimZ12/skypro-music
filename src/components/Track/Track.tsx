"use client";
import styles from "./Track.module.css";
import { trackType } from "../types";
import { setCurrentTrack, setIsPlaying } from "@/store/features/playlistSlice";
import { formatDurationInMin } from "@/lib/formatDuration";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { useLikeTrack } from "@/hooks/likes";

type TrackType = {
  track: trackType;
  tracksData: trackType[];
};

export default function Track({ track, tracksData }: TrackType) {
  const { isLiked, handleLike } = useLikeTrack(track);
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const { name, author, album, duration_in_seconds, _id } = track;
  const isPlaying = useAppSelector((state) => state.playlist.isPlaying);

  const dispatch = useAppDispatch();

  const handleTrackClick = () => {
    dispatch(setCurrentTrack({ track, tracksData }));
  };

  return (
    <div onClick={handleTrackClick} className={styles.playlistItem}>
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            {currentTrack?._id === _id ? (
              isPlaying ? (
                <svg className={styles.playingDotActive}></svg>
              ) : (
                <svg className={styles.playingDot}></svg>
              )
            ) : (
              <svg className={styles.trackTitleSvg}>
                <use xlinkHref={"/img/icon/sprite.svg#icon-note"} />
              </svg>
            )}
          </div>
          <div className={styles.trackTitleText}>
            <span className={styles.trackTitleLink}>
              {name} <span className={styles.trackTitleSpan} />
            </span>
          </div>
        </div>
        <div className={styles.trackAuthor}>
          <span className={styles.trackAuthorLink}>{author}</span>
        </div>
        <div className={styles.trackAlbum}>
          <span className={styles.trackAlbumLink}>{album}</span>
        </div>
        <div onClick={handleLike} className={styles.trackTime}>
          <svg className={styles.trackTimeSvg}>
          <use xlinkHref={`/img/icon/sprite.svg#${isLiked ? "icon-like" : "icon-dislike"}`} />
          </svg>
          <span className={styles.trackTimeText}>
            {formatDurationInMin(duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}