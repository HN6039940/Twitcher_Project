import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchWord: "",
  searchType: "streamers",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchWord: (state, action) => {
      state.searchWord = action.payload;
    },
    setSearchType: (state, action) => {
      state.searchType = action.payload;
    },
  },
});

export const { setSearchWord, setSearchType } = searchSlice.actions;
export default searchSlice.reducer;
