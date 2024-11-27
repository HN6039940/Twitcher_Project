import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { getGameStream } from "../../axios/axios";
import {
  setGameStreams,
  setSearchGameId,
} from "../../store/slice/gameStreamSlice";

import GameStreamProfile from "../../components/Profile/GameStreamProfile";
import Loading from "../../components/Loading/Loading";
const GameStreamPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gameStreams } = useSelector((state) => state.gameStream);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      navigate(`/`);
    }
  }, []);

  const { data = [], isLoading } = useQuery({
    queryKey: ["gameStream", id],
    queryFn: async () => {
      const response = await getGameStream(id);
      if (response.data) {
        dispatch(setGameStreams(response.data));
        dispatch(setSearchGameId(id));
      }
      return response;
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="gamestream-box">
      {data && gameStreams.length > 0 ? (
        gameStreams.map((stream) => (
          <GameStreamProfile key={stream.user_id} stream={stream} />
        ))
      ) : (
        <div>No Stream Found</div>
      )}
    </div>
  );
};

export default GameStreamPage;
