import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  streamerSearchWord: "",
  streamers: [],
  pagination: "",
};

const streamerSlice = createSlice({
  name: "streamer",
  initialState: initialState,
  reducers: {
    setStreamers: (state, action) => {
      const searchStreamerResult = action.payload.map((streamer) => {
        const {
          display_name,
          game_name,
          tags,
          thumbnail_url,
          title,
          started_at,
          broadcaster_login,
          id,
        } = streamer;
        return {
          display_name,
          game_name,
          tags,
          thumbnail_url,
          title,
          started_at,
          user_login: broadcaster_login,
          user_id: id,
        };
      });
      state.streamers = searchStreamerResult;
    },
    setStreamerSearchWord: (state, action) => {
      state.streamerSearchWord = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
  },
});

export const { setStreamerSearchWord, setStreamers, setPagination } =
  streamerSlice.actions;
export default streamerSlice.reducer;