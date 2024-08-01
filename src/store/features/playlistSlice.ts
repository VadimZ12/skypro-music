import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TrackType } from "@/types/types";
type PlaylistStateType = {
  isPlaying: boolean;
  currentTrack: null | TrackType;
  playlist: TrackType[];
  isShuffled: boolean;
  shuffledPlaylist: TrackType[];
};
const initialState: PlaylistStateType = {
  isPlaying: false,
  currentTrack: null,
  playlist: [],
  isShuffled: false,
  shuffledPlaylist: [],
};

const PlaylistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setCurrentTrack: (
      state,
      action: PayloadAction<{ currentTrack: TrackType; tracks: TrackType[] }>
    ) => {
      state.currentTrack = action.payload.currentTrack;
      state.playlist = action.payload.tracks;
      state.shuffledPlaylist = [...action.payload.tracks].sort(
        () => 0.5 - Math.random()
      );
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffled
        ? state.shuffledPlaylist
        : state.playlist;
      const currentIndex = playlist.findIndex(
        (playlist) => playlist.id === state.currentTrack?.id
      );
      const nextIndex = currentIndex + 1;
      if (nextIndex <= playlist.length - 1) {
        state.currentTrack = playlist[nextIndex];
      }
    },
    setPrevTrack: (state) => {
      const playlist = state.isShuffled
        ? state.shuffledPlaylist
        : state.playlist;
      const currentIndex = playlist.findIndex(
        (playlist) => playlist.id === state.currentTrack?.id
      );
      const prevIndex = currentIndex - 1;
      if (prevIndex >= 0) {
        state.currentTrack = playlist[prevIndex];
      }
    },

    setIsPlaying: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setIsShuffled: (state) => {
      state.isShuffled = !state.isShuffled;
    },
  },
});

export const {
  setCurrentTrack,
  setNextTrack,
  setIsPlaying,
  setPrevTrack,
  setIsShuffled,
} = PlaylistSlice.actions;
export const playlistReducer = PlaylistSlice.reducer;