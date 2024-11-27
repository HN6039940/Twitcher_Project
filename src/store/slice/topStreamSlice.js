import { createSlice } from "@reduxjs/toolkit";

const initlialState = {
  topStreams: [],
};

const topStreamSlice = createSlice({
  name: "topStreams",
  initialState: initlialState,
  reducers: {
    setTopStreams: (state, action) => {
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
