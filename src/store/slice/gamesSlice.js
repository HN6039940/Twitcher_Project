import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gamesSearchWord: "",
  games: [],
  pagination: "",
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setGames: (state, action) => {
      state.games = action.payload;
    },
    setGamesSearchWord: (state, action) => {
      state.gamesSearchWord = action.payload;
    },
    setPagination: (state, action) => {
      state.pagenation = action.payload;
    },
  },
});

export const { setGamesSearchWord, setGames, setPagination } =
  gamesSlice.actions;
export default gamesSlice.reducer;
