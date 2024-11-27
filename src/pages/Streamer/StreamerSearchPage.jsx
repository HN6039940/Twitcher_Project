import SearchResult from "../../components/common/SearchResult";
import StreamerProfile from "../../components/Profile/StreamerProfile";
import Loading from "../../components/Loading/Loading";

import { useQuery } from "@tanstack/react-query";
import { getChannel } from "../../axios/axios";

import { useSelector, useDispatch } from "react-redux";
import { setStreamers, setPagination } from "../../store/slice/streamerSlice";

const StreamerSearch = () => {
  const dispatch = useDispatch();
  const { streamerSearchWord } = useSelector((state) => state.streamer);
  const { streamers } = useSelector((state) => state.streamer);

  const { data = [], isLoading } = useQuery({
    queryKey: ["streamer", streamerSearchWord],
    queryFn: async () => {
      const response = await getChannel(streamerSearchWord);
      if (response.data) {
        dispatch(setStreamers(response.data));
        dispatch(setPagination(response.pagination));
      }
      return response;
    },
  });

  if (isLoading) {
    return (
      <SearchResult>
        <Loading />
      </SearchResult>
    );
  }

  return (
    <SearchResult>
      {data && streamers.length > 0 ? (
        streamers.map((streamer, index) => (
          <StreamerProfile key={index} streamer={streamer} />
        ))
      ) : (
        <div>No Streamer Found</div>
      )}
    </SearchResult>
  );
};

export default StreamerSearch;
