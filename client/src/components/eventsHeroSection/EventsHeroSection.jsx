import { makeRequest } from '../../axios.js';
import './eventHeroSection.scss';
import { useState } from 'react';
import { setEvents } from '../../redux/eventSlice';
import { useDispatch } from 'react-redux'

const EventsHeroSection = () => {

  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    try {
      const res = await makeRequest.get(`/get-event-search?search=${e.target.value}`);
      dispatch(setEvents(res.data));
      // console.log('search res: ', res);
      return res;
    } catch (err) {
      return err;
    }
  }

  return (
    <div className='eventHeroSection'>
        <div>
            <h1>Explore the world of events. Find what excites you!
            </h1>
        </div>
        <div>
            <input type='text'
              value={search}
              onChange={handleSearch}
              placeholder='Search Events, Categories, Location,...'
            />
           <i class="bi bi-search"></i>
        </div>
    </div>
  )
}

export default EventsHeroSection