import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../media/logo.png";
import background from "../../media/bg.jpg";
import supabase from "../../supabase/client";
import Swal from "sweetalert2";

export default function SignUp() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    uppercase: false,
    number: false,
  });

  const validatePassword = (password) => {
    const lengthValid = password.length >= 6;
    const uppercaseValid = /[A-Z]/.test(password);
    const numberValid = /[0-9]/.test(password);

    setPasswordValid({
      length: lengthValid,
      uppercase: uppercaseValid,
      number: numberValid,
    });

    setPassword(password);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    const formRegister = event.currentTarget;
    const { username, email, password, nome, cognome } = Object.fromEntries(
      new FormData(formRegister)
    );

    const passwordValid =
      password.length >= 6 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[a-zA-Z]/.test(password);

    if (!passwordValid) {
      Swal.fire({
        icon: "error",
        title: "Password non valida!",
        text: "La password deve contenere almeno 6 caratteri alfabetici, una lettera maiuscola e un numero.",
        background: "rgba(32, 14, 98, 1)",
        color: "#fff",
        showConfirmButton: true,
      });
      return;
    }

    let { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nome,
          cognome,
          username,
        },
      },
    });

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Registrazione fallita. Riprova!",
        background: "rgba(32, 14, 98, 1)",
        color: "#fff",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Registrazione avvenuta con successo!",
        text: `Benvenuto in Arcadix, ${username}!`,
        background: "rgba(32, 14, 98, 1)",
        color: "#fff",
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => {
        Swal.close();
        navigate("/");
      }, 2000);
    }
  };

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <img src={logo} alt="Arcadix Logo" style={styles.logo} />
            <strong style={styles.title}>Arcadix</strong>
          </li>
        </ul>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link
              to="/login"
              className="secondary"
              style={{ ...styles.linkStyle, ...styles.linkStyleHover }}
            >
              Login
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link
              to="/register"
              className="secondary"
              style={{ ...styles.linkStyle, ...styles.linkStyleHover }}
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>

      <div style={styles.overlay}>
        <div style={styles.formContainer}>
          <h1 style={styles.heading}>Create your account</h1>
          <form onSubmit={handleSignUp} style={styles.form}>
            <input
              name="nome"
              type="text"
              placeholder="Nome"
              style={styles.input}
              required
            />
            <input
              name="cognome"
              type="text"
              placeholder="Cognome"
              style={styles.input}
              required
            />
            <input
              name="username"
              type="text"
              placeholder="Username"
              style={styles.input}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              style={styles.input}
              required
            />
            <div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                style={styles.input}
                value={password}
                onChange={(e) => validatePassword(e.target.value)}
                required
              />
              <div style={styles.passwordGuide}>
                <p style={{ color: passwordValid.length ? "green" : "red" }}>
                  {passwordValid.length ? "✅" : "❌"} Almeno 6 lettere
                  alfabetiche
                </p>
                <p style={{ color: passwordValid.uppercase ? "green" : "red" }}>
                  {passwordValid.uppercase ? "✅" : "❌"} Una lettera maiuscola
                </p>
                <p style={{ color: passwordValid.number ? "green" : "red" }}>
                  {passwordValid.number ? "✅" : "❌"} Almeno un numero
                </p>
              </div>
            </div>
            <button
              type="submit"
              style={styles.button}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor =
                  styles.buttonHover.backgroundColor)
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "rgba(32, 14, 98, 1)")
              }
              disabled={
                !passwordValid.length ||
                !passwordValid.uppercase ||
                !passwordValid.number
              }
            >
              Sign Up
            </button>
          </form>

          <p style={styles.footerText}>
            Already have an account?{" "}
            <Link to="/login" style={styles.link}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 50px",
  },
  navList: {
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginLeft: "20px",
  },
  logo: {
    height: "50px",
    marginRight: "10px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#fff",
  },
  linkStyle: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    padding: "8px 20px",
    borderRadius: "25px",
    backgroundColor: "rgba(32, 14, 98, 1)",
    transition: "all 0.3s ease-in-out",
  },
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 80px)",
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(20px)",
    padding: "40px",
    width: "400px",
    borderRadius: "20px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "28px",
    color: "#fff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px 15px",
    border: "none",
    borderRadius: "10px",
    outline: "none",
    fontSize: "18px",
    color: "#000",
  },
  passwordGuide: {
    fontSize: "14px",
    color: "#fff",
    marginTop: "5px",
  },
  button: {
    padding: "12px 20px",
    backgroundColor: "rgba(32, 14, 98, 1)",
    color: "white",
    border: "none",
    borderRadius: "25px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out",
  },
  buttonHover: {
    backgroundColor: "#25476a",
  },
  footerText: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "14px",
    color: "#ddd",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};
