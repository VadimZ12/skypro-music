"use client";
import Link from "next/link";
import styles from "./Bar.module.css";
import classNames from "classnames";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import {
  setIsShuffle,
  setNextTrack,
  setPrevTrack,
  setIsPlaying,
} from "@/store/features/playlistSlice";
import { formatDurationInMin } from "@/lib/formatDuration";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import LikeTrackComponent from "../LikeTrackComponent/LikeTrackComponent";

export default function Bar() {
  const dispatch = useAppDispatch();
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const audioRef = useRef<null | HTMLAudioElement>(null);

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isLoop, setIsLoop] = useState<boolean>(false);
  const [volume, setVolume] = useState(0.5);
  const isPlaying = useAppSelector((state) => state.playlist.isPlaying);
  const isShuffled = useAppSelector((state) => state.playlist.isShuffled);

  const duration = audioRef.current?.duration;

  const togglePlay = () => {
    if (audioRef.current) {
      {
        dispatch(setIsPlaying(!isPlaying));
      }
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    audioRef.current?.play();
    dispatch (setIsPlaying(true));
  }, [currentTrack]);

  const toogleLoop = () => {
    if (audioRef.current) {
      if (isLoop) {
        audioRef.current.loop = false;
      } else {
        audioRef.current.loop = true;
      }

      setIsLoop((repeat) => !repeat);
    }
  };

  const handleSeek = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      setCurrentTime(Number(event.target.value));
      audioRef.current.currentTime = Number(event.target.value);
    }
  }, [audioRef.current]);

  useEffect(() => {
    audioRef.current?.addEventListener("timeupdate", () =>
      setCurrentTime(audioRef.current!.currentTime)
    );
  }, [currentTrack]);


  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const changeVolume = (event: ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.target.value));
  };

  const handleEnded = () => {
    dispatch(setNextTrack());
  };

  useEffect(() => {
    const audio = audioRef.current;
    audio?.addEventListener("ended", handleEnded);

    // Воспроизводим новый трек
    audio?.play();

    return () => {
      audio?.removeEventListener("ended", handleEnded);
    };
  }, [dispatch, audioRef.current]);

  const handleShuffle = () => {
    if (isShuffled) {
      dispatch(setIsShuffle(false));
    } else {
      dispatch(setIsShuffle(true));
    }
  };


  return (
    <>
      {currentTrack && (
        <div className={styles.bar}>
          <div className={styles.barContent}>
            <audio
              autoPlay
              ref={audioRef}
              src={currentTrack.track_file}
              onChange={handleEnded}
            ></audio>
            <div className={styles.trackTime}>
              <div>
                {formatDurationInMin(currentTime)}/
                {formatDurationInMin(currentTrack.duration_in_seconds)}
              </div>
            </div>
            <ProgressBar
              max={duration}
              value={currentTime}
              step={0.01}
              onChange={handleSeek}
            />
            <div className={styles.barPlayerBlock}>
              <div className={styles.barPlayer}>
                <div className={styles.playerControls}>
                  <div
                    onClick={() => dispatch(setPrevTrack())}
                    className={styles.playerBtnPrev}
                  >
                    <svg className={styles.playerBtnPrevSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-prev" />
                    </svg>
                  </div>
                  <div
                    onClick={togglePlay}
                    className={classNames(styles.playerBtnPlay, styles._btn)}
                  >
                    <svg className={styles.playerBtnPlaySvg}>
                      <use
                        xlinkHref={`/img/icon/sprite.svg#${
                          isPlaying ? "icon-pause" : "icon-play"
                        }`}
                      />
                    </svg>
                  </div>
                  <div
                    onClick={() => dispatch(setNextTrack())}
                    className={styles.playerBtnNext}
                  >
                    <svg className={styles.playerBtnNextSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-next" />
                    </svg>
                  </div>
                  <div
                    onClick={toogleLoop}
                    className={classNames(
                      styles.playerBtnRepeat,
                      styles.btnIcon
                    )}
                  >
                    <svg
                      className={classNames(styles.playerBtnRepeatSvg, {
                        [styles.playerBtnRepeatSvgActive]: isLoop,
                      })}
                    >
                      <use xlinkHref={`/img/icon/sprite.svg#icon-repeat`} />
                    </svg>
                  </div>
                  <div
                    onClick={handleShuffle}
                    className={classNames(
                      styles.playerBtnShuffle,
                      styles.btnIcon
                    )}
                  >
                    <svg
                      className={classNames(styles.playerBtnShuffleSvg, {
                        [styles.playerBtnShuffleSvgActive]: isShuffled,
                      })}
                    >
                      <use xlinkHref="/img/icon/sprite.svg#icon-shuffle" />
                    </svg>
                  </div>
                </div>
                <div className={styles.playerTrackPlay}>
                  <div className={styles.trackPlayContain}>
                    <div className={styles.trackPlayImage}>
                      <svg className={styles.trackPlaySvg}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-note" />
                      </svg>
                    </div>
                    <div className={styles.trackPlayAuthor}>
                      <Link
                        className={styles.trackPlayAuthorLink}
                        href="http://"
                      >
                        {currentTrack.name}
                      </Link>
                    </div>
                    <div className={styles.trackPlayAlbum}>
                      <Link
                        className={styles.trackPlayAlbumLink}
                        href="http://"
                      >
                        {currentTrack.author}
                      </Link>
                    </div>
                  </div>
                  <LikeTrackComponent currentTrack={currentTrack}/>
                  {/* <div className={styles.trackPlayLikeDis}>
                    <div
                      className={classNames(
                        styles.trackPlayLike,
                        styles.btnIcon
                      )}
                    >
                      <svg className={styles.trackPlayLikeSvg}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-like" />
                      </svg>
                    </div>
                    <div
                      className={classNames(
                        styles.trackPlayDislike,
                        styles.btnIcon
                      )}
                    >
                      <svg className={styles.trackPlayDislikeSvg}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-dislike" />
                      </svg>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className={styles.barVolumeBlock}>
                <div className={styles.volumeContent}>
                  <div className={styles.volumeImage}>
                    <svg className={styles.volumeSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-volume" />
                    </svg>
                  </div>
                  <div
                    className={classNames(styles.volumeProgress, styles._btn)}
                  >
                    <input
                      className={classNames(
                        styles.volumeProgressLine,
                        styles._btn
                      )}
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={changeVolume}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}