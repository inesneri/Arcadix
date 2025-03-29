import { useEffect, useState, useContext, useCallback } from "react";
import useFetchSolution from "../../hooks/useFetchSolution";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Game.module.css";
import { FaStar, FaComment } from "react-icons/fa";
import SessionContext from "../../context/SessionContext";
import supabase from "../../supabase/client";
import Swal from "sweetalert2";
import Sidebar from "../../components/Sidebar/Sidebar";
import { FaEdit } from "react-icons/fa";
import { RiHeartAddLine } from "react-icons/ri";
import { TbHeartOff } from "react-icons/tb";
import Chat from "./components/Chat";

export default function Game() {
  const { session } = useContext(SessionContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const initialUrl = `https://api.rawg.io/api/games/${id}?key=e8ee56036b2a4bb3b3eb5cd6d9a22402`;
  const screenshotsUrl = `https://api.rawg.io/api/games/${id}/screenshots?key=e8ee56036b2a4bb3b3eb5cd6d9a22402`;

  const { loading, data, error } = useFetchSolution(initialUrl);
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isFav, setIsFav] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const addToFav = async () => {
    if (!session || !game) return;

    const { error } = await supabase
      .from("favorites")
      .insert([
        {
          profile_id: session.user.id,
          game_id: game.id,
          game_name: game.name,
        },
      ])
      .select();

    if (error) {
      Swal.fire("Errore!", error.message, "error");
    } else {
      Swal.fire({
        title: "Aggiunto ai preferiti!",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
      setIsFav(true);
    }

    setTimeout(() => {
      Swal.close();
    }, 1000);
  };

  const removeFromFav = async () => {
    if (!session || !game) return;

    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("profile_id", session.user.id)
      .eq("game_id", game.id);

    if (error) {
      Swal.fire("Errore!", error.message, "error");
    } else {
      Swal.fire({
        title: "Rimosso dai preferiti!",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
      setIsFav(false);
    }
    setTimeout(() => {
      Swal.close();
    }, 1000);
  };

  const readFave = useCallback(async () => {
    if (!session || !data) return;

    const { data: favorites, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("game_id", data.id)
      .eq("profile_id", session.user.id);

    if (error) {
      Swal.fire("Errore!", error.message, "error");
    } else {
      setIsFav(favorites.length > 0);
    }
  }, [session, data]);

  useEffect(() => {
    if (data) {
      setGame(data);
    }
  }, [data]);

  useEffect(() => {
    if (session && data) {
      readFave();
    }
  }, [session, data, readFave]);

  useEffect(() => {
    const fetchScreenshots = async () => {
      const response = await fetch(screenshotsUrl);
      const screenshotData = await response.json();
      if (screenshotData.results) {
        setScreenshots(screenshotData.results);
      }
    };

    fetchScreenshots();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data: reviewsData, error } = await supabase
        .from("reviews")
        .select(
          "id, review_content, created_at, review_title, profiles(username)"
        )
        .eq("game_id", id);

      if (error) {
        console.log("Errore nel recupero delle recensioni:", error.message);
      } else {
        setReviews(reviewsData);
      }
    };

    fetchReviews();
  }, [id]);

  const redirectToReview = () => {
    navigate(`/games/review/${id}`);
  };

  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const descriptionToShow =
    game && game.description_raw
      ? isExpanded
        ? game.description_raw
        : game.description_raw.slice(0, 200)
      : "Descrizione non disponibile";

  if (loading)
    return <div className={styles.loading}>Caricamento in corso...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!game) return <div className={styles.noGame}>No game found!</div>;

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <div className={styles.gameTitle}>
          <h1>{game.name}</h1>
          <div
            className={styles.gameBackground}
            style={{ backgroundImage: `url(${game.background_image})` }}
          ></div>
        </div>

        {screenshots.length > 0 && (
          <div className={styles.screenshots}>
            <div className={styles.screenshotWrapper}>
              {screenshots.map((screenshot, index) => (
                <img
                  key={index}
                  src={screenshot.image}
                  alt={`Screenshot ${index + 1}`}
                  className={styles.screenshotImage}
                />
              ))}
            </div>
          </div>
        )}

        <div className={styles.gameDescription}>
          <h2>About:</h2>
          <div className={styles.descriptionText}>{descriptionToShow}...</div>
          {game.description_raw && (
            <span onClick={handleReadMore} className={styles.readMore}>
              {isExpanded ? "Read Less" : "Read More"}
            </span>
          )}
        </div>

        <div className={styles.gameDetails}>
          <p className={styles.releaseDate}>Released: {game.released}</p>
          <p className={styles.rating}>
            <FaStar /> {game.rating}
          </p>
        </div>

        <div className={styles.buttonContainer}>
          {session && !isFav && (
            <button className={styles.favBtn} onClick={addToFav}>
              <RiHeartAddLine style={{ marginRight: "8px" }} /> Aggiungi ai
              preferiti
            </button>
          )}
          {session && isFav && (
            <button className={styles.favBtn} onClick={removeFromFav}>
              <TbHeartOff style={{ marginRight: "8px" }} /> Rimuovi dai
              preferiti
            </button>
          )}
          {session && (
            <button className={styles.reviewBtn} onClick={redirectToReview}>
              <FaEdit style={{ marginRight: "8px" }} /> Scrivi una recensione
            </button>
          )}
        </div>

        <div className={styles.reviewsSection}>
          <h2>Recensioni:</h2>
          {reviews.length > 0 ? (
            <div className={styles.reviewsList}>
              {reviews
                .slice()
                .reverse()
                .map((review) => (
                  <div key={review.id} className={styles.reviewCard}>
                    <p className={styles.reviewAuthor}>
                      {" "}
                      {review.profiles.username}
                    </p>
                    <p className={styles.reviewTitle}>{review.review_title}</p>
                    <p className={styles.reviewContent}>
                      {review.review_content}
                    </p>
                    <p className={styles.reviewDate}>
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
            </div>
          ) : (
            <p>Non ci sono recensioni per questo gioco.</p>
          )}
        </div>

        <button
          onClick={() => setShowChat((prevState) => !prevState)}
          className={styles.chatButton}
        >
          <FaComment />
        </button>

        {showChat && <Chat game={game} session={session} />}
      </div>
    </div>
  );
}
