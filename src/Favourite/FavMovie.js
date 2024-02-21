import React, { useState, useEffect } from 'react';
import MovieList from '../List/MovieList';

export default function FavMovie() {
  const [fav, setFav] = useState([]);
  const favoriteMovieIDs = JSON.parse(localStorage.getItem('favoriteMovies')) || [];

  const fetchMovies = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=1`);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const result = await response.json();
      return result.results;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    const renderFavoriteMovies = async () => {
      try {
        const mainMovieList = await fetchMovies();
        const favoriteMovies = mainMovieList.filter(movie =>
          favoriteMovieIDs.some(([_, movieId]) => movieId === movie.id)
        );
        setFav(favoriteMovies);
      } catch (error) {
        console.error(error);
        setFav([]); // Clear fav list in case of error
      }
    };
    renderFavoriteMovies();
  }, [favoriteMovieIDs]); // Added favoriteMovieIDs as dependency for useEffect

  return (
    <div>
      <h1>Favorite Movies</h1>
      {fav.length > 0 ? (
        <MovieList movies={fav} />
      ) : (
        <h1>No movies selected</h1>
      )}
    </div>
  );
}
