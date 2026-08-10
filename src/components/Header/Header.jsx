import React, { useState } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { nav_assets } from '../../assets/assets';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { totalCount } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNav = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  return (
    <div className='header'>
      <div>
        <Link to='/'> <img className='nav_logo' src={nav_assets.logo} alt="Les Paul Garage logo" /> </Link>
      </div>

      <div className='nav_block'>
        <ul className='navigation'>
          <li><Link to='/'>Main Page</Link></li>
          <li><Link to='/Find_Artists'>Find Artists</Link></li>
          <li><Link to='/Guitars'>Guitars</Link></li>
          <li><Link to='/AboutUs'>About Us</Link></li>
        </ul>
      </div>

      <div>
        <Link to='/Cart' className='nav_cart'>
          <span>Cart</span>
          <span className='nav_cart_icon_wrap'>
            <img className="nav_cart_img" src={nav_assets.cart} alt="" />
            {totalCount > 0 && <span className='nav_cart_badge'>{totalCount}</span>}
          </span>
        </Link>
      </div>

      <button type="button" className="nav_burger" onClick={toggleMenu} aria-expanded={isMenuOpen} aria-label="Toggle menu">
        <img src={nav_assets.burger} className="nav_burger_img" alt="" />
      </button>

      {isMenuOpen && (
        <div className='nav_burger_menu'>
          <ul className='navigation'>
            <li><button type="button" onClick={() => handleNav('/')}>Main Page</button></li>
            <li><button type="button" onClick={() => handleNav('/Find_Artists')}>Find Artists</button></li>
            <li><button type="button" onClick={() => handleNav('/Guitars')}>Guitars</button></li>
            <li><button type="button" onClick={() => handleNav('/AboutUs')}>About Us</button></li>
            <li><button type="button" onClick={() => handleNav('/Cart')}>Cart</button></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
