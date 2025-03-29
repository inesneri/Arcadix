import { useState, useEffect, useContext } from "react";
import supabase from "../../../supabase/client";
import SessionContext from "../../../context/SessionContext";
import styles from "./Profile.module.css";
import Swal from "sweetalert2";

export default function Profile() {
  const { session, setSession } = useContext(SessionContext);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    username: "",
    first_name: "",
    last_name: "",
  });

  useEffect(() => {
    if (!session?.user) return;

    let ignore = false;
    async function getProfile() {
      setLoading(true);

      const { data, error } = await supabase
        .from("profiles")
        .select("username, first_name, last_name")
        .eq("id", session.user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setProfile(data);
        }
      }

      setLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  async function updateProfile(event) {
    event.preventDefault();
    setLoading(true);

    if (!session?.user) return;

    const updates = {
      id: session.user.id,
      username: profile.username.trim(),
      first_name: profile.first_name.trim(),
      last_name: profile.last_name.trim(),
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      alert(error.message);
    } else {
      const { data, error: fetchError } = await supabase
        .from("profiles")
        .select("username, first_name, last_name")
        .eq("id", session.user.id)
        .single();

      if (!fetchError && data) {
        setProfile(data);
        setSession((prev) => ({
          ...prev,
          user: {
            ...prev.user,
            user_metadata: { ...prev.user.user_metadata, ...data },
          },
        }));

        Swal.fire({
          title: "Dati modificati con successo",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    }

    setLoading(false);
  }

  if (!session) {
    return <p>Caricamento in corso...</p>;
  }

  return (
    <div>
      <form onSubmit={updateProfile} className={styles.formContainer}>
        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" value={session.user.email} disabled />
        </div>
        <div className={styles.field}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            required
            value={profile.username}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, username: e.target.value }))
            }
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="first_name">First Name</label>
          <input
            id="first_name"
            type="text"
            value={profile.first_name}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, first_name: e.target.value }))
            }
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="last_name">Last Name</label>
          <input
            id="last_name"
            type="text"
            value={profile.last_name}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, last_name: e.target.value }))
            }
          />
        </div>

        <button
          className={styles.updateButton}
          type="submit"
          disabled={loading}
        >
          {loading ? "Saving..." : "Update"}
        </button>
      </form>
    </div>
  );
}
