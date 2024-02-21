import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import movieBackground from './movie_background.jpg';
import tvBackground from './tv_background.jpg';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.homeContainer}>
      <div className={`${styles.container} ${styles.movieBackground} ${styles.largeContainer}`} onClick={() => navigate("/movies")} data-title="MOVIES" style={{backgroundImage: `url(${movieBackground})`}}>
        <div className={styles.titleOverlay}>Movies</div>
      </div>
      <div className={`${styles.container} ${styles.tvBackground} ${styles.largeContainer}`} onClick={() => navigate("/tv")} data-title="SERIES" style={{backgroundImage: `url(${tvBackground})`}}>
        <div className={styles.titleOverlay}>Series</div>
      </div>
    </div>
  );
}
