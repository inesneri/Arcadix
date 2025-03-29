import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import supabase from "../../../supabase/client";
import Swal from "sweetalert2";
import styles from "./GameReviews.module.css";

export default function Review() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");

  const handleTitleChange = (e) => setReviewTitle(e.target.value);
  const handleReviewChange = (e) => setReviewContent(e.target.value);

  const submitReview = async () => {
    if (!reviewTitle || !reviewContent) return;

    const { error } = await supabase.from("reviews").insert([
      {
        game_id: id,
        review_title: reviewTitle,
        review_content: reviewContent,
      },
    ]);

    if (error) {
      console.log(error.message);
    } else {
      Swal.fire({
        title: "Recensione inviata!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });

      setReviewTitle("");
      setReviewContent("");
      navigate(`/games/${id}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.reviewForm}>
        <h1>LASCIA UNA RECENSIONE</h1>
        <p>Condividi la tua esperienza di gioco con la community!</p>

        <textarea
          value={reviewTitle}
          onChange={handleTitleChange}
          placeholder="TITOLO"
          rows="1"
          required
        />

        <textarea
          value={reviewContent}
          onChange={handleReviewChange}
          placeholder="Scrivi la tua recensione..."
          rows="5"
          required
        />

        <button onClick={submitReview}>Invia recensione 🚀</button>
      </div>
    </div>
  );
}
