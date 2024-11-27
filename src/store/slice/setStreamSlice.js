import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  streamsData: [],
  streamsKeys: [],
};

const streamSlice = createSlice({
  name: "stream",
  initialState,
  reducers: {
    setStreamData: (state, action) => {
      const { user_name, user_login, title, user_id } = action.payload;
      state.streamsData = [
        ...state.streamsData,
        { user_name, user_login, user_id, title },
      ];
    },
    deleteStreamData: (state, action) => {
      const { user_id } = action.payload;
      state.streamsData = state.streamsData.filter(
        (stream) => stream.user_id !== user_id
      );
    },
    createStreamKeys: (state) => {
      const streamKeys = state.streamsData.map((stream) => stream.user_login);
      state.streamsKeys = streamKeys;
    },
    deleteStreamKeys: (state, action) => {
      const { user_login } = action.payload;
      state.streamsKeys = state.streamsKeys.filter(
        (currentKey) => currentKey !== user_login
      );
    },
  },
});

export const {
  setStreamData,
  deleteStreamData,
  createStreamKeys,
  deleteStreamKeys,
} = streamSlice.actions;

export default streamSlice.reducer;
