// ライブラリのインポート
import { useDispatch, useSelector } from "react-redux";
// スライス Reducerのインポート
import {
  setStreamData,
  deleteStreamData,
  createStreamKeys,
  deleteStreamKeys,
} from "../../store/slice/setStreamSlice";

const PopularStream = ({ stream }) => {
  const { streamsData } = useSelector((state) => state.setStream);
  const dispatch = useDispatch();
  const {
    user_name,
    title,
    game_name,
    started_at,
    viewer_count,
    thumbnail_url,
    user_image_url,
    user_login,
    user_id,
  } = stream;

  // 配信者が追加されているかどうかをスライスの値と作成されたコンポーネントの値と比較して判定
  const isAdded = streamsData.some((data) => data.user_id === user_id);
  // 開始時間を日本時間に変換 yyyy/mm/dd hh:mm:ssの形式になる
  const localizedDate = new Date(started_at).toLocaleString("ja-JP");
  // サムネイル画像のサイズを変更
  const resizeImage = thumbnail_url.replace("{width}x{height}", "600x300");

  const handleAddStream = () => {
    const isExist = streamsData.some((data) => data.user_id === user_id);

    if (!isExist) {
      dispatch(setStreamData(stream));
      dispatch(createStreamKeys());
      return;
    } else if (isExist) {
      dispatch(deleteStreamData({ user_id }));
      dispatch(deleteStreamKeys({ user_login }));
    }
  };

  return (
    <div className="top-stream-wrapper">
      <div className="top-stream-thumbnail-wrapper">
        <img
          className="top-stream-thumbnail"
          src={resizeImage}
          alt="stream thumbnail"
        />
      </div>
      <div className="top-stream-info">
        <h3 className="top-stream-name">{user_name}</h3>
        <p className="top-stream-title">{title}</p>
        <p className="top-stream-gameName">{game_name}</p>
        <p className="top-stream-started">{localizedDate} 開始</p>
        <p className="top-stream-viewer">{viewer_count}人が視聴中</p>
        <img
          className="top-stream-userImage"
          src={user_image_url}
          alt="streamer image"
        />
        <div className="top-stream-btn">
          <button
            className="addbtn"
            onClick={handleAddStream}
            disabled={streamsData.length >= 4 && !isAdded}
          >
            {isAdded ? "delete" : "add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopularStream;
