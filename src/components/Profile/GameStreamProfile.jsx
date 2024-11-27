import { useDispatch, useSelector } from "react-redux";

import {
  setStreamData,
  deleteStreamData,
  createStreamKeys,
  deleteStreamKeys,
} from "../../store/slice/setStreamSlice";

const GameStreamProfile = ({ stream }) => {
  const { streamsData } = useSelector((state) => state.setStream);
  const dispatch = useDispatch();
  const {
    user_id,
    user_name,
    user_login,
    game_id,
    game_name,
    title,
    viewer_count,
    started_at,
    thumbnail_url,
  } = stream;
  let isAdd = streamsData.some((data) => data.user_id === user_id);
  const resizeArt_url = thumbnail_url.replace("{width}x{height}", `250x150`);

  const handleAddStream = () => {
    const isExist = streamsData.some((data) => data.user_id === user_id);

    if (!isExist) {
      dispatch(setStreamData(stream));
      dispatch(createStreamKeys());
      isAdd = true;
      return;
    } else if (isExist) {
      dispatch(deleteStreamData({ user_id }));
      dispatch(deleteStreamKeys({ user_login }));
      isAdd = false;
    }
  };

  return (
    <section className="gamestream-container">
      <div className="stream-thumbnail-wrapper">
        <img
          className="stream-thumbnail"
          src={resizeArt_url}
          alt={`video_thumbnail_${user_name}`}
        />
      </div>
      <div className="stream-index">
        <h3 className="stream-user">{user_name}</h3>
        <p className="stream-title" style={{ color: "#fff" }}>
          {title}
        </p>
      </div>
      <div className="stream-details">
        <span className="stream-game">{game_name}</span>
        <span className="stream-started">
          {new Date(started_at).toLocaleString()} 開始
        </span>
        <span className="stream-viewer">{viewer_count}人が視聴中</span>
      </div>
      <div className="stream-add-btn">
        <button
          className=""
          onClick={handleAddStream}
          disabled={streamsData.length >= 4 && !isAdd}
        >
          {isAdd ? "DELETE" : "ADD"}
        </button>
      </div>
    </section>
  );
};

export default GameStreamProfile;
