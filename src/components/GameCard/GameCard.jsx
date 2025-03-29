import { useNavigate } from "react-router";
import { useState } from 'react';
import { FaStar } from 'react-icons/fa'; 
import GameImage from "../GameImage/GameImage";
import styles from './GameCard.module.css';

export default function GameCard({ game }) {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(true); // Corretto: variabile 'setHidden' non era usata correttamente
  const genres = game.genres.map((genre) => genre.name).join(" , ");
  const rating = game.rating || 0;

  const handleMouseEnter = () => setHidden(false);
  const handleMouseLeave = () => setHidden(true);
  const handleClick = () => navigate(`/games/${game.id}/${game.name}`);

  return (
    <article
      className={`${styles.card} navigationEffect`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <GameImage image={game.background_image} />
      <small>{genres}</small>
      <h4>{game.name}</h4>

      <div className={styles.details}>
        <div className={styles.info}>
          <div className={styles.rating}>
            <FaStar /> <span>{rating}</span>
          </div>
          <p><strong>Data di rilascio:</strong> {game.released || "Non disponibile"}</p>
          <p><strong>Genere:</strong> {genres}</p>
        </div>
      </div>
    </article>
  );
}
