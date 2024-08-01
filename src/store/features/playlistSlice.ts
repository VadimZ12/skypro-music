import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TrackType } from "@/types/types";
type PlaylistStateType = {
  isPlaying: boolean;
  currentTrack: null | TrackType;
  playlist: TrackType[];
  isShuffled: boolean;
  shuffledPlaylist: TrackType[];
  filterOptions: {
    author: string[];
    genre: string[];
    order: string;
    searchString: string;
  };
  filterPlaylist: TrackType[];
};
const initialState: PlaylistStateType = {
  isPlaying: false,
  currentTrack: null,
  playlist: [],
  isShuffled: false,
  shuffledPlaylist: [],
  filterOptions: {
    author: [],
    genre: [],
    order: "По умолчанию",
    searchString: "",
  },
  filterPlaylist: [],
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
    setPlaylist: (state, action: PayloadAction<{ tracks: TrackType[] }>) => {
      state.playlist = action.payload.tracks;
      state.filterPlaylist = action.payload.tracks;
    },
    setFilter: (
      state,
      action: PayloadAction<{
        author?: string[];
        genre?: string[];
        order?: string;
        searchString?: string;
      }>
    ) => {
      state.filterOptions = {
        author: action.payload.author || state.filterOptions.author,
        genre: action.payload.genre || state.filterOptions.genre,
        order: action.payload.order || state.filterOptions.order,
        searchString:
          action.payload.searchString || state.filterOptions.searchString,
      };
      const filterTracks = [...state.playlist].filter((track) => {
        const hasSearchString = track.name
          .toLowerCase()
          .includes(state.filterOptions.searchString.toLowerCase());
        // Если выбрали фильтры по автору, то проверяем трек на совпадение этим автором
        // Если не выбрали фильтр по автору, то трек фильтровать не нужно, возвращаем true
        const hasAuthor =
          state.filterOptions.author.length > 0
            ? state.filterOptions.author.includes(track.author)
            : true;
        const hasGenre =
          state.filterOptions.genre.length > 0
            ? state.filterOptions.genre.includes(track.genre)
            : true;

        return hasSearchString && hasAuthor && hasGenre;
      });
      switch (state.filterOptions.order) {
        case "Сначала новые":
          filterTracks.sort(
            (a, b) =>
              new Date(b.release_date).getTime() -
              new Date(a.release_date).getTime()
          );
          break;
        case "Сначала старые":
          filterTracks.sort(
            (a, b) =>
              new Date(a.release_date).getTime() -
              new Date(b.release_date).getTime()
          );

        default: filterTracks
          break;
      }
      state.filterPlaylist = filterTracks;
    },
  },
});

export const {
  setCurrentTrack,
  setNextTrack,
  setIsPlaying,
  setPrevTrack,
  setIsShuffled,
  setFilter,
  setPlaylist
} = PlaylistSlice.actions;
export const playlistReducer = PlaylistSlice.reducer;