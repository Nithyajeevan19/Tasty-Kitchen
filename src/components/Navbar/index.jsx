import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Cookies from 'js-cookie';
import './index.css';
import { cartContainer } from '../../context/ContextProvider';
import { useContext } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const {setShowFoodItems}=useContext(cartContainer)

  const handleLogout = () => {
    Cookies.remove('jwt_token');
    navigate('/login', { replace: true });
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(true);
    setShowFoodItems(false)
  };
  const handleWrongButton=()=>{
    setShowMobileMenu(false)
  }

  return (
    <>
      <div className="navbar-container">
          <div className="logo-section">
            <img
              src="https://res.cloudinary.com/diamwuucf/image/upload/v1752063703/Frame_274_zmdjy8.png"
              alt="logo"
              className="logo"
            />
            <h1 className="brand-name">Tasty Kitchens</h1>
          </div>

          <ul className="nav-list">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/cart" className="nav-link">Cart</Link></li>
            <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
          </ul>

        <button className="menu-button" onClick={toggleMobileMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth={1.5} stroke="currentColor" className="hamburger-icon">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

      </div>
      
        {showMobileMenu && (
          <div className="show-mobile-menu-container">
            <div className="mobile-menu">
              <Link to="/" className="nav-link" onClick={toggleMobileMenu}>Home</Link>
              <Link to="/cart" className="nav-link" onClick={toggleMobileMenu}>Cart</Link>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
            <svg onClick={handleWrongButton} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="wrong-icon">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
          )}
      </>
  );
  
}

export default Navbar;
