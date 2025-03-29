import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "../Home/Home.module.css";
import GameCard from "../../components/GameCard/GameCard";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function Genre() {
  const [games, setGames] = useState([]);
  const { genre } = useParams();

  useEffect(() => {
    const fetchGenre = async () => {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=e8ee56036b2a4bb3b3eb5cd6d9a22402&genres=${genre}&page=1`
      );
      const json = await response.json();
      setGames(json.results);
    };
    fetchGenre();
  }, [genre]);

  return (
    <div className={styles.main}>
      <Sidebar />
      <div className={styles.content}>
        <div className={styles.heading}>
          <div>
            <h1>{genre} games</h1>
            <p>Based on player counts and release data</p>
          </div>
        </div>
        <div className={styles.games_wrapper}>
          {games.length > 0 ? (
            games.map((game) => <GameCard key={game.id} game={game} />)
          ) : (
            <p>Loading games...</p>
          )}
        </div>
      </div>
    </div>
  );
}
