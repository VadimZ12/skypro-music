"use client";
import Playlist from "@/components/Playlist/Playlist";
import { useEffect, useState } from "react";
import { trackType } from "@/components/types";
import { getTracks } from "@/api/tracks";
import { setInitialTracks } from "@/store/features/playlistSlice";
import Filter from "@/components/Filters/Filters";
import styles from "@components/Centerblock/Centerblock.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/store";

export default function MainTrackPage() {
  const dispatch = useAppDispatch();
  const [tracks, setTracks] = useState<trackType[]>([]);
  const filteredTracks = useAppSelector(
    (state) => state.playlist.filteredTracks
  );

  useEffect(() => {
    getTracks().then((tracksData) => {
      setTracks(tracksData);
      dispatch(setInitialTracks({ initialTracks: tracksData }));
    });
  }, [dispatch]);
  return (
    <>
    <h2 className={styles.centerblockH2}>Треки</h2>
      <Filter />
      <Playlist tracks={filteredTracks} playlist={tracks} />
    </>
  );
}