"use client";
import { useState, useRef, useEffect } from "react";
import cn from "classnames";
import styles from "./Player.module.css";
import { Props } from "@/types/types";
import ProgressBar from "../ProgressBar/ProgressBar";
import { timer } from "../helper";

export const Player = ({ tracks }: Props) => {
  const audioRef = useRef<null | HTMLAudioElement>(null);

  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isLoop, setIsLoop] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);

  const duration = audioRef.current?.duration || 0;

  
 
  // Функция для воспроизведения и паузы
  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying((prev) => !prev);
    
  };
  const play = () => {
    audioRef.current?.play();
  };
  const handleEnded = () => {
    // Проверяем, не является ли текущий трек последним в плейлисте
    if (currentTrackIndex < tracks.length - 1) {
      // Переход к следующему треку
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      // Или начинаем плейлист с начала
      setCurrentTrackIndex(0);
    }
  };

  const handleLoop = () => {
    setIsLoop((prev) => !prev);
    audioRef.current.loop = !isLoop;
  };
  // Устанавливаем источник аудио и обработчик события `ended` при изменении трека
  useEffect(() => {
    //audioRef.current.src = tracks[currentTrackIndex].track_file;
    audioRef.current?.addEventListener("ended", handleEnded);

    // Воспроизводим новый трек
    audioRef.current.play();
    return () => {
      audioRef.current.removeEventListener("ended", handleEnded);
    };
  }, [currentTrackIndex, tracks]);

  useEffect(() => {
    if (isLoop) {
      audioRef.current.addEventListener("ended", play);
    } else {
      audioRef.current.removeEventListener("ended", play);
    }
  }, [isLoop]);
  useEffect(() => {
    audioRef.current?.addEventListener("timeupdate", () =>
      setCurrentTime(audioRef.current!.currentTime)
    );
    play();
  }, []);
  //регулирование громкости
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
const alertMessage = () => {
  alert("Еще не реализовано");
}
  return (
    <div className={styles.bar}>
      <div className={styles.bar__content}>
        <audio
          ref={audioRef}
          src={tracks[currentTrackIndex].track_file}
        ></audio>
        <div className={styles.barTime}>
          {timer(currentTime)} / {timer(duration)}
        </div>
        <ProgressBar
          max={duration}
          value={currentTime}
          step={0.01}
          onChange={(e) =>
            (audioRef.current.currentTime = Number(e.target.value))
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
              <div
                className={cn(styles.player__btnPlay, styles.btn)}
                
              >
                {isPlaying ? (
                  <svg className={styles.player__btnPlaySvg} onClick={togglePlay}>
                    <use xlinkHref="img/icon/sprite.svg#icon-pause" />
                  </svg>
                ) : (
                  <svg className={styles.player__btnPlaySvg} onClick={togglePlay}>
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
                  <a className={styles.trackPlay__authorLink} href="http://">
                    Ты та...
                  </a>
                </div>
                <div className={styles.trackPlay__album}>
                  <a className={styles.trackPlay__albumLink} href="http://">
                    Баста
                  </a>
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
                  onChange={(e) => setVolume(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};