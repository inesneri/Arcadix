import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaGamepad,
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaApple,
} from "react-icons/fa";
import styles from "./Sidebar.module.css";

// URL delle piattaforme di gioco
const genresUrl =
  "https://api.rawg.io/api/genres?key=e8ee56036b2a4bb3b3eb5cd6d9a22402";
const platformsUrl =
  "https://api.rawg.io/api/platforms?key=e8ee56036b2a4bb3b3eb5cd6d9a22402"; // Nuovo URL

const style = {
  height: "auto",
};

export default function Sidebar() {
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);

  // Carica i generi
  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch(genresUrl);
      const json = await response.json();
      setGenres(json.results);
    };
    fetchGenres();
  }, []);

  // Carica le piattaforme
  useEffect(() => {
    const fetchPlatforms = async () => {
      const response = await fetch(platformsUrl);
      const json = await response.json();
      setPlatforms(json.results);
    };
    fetchPlatforms();
  }, []);

  // Funzione per associare icone alle piattaforme
  const getPlatformIcon = (platformName) => {
    switch (platformName.toLowerCase()) {
      case "pc":
        return <FaWindows />;
      case "playstation":
        return <FaPlaystation />;
      case "xbox":
        return <FaXbox />;
      case "nintendo":
        return <FaGamepad />;
      case "ios":
        return <FaApple />;
      default:
        return <FaGamepad />;
    }
  };

  return (
    <div className={styles.sidebar}>
      <h3>Genres</h3>
      <ul style={style}>
        {genres.map((genre) => (
          <li key={genre.id}>
            <Link to={`/games/${genre.slug}`}>{genre.name}</Link>
          </li>
        ))}
      </ul>

      <h3>Platforms</h3>
      <ul style={style}>
        {platforms.map((platform) => (
          <li key={platform.id}>
            <Link to={`/platforms/${platform.slug}`}>
              {getPlatformIcon(platform.name)} {platform.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
