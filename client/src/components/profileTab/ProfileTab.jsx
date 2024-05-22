import Dropdown from 'react-bootstrap/Dropdown';
import './profileTab.scss';
import {Link} from 'react-router-dom';
import { makeRequest } from '../../axios';

function BasicExample() {

    const handleLogOut = async (e) => {
        e.preventDefault();
        try {
           const res = await makeRequest.post('/logout');
           console.log('res of logout', res)
           return res;
        } catch (err) {
            return err;
        }
    };


  return (
    <Dropdown className='m-0 p-0'>
      <Dropdown.Toggle className='border border-0 text-light p-0 m-0' variant="success" id="dropdown-basic">
      <i class="bi bi-person-circle"></i>
        Profile
      </Dropdown.Toggle>

      <Dropdown.Menu className='menu dropdown-menu-dark'>
        <Dropdown.Item  className='hover-dark'>
            <Link>
            Interests
            </Link>
            </Dropdown.Item>
        <Dropdown.Item >
            <Link to='profile'>
            Account Settings
            </Link>
          </Dropdown.Item>
            <Dropdown.Item onClick={handleLogOut}>
                 Log Out
            </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default BasicExample;