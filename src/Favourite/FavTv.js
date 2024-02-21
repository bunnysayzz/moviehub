import React, { useState, useEffect } from 'react';
import TvList from '../List/TvList'; // Changed component path

export default function FavTv() {
  const [fav, setFav] = useState([]);

  const favoriteSeriesIDs = JSON.parse(localStorage.getItem('favoriteSeries')) || [];

  const fetchSeries = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=1`);
      const result = await response.json();
      return result.results;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    const renderFavoriteSeries = async () => {
      const mainTvList = await fetchSeries();
      const favoriteSeries = mainTvList.filter(series =>
        favoriteSeriesIDs.some(([_, tvId]) => tvId === series.id)
      );
      setFav(favoriteSeries);
    };
    renderFavoriteSeries();
  }, [favoriteSeriesIDs]);

  return (
    <div>
      <h1>Favorite TV Series</h1>
      {favoriteSeriesIDs.length > 0 ? (
        <TvList series={fav} />
      ) : (
        <h1>No Series selected</h1>
      )}
    </div>
  );
}
