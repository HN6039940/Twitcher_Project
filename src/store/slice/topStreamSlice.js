import { createSlice } from "@reduxjs/toolkit";

const initlialState = {
  topStreams: [],
};

const topStreamSlice = createSlice({
  name: "topStreams",
  initialState: initlialState,
  reducers: {
    setTopStreams: (state, action) => {
      // streamのAPIから取得したデータの場合channelを探すAPIで必要だったプロパティ名の変換は不要なので、そのままstateに格納できる。
      // しかし、ユーザのプロフィール画像を利用するには、topStreamsInJpのデータにtargetStreamDataのprofile_image_urlの値を結合する必要がある。
      const [topStreamDataInJp, targetStreamData] = action.payload;
      const topStreamData = topStreamDataInJp.data.map((stream) => {
        return {
          ...stream,
          user_image_url:
            targetStreamData.data.find((data) => data.id === stream.user_id)
              ?.profile_image_url || "",
        };
      });
      state.topStreams = topStreamData;
    },
  },
});

export const { setTopStreams } = topStreamSlice.actions;

export default topStreamSlice.reducer;
