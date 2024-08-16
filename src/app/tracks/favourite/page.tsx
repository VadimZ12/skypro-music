"use client"

import Playlist from "@/components/Playlist/Playlist"
import { useAppSelector } from "@/hooks/store"
import styles from "@components/Centerblock/Centerblock.module.css";

export default function FavouriteTracksPage () {
    const tracks = useAppSelector ((state)=>state.playlist.likedTracks)

    return (
        <div>
      <h2 className={styles.centerblockH2}>Мой плейлист</h2>
      <Playlist tracks={tracks} playlist={tracks} />
    </div>
    )
}