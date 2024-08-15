"use client";
import { Centerblock } from "@/components/Centerblock/Centerblock";
import { Filters } from "@/components/Filters/Filters";
import React, { useEffect, useState } from "react";
import styles from "./layout.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { setPlaylist } from "@/store/features/playlistSlice";
import { getTracks } from "@/api/track";
import { Sidebar } from "@/components/Sidebar/Sidebar";

const MainTracksPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const filterTracks = useAppSelector((store) => store.playlist.filterPlaylist);
  const tracks = useAppSelector((store) => store.playlist.playlist);
  useEffect(() => {
    getTracks().then((tracksData) => {
      dispatch(setPlaylist({ tracks: tracksData }));
      setIsLoading(false);
    });
  }, [dispatch]);
  return (
    <>
      <div className={styles.mainCenterblock}>
        <h2 className={styles.heading}>Треки</h2>
        <Filters tracks={tracks} />
        <Centerblock tracks={filterTracks} />
        {isLoading
          ? "Загрузка"
          : filterTracks.length === 0
          ? "Треки не найдены"
          : null}
      </div>
      <Sidebar />
    </>
  );
};

export default MainTracksPage;