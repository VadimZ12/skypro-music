import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store";
import {
  disLikeTrack,
  getFavoriteTracks,
  likeTrack,
} from "@/store/features/playlistSlice";
import { TrackType } from "@/types/types";
import { setDisLike, setLike } from "@/api/like";

export function useInitializeLikedTracks() {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.auth.tokens);
  useEffect(() => {
    if (tokens.access) {
      dispatch(getFavoriteTracks(tokens.access));
    }
  }, [tokens, dispatch]);
}

export const useLikeTrack = (track: TrackType | null) => {
  const dispatch = useAppDispatch();
  const likedTracks = useAppSelector((state) => state.playlist.likedTracks);
  const isLiked = !!likedTracks.find((t) => t._id === track?._id);
  const tokens = useAppSelector((state) => state.auth.tokens);
  const handleLike = async (
    
     e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
     e.stopPropagation();
    if (!tokens.access) {
      return alert("Пожалуйста, авторизуйтесь.");
    }
    const action = isLiked ? setDisLike : setLike;
    console.log(track)
    try {
      await action(tokens.access, track?._id);
      isLiked ? dispatch(disLikeTrack(track)) : dispatch(likeTrack(track));
    } catch (error) {
      console.error(error);
    }
  };
  return { isLiked, handleLike };
};