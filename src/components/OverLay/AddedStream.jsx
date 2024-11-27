import { useDispatch } from "react-redux";

import {
  deleteStreamData,
  deleteStreamKeys,
} from "../../store/slice/setStreamSlice";
const AddedStream = ({ stream }) => {
  const { user_name, user_login, title, user_id } = stream;
  const dispatch = useDispatch();

  const handleDeleteStream = () => {
    dispatch(deleteStreamData({ user_id }));
    dispatch(deleteStreamKeys({ user_login }));
  };
  return (
    <div className="added-stream-wrapper">
      <div className="added-stream-box">
        <div className="added-stream-index">
          <p>{user_name}</p>
          <p>{title}</p>
        </div>
      </div>
      <div className="delete-stream-btn-wrapper">
        <button className="delete-stream-btn" onClick={handleDeleteStream}>
          DELETE
        </button>
      </div>
    </div>
  );
};

export default AddedStream;
