import React, { useContext } from 'react'
import './header.scss';
import { AuthContext } from '../../context/authContext';
import BasicExample from '../profileTab/ProfileTab';
import { Link } from 'react-router-dom';

const Header = () => {

  const {currentUser} = useContext(AuthContext);
  console.log('user here: ', currentUser)

  return (
    <div className='header'>
        <div >
           <a href='http://localhost:3000/'> <img className='header_image' src='/static/Logo.png' alt='logo' /></a>
        </div>

        <div>
            <ul className='header_navs'>
              <li><Link className='link' to='/'>Home</Link></li>
              <li><Link className='link' to='/events'>Events</Link></li>
              <li><Link className='link' to='/about'>About</Link></li>
              <li><Link className='link' to='/contact'>Contact</Link></li>
            </ul>
        </div>

        <div className='registerBtns'>
          <button><a href='http://localhost:3000/createEvent'>Create Event</a></button>

          {!currentUser ? (
            <>
          <button ><a href='http://localhost:3000/login'>Login</a></button>
          <button ><a href='http://localhost:3000/register'>Sign Up</a></button>
            </>
          ) : (
            <>
          <button className='registeredBtn'><i class="bi bi-ticket-perforated"></i>Tickets</button>
          <button className='registeredBtn'><i class="bi bi-star"></i>Interested</button>
          {/* <button className='registeredBtn'><i class="bi bi-person-circle"></i>Profile</button> */}
          <BasicExample />
            </>
          )}

        </div>
    </div>
  )
}

export default Header