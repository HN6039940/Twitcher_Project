import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import AddedStream from "./AddedStream.jsx";
const OverLay = ({ isOpen }) => {
  const { streamsData } = useSelector((state) => state.setStream);
  return (
    <div className={isOpen ? "overlay overlay-active" : "overlay"}>
      {streamsData.length > 0 ? (
        streamsData.map((stream) => (
          <AddedStream key={stream.user_id} stream={stream} />
        ))
      ) : (
        <p>ストリームがありません</p>
      )}
      <div className="create-stream-btn-container">
        <button className="create-stream-btn">
          <Link to={"./stream"}>ストリーム作成</Link>
        </button>
      </div>
    </div>
  );
};

export default OverLay;
