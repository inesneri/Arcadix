import { Link, useNavigate } from "react-router-dom";
import logo from "../../media/logo.png";
import background from "../../media/bg.jpg";
import supabase from "../../supabase/client";
import Swal from 'sweetalert2';

export default function LogIn() {
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const formLogin = event.currentTarget;
    const { email, password } = Object.fromEntries(
      new FormData(formLogin)
    );

    let { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Login fallito. Controlla le tue credenziali!',
        confirmButtonColor: '#d33',
        background: 'rgba(32, 14, 98, 1)',
        color: '#fff',
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Bentornato/a!',
        confirmButtonColor: '#3085d6',
        background: 'rgba(32, 14, 98, 1)',
        color: '#fff',
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
          <h1 style={styles.heading}>Login to your account</h1>
          <form onSubmit={handleLogin} style={styles.form}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              style={styles.input}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              style={styles.input}
              required
            />
            <button
              type="submit"
              style={styles.button}
            >
              Login
            </button>
          </form>

          <p style={styles.footerText}>
            Don't have an account?{" "}
            <Link to="/register" style={styles.link}>
              Sign Up
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
