import axios from "axios";

// APIのエンドポイント
const getChannelUrl = "https://api.twitch.tv/helix/search/channels";
const getCategoryUrl = "https://api.twitch.tv/helix/search/categories";
const getGameUrl = "https://api.twitch.tv/helix/games";
const getStreamUrl = "https://api.twitch.tv/helix/streams";
const getUserUrl = "https://api.twitch.tv/helix/users";

// APIの利用にはクライアントIDとアクセストークンが必須
const header = {
  "Client-Id": import.meta.env.VITE_API_CLIENT_KEY,
  Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
};

// search twitch streamers live only users
// ライブ配信中の配信者を取得
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
// ゲームIDを取得する為のゲームカテゴリを取得
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
// ゲームタイトルの情報を取得
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
// 特定の配信者がプレイしているゲームを取得
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
// 日本で人気の配信を取得
export const getPopularStream = async () => {
  try {
    const streamResponse = await axios.get(
      `${getStreamUrl}?language=ja&type=live&first=10`,
      {
        headers: header,
      }
    );
    const topStreamDataInJP = await streamResponse.data;

    // ?id=xx&id=xxのクエリパラメータを作成するのに必要
    const userIdQuery = topStreamDataInJP.data
      .map((stream) => stream.user_id)
      .join("&id=");
    // 配信者のプロフィールが画像を取得するには別途リクエストが必要なので、配信者情報を取得する
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
