"use client";
import React, { useEffect } from "react";
import styles from "./Exit.module.css";
import { useInitializeLikedTracks } from "@/hooks/likes";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { logout } from "@/store/features/authSlice";
import { clearLikedTracks } from "@/store/features/playlistSlice";

const Exit = () => {
  const dispatch = useAppDispatch();
  useInitializeLikedTracks();

  const userName = useAppSelector((state) => state.auth.user?.username);

  if (!userName) {
    return null;
  }
  const exitLogout = () => {
    dispatch(logout());
    dispatch(clearLikedTracks());
  };
  return (
    <div>
      <div className={styles.sidebar__personal}>
        <p className={styles.sidebar__personalName}>{userName}</p>
        <div className={styles.sidebar__icon} onClick={exitLogout}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#logout" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Exit;