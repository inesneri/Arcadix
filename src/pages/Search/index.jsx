import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useFetchSolution from "../../hooks/useFetchSolution";
import styles from "./Search.module.css";
import GameCard from "../../components/GameCard/GameCard";

export default function Search() {
  const [searchParams] = useSearchParams();
  const game = searchParams.get("query") || "";

  const initialUrl = `https://api.rawg.io/api/games?key=e8ee56036b2a4bb3b3eb5cd6d9a22402&search=${game}`;
  const { loading, data, error, updateUrl } = useFetchSolution(initialUrl);

  useEffect(() => {
    if (game) {
      updateUrl(
        `https://api.rawg.io/api/games?key=e8ee56036b2a4bb3b3eb5cd6d9a22402&search=${game}`
      );
    }
  }, [game, updateUrl]);

  return (
    <div className={styles.main}>
      <h1>{game ? `${game}` : "Cerca un gioco"}</h1>
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <h1 className={styles.error}>{error}</h1>}
      <div className={styles.games_wrapper}>
        {data &&
          data.results.map((game) => (
            <GameCard game={game} key={game.id} className={styles.gameCard} />
          ))}
      </div>
    </div>
  );
}
