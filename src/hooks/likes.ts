"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store";
import {
  dislikeTrack,
  getFavouriteTracks,
  likeTrack,
} from "@/store/features/playlistSlice";
import { trackType } from "@/components/types";
import { dislikeTrackFetch, likeTrackFetch } from "@/api/tracks";

export function useInitializeLikedTracks() {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.auth.tokens);
  useEffect(() => {
    if (tokens.access) {
      dispatch(getFavouriteTracks(tokens.access));
    }
  }, [tokens, dispatch]);
}

export const useLikeTrack = (track: trackType) => {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.auth.tokens);
  const likedTracks = useAppSelector((state) => state.playlist.likedTracks);
  const isLiked = likedTracks.some(
    (likedTrack) => likedTrack._id === track._id
  );
  const handleLike = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const action = isLiked ? dislikeTrackFetch : likeTrackFetch;
    try {
      await action({
        id: String(track._id),
        access: tokens?.access,
      });
      if (isLiked) {
        dispatch(dislikeTrack(track));
        console.log(likedTracks);
      } else {
        dispatch(likeTrack(track));
        console.log(likedTracks);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return { isLiked, handleLike };
};