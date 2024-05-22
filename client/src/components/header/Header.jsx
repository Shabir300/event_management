import React, { useContext } from 'react'
import './header.scss';
import { AuthContext } from '../../context/authContext';
import BasicExample from '../profileTab/ProfileTab';

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
                <li>Home</li>
                <li>Events</li>
                <li>About</li>
                <li>Contact</li>
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