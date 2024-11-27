// ライブラリのインポート
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getGameId, getGame } from "../../axios/axios";
import { setGames, setPagination } from "../../store/slice/gamesSlice";

// コンポーネントのインポート
import SearchResult from "../../components/common/SearchResult";
import GameBox from "../../components/common/GameBox";
import GamesProfile from "../../components/Profile/GamesProfile";
import Loading from "../../components/Loading/Loading";
const GameSearch = () => {
  const dispatch = useDispatch();
  const { games, gamesSearchWord } = useSelector((state) => state.games);

  const { data = [], isLoading } = useQuery({
    queryKey: ["game", gamesSearchWord],
    queryFn: async () => {
      const responseGameId = await getGameId(gamesSearchWord);
      // ゲームIDを取得できた場合のみゲーム情報を取得を取得
      // ゲームIDが取得できなかった場合は空の配列を返す
      if (responseGameId.data) {
        const searchGameIdResult = responseGameId.data.map((game) => {
          const { id } = game;
          return id;
        });
        // APIの仕様上、id=1&id=2&id=3...の形式でクエリリクエストを送る必要があるため変換する
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
        {/* dataがありデータの長さが1以上の場合のみGamesProfileが動作するようにする */}
        {data && data?.data?.length > 0 ? (
          games.map((game, index) => (
            <>
              <GamesProfile key={game.id + index} game={game}></GamesProfile>
            </>
          ))
        ) : (
          <div className="not-found-game">No Game Found</div>
        )}
      </GameBox>
    </SearchResult>
  );
};

export default GameSearch;
