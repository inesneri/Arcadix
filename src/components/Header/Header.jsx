import { Link, useNavigate } from "react-router-dom";
import logo from "/src/media/logo.png";
import supabase from "../../supabase/client";
import { useState, useContext } from "react";
import SessionContext from "../../context/SessionContext";
import Swal from "sweetalert2";
import { FaUserCircle, FaChevronDown } from "react-icons/fa";
import styles from './Header.module.css';

export default function Header() {
  const [search, setSearch] = useState("");  
  const [dropdownOpen, setDropdownOpen] = useState(false);  
  const navigate = useNavigate();
  const { session, setSession } = useContext(SessionContext);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      Swal.fire({
        icon: "success",
        title: "Logout effettuato con successo!",
        text: "Arrivederci",
        showConfirmButton: false,
        timer: 2000,
        background: "rgba(32, 14, 98, 1)",
        color: "#fff",
      });

      setSession(null);
      navigate("/");
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (search.trim()) {
      navigate(`/search?query=${search}`);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  const handleDropdownItemClick = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <Link to="/" className={styles.link}>
            <img src={logo} alt="Arcadix Logo" className={styles.logo} />
            <strong className={styles.title}>Arcadix</strong>
          </Link>
        </li>
      </ul>

      <div className={styles.divSearch}>
        <form onSubmit={handleSearch}>
          <input
            className={styles.searchBar}
            type="search"
            placeholder="Search Game"
            value={search}
            onChange={(e) => setSearch(e.target.value)} 
          />
        </form>
      </div>

      <div>
        <ul className={styles.navList}>
          {session ? (
            <li className={styles.navItem}>
              <div className={styles.dropdown}>
                <button 
                  className={`${styles.dropdownToggle} ${dropdownOpen ? styles.open : ''}`} 
                  onClick={toggleDropdown}
                >
                  <FaUserCircle className={styles.icon} />
                  {session.user?.user_metadata?.username || "Utente"}
                  <FaChevronDown className={styles.dropdownIcon} />
                </button>

                {dropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    <div 
                      className={styles.dropdownItem} 
                      onClick={() => { handleDropdownItemClick(); navigate("/account"); }}
                    >
                      Il tuo account
                    </div>
                    <div 
                      className={styles.dropdownItem} 
                      onClick={() => { handleDropdownItemClick(); signOut(); }}
                    >
                      Logout
                    </div>
                  </div>
                )}
              </div>
            </li>
          ) : (
            <>
              <li className={styles.navItem}>
                <Link to="/login" className={styles.linkStyle}>Login</Link>
              </li>
              <li className={styles.navItem}>
                <Link to="/register" className={styles.linkStyle}>Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
