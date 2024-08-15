"use client";
import { Centerblock } from "@/components/Centerblock/Centerblock";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { setPlaylist } from "@/store/features/playlistSlice";
import Link from "next/link";

export default function FavoriteTrackPage() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const logged = useAppSelector((state) => state.auth.tokens.access);
  const tracks = useAppSelector((state) => state.playlist.likedTracks);
  const filterTracks = useAppSelector((state) => state.playlist.filterPlaylist);
  useEffect(() => {
    dispatch(setPlaylist({ tracks: tracks })), console.log(tracks);
    setIsLoading(false);
  }, [dispatch, tracks]);

  return (
    <div className={styles.mainCenterblock}>
      {logged ? (
        <>
          <h2 className={styles.centerblockH2}>Мой плейлист</h2>{" "}
          <Centerblock tracks={filterTracks} />{" "}
          {isLoading
          ? "Загрузка"
          : filterTracks.length === 0
          ? "Треки не найдены"
          : null}
        </>
      ) : (
        <Link href={"/signin"} className={styles.link}>
          Необходимо авторизоваться
        </Link>
      )}
    </div>
  );
}