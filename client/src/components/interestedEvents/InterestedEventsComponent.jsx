import React, { useEffect } from 'react';
import './popularEvents.scss';
import EventCard from '../eventCard/EventCard';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';
import { setSortBy } from '../../redux/eventSlice';
import Filters from '../filtersOffCanvas/FiltersOffCanvas'
import { makeRequest } from '../../axios';

const InterestedEventsComponent = () => {

  const dispatch = useDispatch();
  const searchedEvents = useSelector(state => state.events.value);
  // const [sortBy, setSortBy] = useState('Price (high to low)')
  // console.log('redux events:', searchedEvents);
  // const sortBy = useSelector(state => state.events.sortBy);
  const [interestedEventsIds, setInterestedEventsIds] = useState([]);
  const [interestedEvents, setInterestedEvents] = useState([]);

useEffect(() => {

  const fetchEventsInterested = async (ids) => {
    try {
      const query = new URLSearchParams({
        ids,
      }).toString();

      const res = await makeRequest.get(`/interested-events-objs?${query}`);
      setInterestedEvents(res.data);
      console.log('events of interest', res)
      return res;
    } catch (err) {
      return err;
    }
  }

  const fetchInterestedEvents = async () => {
    try {
      const res = await makeRequest.get('/interested-events');
      console.log('interested events here: ', res);
      setInterestedEventsIds(res.data.map(interest => interest.eventId));
      const ids = res.data.map(interest => interest.eventId);
      await fetchEventsInterested(ids);
      return res;
    } catch(err) {
      return err;
    }
  };
  fetchInterestedEvents();

}, []);

console.log('interested events here: ', interestedEvents)

  return (
  <>
    <div className='popularEvents'>
    {/* <Filters /> */}

        <div className="popularEvents__section-title">
          Interested Events
          
          {/* <div className='popularEvents__headerFilters'>
            <Filters />

            <div className='popularEvents__sortBy'>
                Sort by: 
                <Dropdown>
                  <Dropdown.Toggle 
                  style={{width: '180px', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
                  className='bg-white text-dark border border-dark' id="">
                    {sortBy}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => dispatch(setSortBy('Price (high to low)'))}>{`Price (high to low)`}</Dropdown.Item>
                    <Dropdown.Item onClick={() => dispatch(setSortBy('Price (low to high)'))}>{`Price (low to high)`}</Dropdown.Item>
                    <Dropdown.Item onClick={() => dispatch(setSortBy('Start date'))}>{`Start date`}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
            </div>

          </div> */}

        </div>
        <div>
          {interestedEvents && interestedEvents?.map(event => (
            <EventCard event={event} />
          ))}
        </div>
    </div>
</>
  )
}

export default InterestedEventsComponent