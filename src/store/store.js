import { configureStore } from "@reduxjs/toolkit";

import searchReducer from "./slice/searchSlice";
import gamesReducer from "./slice/gamesSlice";
import gameStreamReducer from "./slice/gameStreamSlice";
import streamerReducer from "./slice/streamerSlice";
import setStreamSlice from "./slice/setStreamSlice";
import topStreams from "./slice/topStreamSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    games: gamesReducer,
    gameStream: gameStreamReducer,
    streamer: streamerReducer,
    setStream: setStreamSlice,
    topStreams: topStreams,
  },
});
