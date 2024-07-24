"use client";
import { useState, useRef, useEffect, ChangeEvent } from "react";
import cn from "classnames";
import styles from "./Player.module.css";

import ProgressBar from "../ProgressBar/ProgressBar";
import { timer } from "../helper";
import { TrackType } from "@/types/types";
type Props = {
  track: TrackType;
};
export const Player = ({ track }: Props) => {
  const audioRef = useRef<null | HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isLoop, setIsLoop] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);

  const duration = audioRef.current?.duration || 0;

  // Функция для воспроизведения и паузы
  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio?.pause();
    } else {
      audio?.play();
    }
    setIsPlaying((prev) => !prev);
  };
  //воспроизведение трека
  const play = () => {
    audioRef.current?.play();
    setIsPlaying(true);
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
    play();
    return () => {
      audio?.removeEventListener("timeupdate", setTime);
    };
  }, [track]);

  //регулирование громкости
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const alertMessage = () => {
    alert("Еще не реализовано");
  };
  return (
    <div className={styles.bar}>
      <div className={styles.bar__content}>
        <audio ref={audioRef} src={track?.track_file}></audio>
        <div className={styles.barTime}>
          {timer(currentTime)} / {timer(duration)}
        </div>
        <ProgressBar
          max={duration}
          value={currentTime}
          step={0.01}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            (audioRef.current && (audioRef.current.currentTime = Number(e.target.value)))
          }
        />

        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div className={styles.player__btnPrev} onClick={alertMessage}>
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
              <div className={styles.player__btnNext} onClick={alertMessage}>
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
              <div className={styles.player__btnShuffle} onClick={alertMessage}>
                <svg className={styles.player__btnShuffleSvg}>
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
                    {track?.author}
                  </span>
                </div>
                <div className={styles.trackPlay__album}>
                  <span className={styles.trackPlay__albumLink}>
                    {track?.name}
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