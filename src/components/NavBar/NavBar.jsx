import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { setSearchType } from "../../store/slice/searchSlice";
import { setStreamerSearchWord } from "../../store/slice/streamerSlice";
import { setGamesSearchWord } from "../../store/slice/gamesSlice";

import OverLay from "../OverLay/OverLay";

const NavBar = () => {
  const params = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { searchType } = useSelector((state) => state.search);
  const { streamsData } = useSelector((state) => state.setStream);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ページが読み込まれた際にsearchTypeを変更
  // /gamesの場合はgamesに、/streamersの場合はstreamersに変更
  // それ以外の場合はstreamersに変更  (初期値)
  useEffect(() => {
    if (params.pathname === "/games") {
      dispatch(setSearchType("games"));
    }
    if (params.pathname === "/streamers") {
      dispatch(setSearchType("streamers"));
    } else {
      dispatch(setSearchType("streamers"));
    }
  }, []);

  // optionの値が変更された際にsearchTypeを変更
  const handleChange = (e) => {
    dispatch(setSearchType(e.target.value));
  };

  // inputの値が変更された際にsearchを変更
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // クリックされた際にinputの値を保持するための処理
  const handleClick = (e) => {
    const currentValue = e.target.value;
    e.target.value = "";
    setTimeout(() => {
      e.target.value = currentValue;
    }, 0);
  };

  // 送信された際searchTypeによって検索結果の保存先をstreamerかgameに変更
  const onSubmit = (e) => {
    e.preventDefault();
    if (search === "") return;
    if (searchType === "streamers") {
      dispatch(setStreamerSearchWord(search));
      navigate("/streamers");
    }
    if (searchType === "games") {
      dispatch(setGamesSearchWord(search));
      navigate("/games");
    }
    setSearch("");
  };

  return (
    <nav style={{ position: "relative" }}>
      <h3 className="icon" onClick={() => setIsOpen(!isOpen)}>
        📢
        <div className="streams-counter">
          <span>{streamsData?.length}</span>
        </div>
      </h3>
      {<OverLay isOpen={isOpen} />}
      <form className="searchFlex" onSubmit={onSubmit}>
        <div className="search-wrapper">
          <input
            type="text"
            name="search"
            id="search"
            className="searchBox"
            value={search}
            placeholder={`Search ${searchType}...`}
            onChange={handleSearchChange}
          />
          <select
            name="type"
            id="type"
            className="typeSelect"
            value={searchType}
            onChange={handleChange}
            onClick={handleClick}
          >
            <option value="streamers">Streamer</option>
            <option value="games">Game</option>
          </select>
        </div>
      </form>
    </nav>
  );
};

export default NavBar;
