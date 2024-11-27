import { Link } from "react-router-dom";

const GamesProfile = ({ game, width = 140, height = 140 }) => {
  const resizeArt_url = game.box_art_url.replace(
    "{width}x{height}",
    `${width}x${height}`
  );
  return (
    <Link to={`/game/${game.id}`} className="game-profile">
      <img src={resizeArt_url} alt="gameImg" />
      <p>{game.name}</p>
    </Link>
  );
};

export default GamesProfile;
