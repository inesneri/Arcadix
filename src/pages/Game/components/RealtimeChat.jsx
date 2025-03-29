import styles from "../Game.module.css";
import supabase from "../../../supabase/client";
import { useState, useEffect, useRef } from "react";

export default function RealtimeChat({ game }) {
  const [messages, setMessages] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [error, setError] = useState("");
  const messageRef = useRef(null);

  const scrollSmoothToBottom = () => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  };

  const getInitialMessages = async () => {
    if (!game?.id) return;

    setLoadingInitial(true);

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("game_id", game.id);

    if (error) {
      setError(error.message);
      console.error("Errore nella fetch dei messaggi:", error.message);
    } else {
      setMessages(data);
    }

    setLoadingInitial(false);
  };

  useEffect(() => {
    if (!game?.id) return;

    getInitialMessages();

    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
        },
        () => getInitialMessages()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [game?.id]);

  useEffect(() => {
    scrollSmoothToBottom();
  }, [messages]);

  if (loadingInitial) {
    return <div className={styles.loading}>Caricamento messaggi...</div>;
  }

  return (
    <div className={styles.messages} ref={messageRef}>
      {error && <div className={styles.error}>{error}</div>}
      {messages.map((message) => (
        <div key={message.id} className={styles.chatMessages}>
          <p className={styles.chatUsername}>{message.profile_username}</p>
          <div>
            <small className={styles.textMessage}>{message.content}</small>
            <p className={styles.time}>
              {new Date(message.created_at).toLocaleTimeString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
