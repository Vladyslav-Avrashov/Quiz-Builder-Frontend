import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftGroup}>
          <div className={styles.logo}>
            <NavLink to="/" onClick={handleLinkClick}>
              QuizBuilder
            </NavLink>
          </div>
        </div>

        <nav className={styles.navDesktop}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navLink ${isActive ? styles.active : ""}`
            }
          >
            All Quizzes
          </NavLink>
          <NavLink
            to="/create"
            className={({ isActive }) =>
              `navLink ${isActive ? styles.active : ""}`
            }
          >
            Create Quiz
          </NavLink>
        </nav>

        <div className={styles.navMobileToggle}>
          <button
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className={styles.navMobileMenu}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={handleLinkClick}
          >
            All Quizzes
          </NavLink>
          <NavLink
            to="/create"
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={handleLinkClick}
          >
            Create Quiz
          </NavLink>
        </nav>
      )}
    </header>
  );
};
