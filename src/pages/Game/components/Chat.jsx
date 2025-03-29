import styles from "../Game.module.css";
import RealtimeChat from "./RealtimeChat";
import supabase from "../../../supabase/client";

export default function Chat({ game, session }) {
  if (!session) {
    return (
      <div className={styles.chatContainer}>
        <p>Per accedere alla chat devi essere loggato.</p>
      </div>
    );
  }

  async function handleMessageSubmit(event) {
    event.preventDefault();
    const inputMessage = event.currentTarget;
    const { message } = Object.fromEntries(new FormData(inputMessage));

    if (typeof message === "string" && message.trim().length !== 0) {
      const { data, error } = await supabase
        .from("messages")
        .insert([
          {
            game_id: game.id,
            profile_id: session.user.id,
            profile_username: session.user.user_metadata.username,
            content: message,
          },
        ])
        .select();

      if (error) {
        console.log("Errore nell'invio del messaggio:", error);
      } else {
        inputMessage.reset();
        console.log(data);
      }
    }
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <h3>🔴 Live Chat</h3>
        <div className={styles.separator}></div>
      </div>
      <div className={styles.messages}>
        <RealtimeChat game={game} />
      </div>
      <div className={styles.chatForm}>
        <form onSubmit={handleMessageSubmit}>
          <fieldset role="group" className={styles.formChat}>
            <input
              type="text"
              name="message"
              placeholder="Scrivi un messaggio..."
            />
            <input type="submit" value="Invia" />
          </fieldset>
        </form>
      </div>
    </div>
  );
}
