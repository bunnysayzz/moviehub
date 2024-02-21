import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import SearchBar from '../Searchbar/SearchBar';
import movieHubLogo from './moviehublogo.png';
import defaultUserImage from './User.jpg';
import { FaUser } from 'react-icons/fa'; 
const Navbar = ({ onMovieSearch, onTvSearch }) => {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSearch = async (query) => {
    onMovieSearch(query);
    onTvSearch(query);
  };

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleNavbarTitleClick = () => {
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/">
          <img src={movieHubLogo} alt="Movie Hub Logo" className="logo" />
        </Link>
        <h1 className="navbar-title" onClick={handleNavbarTitleClick}>MOVIE-HUB</h1>
      </div>
      <ul className={`nav ${user ? 'logged-in' : 'logged-out'}`}>
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === '/movies' ? 'active' : ''}>
          <Link to="/movies">Movies</Link>
        </li>
        <li className={location.pathname === '/tv' ? 'active' : ''}>
          <Link to="/tv">TV</Link>
        </li>
        <li className={location.pathname === '/favmov' ? 'active' : ''}>
          <Link to="/favmov">Fav Movie</Link>
        </li>
        <li className={location.pathname === '/favtv' ? 'active' : ''}>
          <Link to="/favtv">Fav Series</Link>
        </li>
        <SearchBar onSearch={handleSearch} />
        {user ? (
          <div className="user-info">
            <img
              src={user.photoURL || defaultUserImage}
              alt="user"
              className="user-icon"
            />
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        ) : (
          <li>
            <button onClick={handleLogin} className="login-btn">
              <FaUser />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
