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
      // ストリームの作成に必要なプロパティをaction.payloadから取得
      const { user_name, user_login, title, user_id } = action.payload;
      // streamsDataに新しいストリームを追加
      state.streamsData = [
        ...state.streamsData,
        { user_name, user_login, user_id, title },
      ];
    },
    deleteStreamData: (state, action) => {
      // ストリームを削除する場合は、user_idをaction.payloadが必要
      const { user_id } = action.payload;
      state.streamsData = state.streamsData.filter(
        (stream) => stream.user_id !== user_id
      );
    },
    createStreamKeys: (state) => {
      // ストリームを生成するのにuser_loginを利用する。
      // streamsDataからuser_loginを取得
      const streamKeys = state.streamsData.map((stream) => stream.user_login);
      state.streamsKeys = streamKeys;
    },
    deleteStreamKeys: (state, action) => {
      // ストリームを削除する場合は、user_loginが必要
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
