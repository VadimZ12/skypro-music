"use client";
import { useState, useRef, useEffect, ChangeEvent } from "react";
import cn from "classnames";
import styles from "./Player.module.css";

import ProgressBar from "../ProgressBar/ProgressBar";
import { timer } from "../helper";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import {
  setIsPlaying,
  setIsShuffled,
  setNextTrack,
  setPrevTrack,
} from "@/store/features/playlistSlice";

export const Player = () => {
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const audioRef = useRef<null | HTMLAudioElement>(null);
  const dispatch = useAppDispatch();

  const isPlaying = useAppSelector((state) => state.playlist.isPlaying);
  const isShaffled = useAppSelector((state) => state.playlist.isShuffled);

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isLoop, setIsLoop] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);

  const duration = audioRef.current?.duration || 0;

  const play = () => {
    audioRef.current?.play();
    if (!isPlaying) dispatch(setIsPlaying());
  };
  // Функция для воспроизведения и паузы
  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio?.pause();
      dispatch(setIsPlaying());
    } else {
      play();
    }
  };

  //повтор трека
  const handleLoop = () => {
    setIsLoop((prev) => !prev);
    if (audioRef.current) audioRef.current.loop = !isLoop;
  };
  //отслеживаем время воспроизведения трека
  useEffect(() => {
    const audio = audioRef.current;
    const setTime = () => {
      if (audio) {
        setCurrentTime(audio.currentTime);
      }
    };
    audio?.addEventListener("timeupdate", setTime);
    audioRef.current?.play();
    return () => {
      audio?.removeEventListener("timeupdate", setTime);
    };
  }, [currentTrack]);

  //регулирование громкости
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleNext = () => {
    dispatch(setNextTrack());
  };
  const handlePrev = () => {
    dispatch(setPrevTrack());
  };
  const handleShaffled = () => {
    dispatch(setIsShuffled());
  };

  useEffect(() => {
    audioRef.current?.addEventListener("ended", handleNext);

    // Воспроизводим новый трек
    audioRef.current?.play();

    return () => {
      audioRef.current?.removeEventListener("ended", handleNext);
    };
  }, [currentTrack, audioRef]);

  if (!currentTrack) {
    return null;
  }
  return (
    <div className={styles.bar}>
      <div className={styles.bar__content}>
        <audio ref={audioRef} src={currentTrack?.track_file}></audio>
        <div className={styles.barTime}>
          {timer(currentTime)} / {timer(duration)}
        </div>
        <ProgressBar
          max={duration}
          value={currentTime}
          step={0.01}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            audioRef.current &&
            (audioRef.current.currentTime = Number(e.target.value))
          }
        />

        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div className={styles.player__btnPrev} onClick={handlePrev}>
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-prev" />
                </svg>
              </div>
              <div className={cn(styles.player__btnPlay, styles.btn)}>
                {isPlaying ? (
                  <svg
                    className={styles.player__btnPlaySvg}
                    onClick={togglePlay}
                  >
                    <use xlinkHref="img/icon/sprite.svg#icon-pause" />
                  </svg>
                ) : (
                  <svg
                    className={styles.player__btnPlaySvg}
                    onClick={togglePlay}
                  >
                    <use xlinkHref="img/icon/sprite.svg#icon-play" />
                  </svg>
                )}
              </div>
              <div className={styles.player__btnNext} onClick={handleNext}>
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-next" />
                </svg>
              </div>
              <div onClick={handleLoop} className={styles.player__btnRepeat}>
                <svg
                  className={cn(styles.player__btnRepeatSvg, {
                    [styles.activeSVG]: isLoop,
                  })}
                >
                  <use xlinkHref="img/icon/sprite.svg#icon-repeat" />
                </svg>
              </div>
              <div
                className={styles.player__btnShuffle}
                onClick={handleShaffled}
              >
                <svg
                  className={cn(styles.player__btnShuffleSvg, {
                    [styles.player__btnShuffleSvgActive]: isShaffled,
                  })}
                >
                  <use xlinkHref="img/icon/sprite.svg#icon-shuffle" />
                </svg>
              </div>
            </div>

            <div className={cn(styles.player__trackPlay, styles.trackPlay)}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-note" />
                  </svg>
                </div>
                <div className={styles.trackPlay__author}>
                  <span className={styles.trackPlay__authorLink}>
                    {currentTrack?.author}
                  </span>
                </div>
                <div className={styles.trackPlay__album}>
                  <span className={styles.trackPlay__albumLink}>
                    {currentTrack?.name}
                  </span>
                </div>
              </div>
              <div className={styles.trackPlay__likeDis}>
                <div className={cn(styles.trackPlay__like, styles.btnIcon)}>
                  <svg className={styles.trackPlay__likeSvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-like" />
                  </svg>
                </div>
                <div className={cn(styles.trackPlay__dislike, styles.btnIcon)}>
                  <svg className={styles.trackPlay__dislikeSvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-dislike" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-volume" />
                </svg>
              </div>
              <div className={cn(styles.volume__progress, styles.btn)}>
                <input
                  className={cn(styles.volume__progressLine, styles.btn)}
                  type="range"
                  name="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setVolume(Number(e.target.value))
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};