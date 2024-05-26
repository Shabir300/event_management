import { makeRequest } from '../../axios.js';
import './eventHeroSection.scss';
import { useEffect, useState } from 'react';
import { setEvents } from '../../redux/eventSlice';
import { useDispatch, useSelector } from 'react-redux';
import SearchLocationDropdown from '../searchLocationDropdown/SearchLocationDropdown.jsx'

const EventsHeroSection = () => {

  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const citySearch = useSelector(state => state.events.search);
  const sortBy = useSelector(state => state.events.sortBy);
  
   
   useEffect(()=> {
     const handleFetch = async () => {
       try {
         const res = await makeRequest.get(`/get-event-search?search=${search}&location=${citySearch}&sortBy=${sortBy}`);
         dispatch(setEvents(res.data));
         // console.log('search res: ', res);
         return res;
       } catch (err) {
         return err;
       }
     }
     handleFetch();
   }, [search, citySearch, sortBy, dispatch]);


  const handleSearch = (e) => {
    setSearch(e.target.value)
  }
  


  return (
    <div className='eventHeroSection'>
        <div>
            <h1>Explore the world of events. Find what excites you!
            </h1>
        </div>
        <div className='eventHeroSection__searchBox'>
            <input type='text'
            className='eventHeroSection__searchBox__searchInput'
              value={search}
              onChange={handleSearch}
              placeholder='Search Events, Categories, Location,...'
            />
           {/* <i class="bi bi-search"></i> */}
           <SearchLocationDropdown />
        </div>
    </div>
  )
}

export default EventsHeroSection