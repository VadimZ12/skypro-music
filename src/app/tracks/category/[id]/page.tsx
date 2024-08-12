"use client";
import { playlistCategory } from "@/api/playlistCategory";
import { Centerblock } from "@/components/Centerblock/Centerblock";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { setPlaylist } from "@/store/features/playlistSlice";
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
type CategoryProps = {
  params: {
    id: string;
  };
};
const Category = ({ params }: CategoryProps) => {
  const dispatch = useAppDispatch();
  const filterTracks = useAppSelector((store) => store.playlist.filterPlaylist);
  useEffect(() => {
    playlistCategory(params.id)
      .then((response) => {
        console.log(response);
        dispatch(setPlaylist({ tracks: response.items }));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [dispatch, params.id]);
  let title = "";
  switch (params.id) {
    case "1":
      title = "Плейлист дня";
      break;
    case "2":
      title = "100 танцевальных хитов";
      break;
    case "3":
      title = "Инди-заряд";
      break;
    default:
      break;
  }
  return (
    <div className={styles.mainCenterblock}>
      <h2 className={styles.heading}>{title}</h2>
      <Centerblock tracks={filterTracks} />
    </div>
  );
};

export default Category;