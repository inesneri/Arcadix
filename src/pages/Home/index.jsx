import useFetchSolution from "../../hooks/useFetchSolution";
import styles from "./Home.module.css";
import GameCard from "../../components/GameCard/GameCard";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { FaSpinner } from "react-icons/fa";

export default function Home() {
  const [page, setPage] = useState(1);
  const [games, setGames] = useState([]);
  const initialUrl = `https://api.rawg.io/api/games?key=e8ee56036b2a4bb3b3eb5cd6d9a22402&dates=2024-01-01,2024-12-31&page=${page}`;

  const { loading, data, error, updateUrl } = useFetchSolution(initialUrl);
  const { ref, inView } = useInView();

  useEffect(() => {
    updateUrl(initialUrl);
  }, [page]);

  useEffect(() => {
    if (data?.results) {
      setGames((prevGames) => [...prevGames, ...data.results]);
    }
  }, [data]);

  useEffect(() => {
    if (inView && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, loading]);

  return (
    <div className={styles.main}>
      <Sidebar />
      <div className={styles.content}>
        <div className={styles.heading}>
          <h1>New and Trending</h1>
          <p>Based on player counts and release date</p>
        </div>
        <div className={styles.games_wrapper}>
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
        <div ref={ref} style={{ height: "20px" }}></div>{" "}
        {loading && (
          <div className={styles.loadingContainer}>
            <FaSpinner className={styles.spinner} />
          </div>
        )}
        {error && <h1>{error}</h1>}
      </div>
    </div>
  );
}
