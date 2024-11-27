import { useSelector, useDispatch } from "react-redux";

import {
  setStreamData,
  deleteStreamData,
  createStreamKeys,
  deleteStreamKeys,
} from "../../store/slice/setStreamSlice";
const StreamerProfile = ({ streamer }) => {
  const { streamsData, streamsKeys } = useSelector((state) => state.setStream);
  const dispatch = useDispatch();
  const {
    display_name,
    game_name,
    tags,
    thumbnail_url,
    title,
    user_id,
    user_login,
  } = streamer;
  let isAdded = streamsData.some((stream) => stream.user_id === user_id);

  const handleAddStream = () => {
    if (!isAdded) {
      dispatch(
        setStreamData({
          user_name: display_name,
          user_login,
          title,
          user_id,
        })
      );
      dispatch(createStreamKeys());
      isAdded = true;

      return;
    } else if (isAdded) {
      dispatch(deleteStreamData({ user_id }));
      dispatch(deleteStreamKeys({ user_login }));
      isAdded = false;
    }
  };

  return (
    <div className="streamer-box">
      <img src={thumbnail_url} alt={`${display_name} Image`} />
      <div className="broadCast-box">
        <div className="broadCast-index">
          <h3 className="streamer">{display_name}</h3>
          <p className="stream-title">{title}</p>
        </div>
        <span className="game-name">{game_name}</span>
      </div>
      <button
        className="addbtn"
        onClick={handleAddStream}
        disabled={streamsData.length >= 4 && !isAdded}
      >
        {isAdded ? "delete" : "add"}
      </button>
    </div>
  );
};

export default StreamerProfile;
