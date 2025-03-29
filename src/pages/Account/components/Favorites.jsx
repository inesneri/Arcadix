import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Aggiungi il Link per navigare
import supabase from "../../../supabase/client";
import styles from "./Favorites.module.css";
import GameImage from "../../../components/GameImage/GameImage";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const { data, error } = await supabase
        .from("favorites")
        .select("id, game_id, game_name") // Assicurati che 'background_image' venga recuperato
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Errore nel recupero dei preferiti:", error.message);
      } else {
        setFavorites(data);
      }
      setLoading(false);
    };

    fetchFavorites();
  }, []);

  return (
    <div>
      <h3>I tuoi giochi preferiti</h3>
      {loading ? (
        <p>Caricamento...</p>
      ) : favorites.length > 0 ? (
        <div className={styles.gridContainer}>
          {favorites.map((game) => (
            <Link
              key={game.id}
              to={`/games/${game.game_id}/${game.game_name}`}
              className={styles.gameCard}
            >
              <GameImage
                image={game.background_image || "default-image-url.jpg"}
              />{" "}
              <h1 className={styles.gameTitle}>{game.game_name}</h1>
            </Link>
          ))}
        </div>
      ) : (
        <p>Nessun gioco preferito trovato.</p>
      )}
    </div>
  );
}
