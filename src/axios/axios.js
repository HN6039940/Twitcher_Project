import axios from "axios";

const getChannelUrl = "https://api.twitch.tv/helix/search/channels";
const getCategoryUrl = "https://api.twitch.tv/helix/search/categories";
const getGameUrl = "https://api.twitch.tv/helix/games";
const getStreamUrl = "https://api.twitch.tv/helix/streams";
const getUserUrl = "https://api.twitch.tv/helix/users";

const header = {
  "Client-Id": import.meta.env.VITE_API_CLIENT_KEY,
  Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
};

// search twitch streamers live only users
export const getChannel = async (searchWord) => {
  if (searchWord === "") {
    return [];
  }
  try {
    const response = await axios.get(
      `${getChannelUrl}?query=${searchWord}&live_only=true`,
      {
        headers: header,
      }
    );

    const data = await response.data;

    return data;
  } catch (error) {
    return [];
  }
};

// search twitch categories and get gameID
export const getGameId = async (searchWord) => {
  if (searchWord === "") {
    return [];
  }
  try {
    const response = await axios.get(`${getCategoryUrl}?query=${searchWord}`, {
      headers: header,
    });

    const data = await response.data;
    return data;
  } catch (error) {
    return [];
  }
};

// search twitch game titles
export const getGame = async (gameID) => {
  try {
    const response = await axios.get(`${getGameUrl}?id=${gameID}`, {
      headers: header,
    });

    const data = await response.data;
    return data;
  } catch (error) {
    return [];
  }
};

// search twitch games played by a specific streamer
export const getGameStream = async (gameID) => {
  try {
    const response = await axios.get(
      `${getStreamUrl}?game_id=${gameID}&language=ja&type=live`,
      {
        headers: header,
      }
    );
    return response;
  } catch (error) {
    return [];
  }
};

// search twitch popular streams in Japan

export const getPopularStream = async () => {
  try {
    const streamResponse = await axios.get(
      `${getStreamUrl}?language=ja&type=live&first=10`,
      {
        headers: header,
      }
    );
    const topStreamDataInJP = await streamResponse.data;
    const userIdQuery = topStreamDataInJP.data
      .map((stream) => stream.user_id)
      .join("&id=");

    const streamerResponse = await axios.get(
      `${getUserUrl}?id=${userIdQuery}`,
      {
        headers: header,
      }
    );
    return [streamResponse, streamerResponse];
  } catch (error) {
    return [];
  }
};

// test twitch api
// export const testFetch = async () => {
//   try {
//     const response = await axios.get(
//       "https://api.twitch.tv/helix/users?login=twitchdev",
//       {
//         headers: {
//           "Client-Id": import.meta.env.VITE_API_CLIENT_KEY,
//           Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
//         },
//       }
//     );
//     const data = await response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };
