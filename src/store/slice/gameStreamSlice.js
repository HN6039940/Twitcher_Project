import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gameStreams: [],
  searchGameId: null,
  searchGameName: null,
  pagination: null,
};

const gameStreamsSlice = createSlice({
  name: "gameStreams",
  initialState,
  reducers: {
    setGameStreams: (state, action) => {
      const newStreamsArray = action.payload.data.map((data) => {
        return {
          id: data.id,
          user_id: data.user_id,
          user_name: data.user_name,
          user_login: data.user_login,
          game_id: data.game_id,
          type: data.type,
          title: data.title,
          viewer_count: data.viewer_count,
          started_at: data.started_at,
          thumbnail_url: data.thumbnail_url,
          tags: data.tags,
        };
      });

      state.gameStreams = newStreamsArray;
    },
    setSearchGameId: (state, action) => {
      state.searchGameId = action.payload;
    },
    setSearchGameName: (state, action) => {
      state.searchGameName = action.payload;
    },
  },
});

export const { setGameStreams, setSearchGameId, setSearchGameName } =
  gameStreamsSlice.actions;

export default gameStreamsSlice.reducer;
