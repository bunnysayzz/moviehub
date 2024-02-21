import React from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = React.useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <form className='search' onSubmit={handleSearch}>
      <input type="text" value={query} onChange={handleChange} placeholder='What you wanna watch today?'/>
      <button type="submit">Search</button>
    </form>
  );
}
