import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MovieList from './List/MovieList';
import FavMovie from './Favourite/FavMovie';
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import TvList from './List/TvList';
import FavTv from './Favourite/FavTv';
import Pagination from './Pagination/Pagination';
import './App.css';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [currentMoviePage, setCurrentMoviePage] = useState(1);
  const [currentSeriesPage, setCurrentSeriesPage] = useState(1);
  const [totalMoviePages, setTotalMoviePages] = useState(0);
  const [totalSeriesPages, setTotalSeriesPages] = useState(0);

  const fetchMovies = async (page) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=${page}`);
      const result = await response.json();
      setMovies(result.results);
      setTotalMoviePages(result.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchSeries = async (page) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=${page}`);
      const result = await response.json();
      setSeries(result.results);
      setTotalSeriesPages(result.total_pages);
    } catch (error) {
      console.error("Error fetching TV shows:", error);
    }
  };

  useEffect(() => {
    fetchMovies(currentMoviePage);
    fetchSeries(currentSeriesPage);
  }, [currentMoviePage, currentSeriesPage]);

  const handleMovieSearch = async (query) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=8aa4332fdf11c13d2726fd22ea616e95&include_adult=false&language=en-US&page=1`);
      const result = await response.json();
      setMovies(result.results);
      setTotalMoviePages(result.total_pages);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  const handleTvSearch = async (query) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/tv?query=${query}&api_key=8aa4332fdf11c13d2726fd22ea616e95&include_adult=false&language=en-US&page=1`);
      const result = await response.json();
      setSeries(result.results);
      setTotalSeriesPages(result.total_pages);
    } catch (error) {
      console.error("Error searching TV shows:", error);
    }
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar onMovieSearch={handleMovieSearch} onTvSearch={handleTvSearch} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/movies" element={<div>
            <MovieList movies={movies} />
            <Pagination currentPage={currentMoviePage} totalPages={totalMoviePages} onPageChange={setCurrentMoviePage} />
          </div>} />
          <Route path='/favmov' element={<FavMovie />} />
          <Route path='/tv' element={<div>
            <TvList series={series} />
            <Pagination currentPage={currentSeriesPage} totalPages={totalSeriesPages} onPageChange={setCurrentSeriesPage} />
          </div>} />
          <Route path='/favTv' element={<FavTv />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
