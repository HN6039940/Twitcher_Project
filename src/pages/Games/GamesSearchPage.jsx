import SearchResult from "../../components/common/SearchResult";
import GameBox from "../../components/common/GameBox";
import GamesProfile from "../../components/Profile/GamesProfile";
import Loading from "../../components/Loading/Loading";

import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getGameId, getGame } from "../../axios/axios";
import { setGames, setPagination } from "../../store/slice/gamesSlice";

const GameSearch = () => {
  const dispatch = useDispatch();
  const { games, gamesSearchWord } = useSelector((state) => state.games);

  const { data = [], isLoading } = useQuery({
    queryKey: ["game", gamesSearchWord],
    queryFn: async () => {
      const responseGameId = await getGameId(gamesSearchWord);
      if (responseGameId.data) {
        const searchGameIdResult = responseGameId.data.map((game) => {
          const { id } = game;
          return id;
        });
        const gameIdQuery = searchGameIdResult.join("&id=");
        const response = await getGame(gameIdQuery);
        dispatch(setGames(response.data));
        dispatch(setPagination(response.pagination));
        return response;
      }
      return [];
    },
    refetchOnMount: false,
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
      <GameBox>
        {data && data?.data?.length > 0 ? (
          games.map((game, index) => (
            <>
              <GamesProfile key={game.id + index} game={game}></GamesProfile>
            </>
          ))
        ) : (
          <div>No Game Found</div>
        )}
      </GameBox>
    </SearchResult>
  );
};

export default GameSearch;
