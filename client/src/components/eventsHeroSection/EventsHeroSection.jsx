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
  const filteredCategories = useSelector(state => state.categories.filteredCategories);
  const filteredPricing = useSelector(state => state.events.filteredPricing);
  const filteredDate = useSelector(state => state.events.filteredStartDate);
  // const cats = filteredCategories.join(', ');


  console.log('start date', filteredDate)

   useEffect(()=> {
     const handleFetch = async () => {
       try {

         const query = new URLSearchParams({
           search,
           location: citySearch,
           sortBy,
           filteredCategories: JSON.stringify(filteredCategories),
           free: filteredPricing === true ? 1 : filteredPricing === false ? 0 : filteredPricing === null && null,
           startDate: filteredDate,
          }).toString();
          
          const res = await makeRequest.get(`/get-event-search?${query}`);
          dispatch(setEvents(res.data));
          // console.log('search res: ', res);
          return res;
        } catch (err) {
         return err;
       }
     }
     handleFetch();
   }, [search, citySearch, sortBy, filteredCategories, filteredPricing, filteredDate, dispatch]);


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