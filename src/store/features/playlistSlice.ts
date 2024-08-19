import { fetchFavouriteTracks } from "@/api/tracks";
import { trackType, userType } from "@/components/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getFavouriteTracks = createAsyncThunk(
  "playlist/getFavouriteTracks",
  async (access: string) => {
    const favouriteTracks = await fetchFavouriteTracks(access);
    return favouriteTracks;
  }
);

type PlaylistStateType = {
  user: null | userType;
  currentTrack: trackType | null;
  playlist: trackType[];
  shuffledPlaylist: trackType[];
  isShuffled: boolean;
  isPlaying: boolean;
  filterOptions: {
    author: string[];
    searchValue: string;
    genre: string[];
    order: string;
  };
  filteredTracks: trackType[];
  initialTracks: trackType[];
  likedTracks: trackType[];
};

const initialState: PlaylistStateType = {
  user: null,
  currentTrack: null,
  playlist: [],
  shuffledPlaylist: [],
  isPlaying: false,
  isShuffled: false,
  filterOptions: {
    author: [],
    searchValue: "",
    genre: [],
    order: "по умолчанию",
  },
  filteredTracks: [],
  initialTracks: [],
  likedTracks: [],
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setInitialTracks: (
      state,
      action: PayloadAction<{ initialTracks: trackType[] }>
    ) => {
      state.initialTracks = action.payload.initialTracks;
      state.filteredTracks = action.payload.initialTracks;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setCurrentTrack: (
      state,
      action: PayloadAction<{ track: trackType; tracksData: trackType[] }>
    ) => {
      state.currentTrack = action.payload.track;
      state.playlist = action.payload.tracksData;
      state.shuffledPlaylist = [...action.payload.tracksData].sort(
        () => 0.5 - Math.random()
      );
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffled
        ? state.shuffledPlaylist
        : state.playlist;
      const currentTrackIndex = playlist.findIndex(
        (track) => track._id === state.currentTrack?._id
      );
      const newTrack = playlist[currentTrackIndex + 1];
      if (newTrack) {
        state.currentTrack = newTrack;
      }
    },

    setPrevTrack: (state) => {
      const playlist = state.isShuffled
        ? state.shuffledPlaylist
        : state.playlist;
      const currentTrackIndex = playlist.findIndex(
        (track) => track._id === state.currentTrack?._id
      );
      const newTrack = playlist[currentTrackIndex - 1];
      if (newTrack) {
        state.currentTrack = newTrack;
      }
    },

    setIsShuffle: (state, action: PayloadAction<boolean>) => {
      state.isShuffled = action.payload;
    },

    setFilters: (
      state,
      action: PayloadAction<{
        author?: string[];
        searchValue?: string;
        genre?: string[];
        order?: string;
      }>
    ) => {
      state.filterOptions = {
        author: action.payload.author || state.filterOptions.author,
        genre: action.payload.genre || state.filterOptions.genre,
        order: action.payload.order || state.filterOptions.order,
        searchValue:
          typeof action.payload.searchValue === "string"
            ? action.payload.searchValue
            : state.filterOptions.searchValue,
      };
      const filteredArr = state.initialTracks.filter((track) => {
        const hasAuthors = state.filterOptions.author.length !== 0;
        const isAuthors = hasAuthors
          ? state.filterOptions.author.includes(track.author)
          : true;
        const hasGenres = state.filterOptions.genre.length !== 0;
        const isGenres = hasGenres
          ? state.filterOptions.genre.includes(track.genre)
          : true;
        const hasSearchValue =
          track.name
            .toLowerCase()
            .includes(state.filterOptions.searchValue.toLowerCase()) ||
          track.author
            .toLowerCase()
            .includes(state.filterOptions.searchValue.toLowerCase());
        return isAuthors && isGenres && hasSearchValue;
      });
      switch (state.filterOptions.order) {
        case "сначала новые":
          filteredArr.sort(
            (a, b) =>
              new Date(b.release_date).getTime() -
              new Date(a.release_date).getTime()
          );
          break;
        case "сначала старые":
          filteredArr.sort(
            (a, b) =>
              new Date(a.release_date).getTime() -
              new Date(b.release_date).getTime()
          );
          break;
        default:
          filteredArr;
          break;
      }
      state.filteredTracks = filteredArr;
    },
    likeTrack: (state, action: PayloadAction<trackType>) => {
      state.likedTracks.push(action.payload);
    },
    dislikeTrack: (state, action: PayloadAction<trackType>) => {
      state.likedTracks = state.likedTracks.filter(
        (el) => el._id !== action.payload._id
      );
    },
    setLikedTracks: (state) => {
      state.playlist = state.likedTracks;
    },
    clearLikedTracks: (state) => {
      state.likedTracks = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(
      getFavouriteTracks.fulfilled,
      (state, action: PayloadAction<trackType[]>) => {
        state.likedTracks = action.payload;
      }
    );
  },
});

export const {
  setInitialTracks,
  setCurrentTrack,
  setNextTrack,
  setPrevTrack,
  setIsShuffle,
  setIsPlaying,
  setFilters,
  likeTrack,
  dislikeTrack,
  setLikedTracks,
  clearLikedTracks,
} = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;