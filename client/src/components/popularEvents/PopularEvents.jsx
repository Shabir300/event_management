import React from 'react';
import './popularEvents.scss';
import EventCard from '../eventCard/EventCard';
import { useSelector } from 'react-redux'

const PopularEvents = () => {

  const searchedEvents = useSelector(state => state.events.value);
  // console.log('redux events:', searchedEvents);

  return (
    <div className='popularEvents'>
        <div className="popularEvents_section-title">
            Explore Events Around The City
        </div>
        <div>
          {searchedEvents?.map(event => (
            <EventCard event={event} />
          ))}
        </div>

    </div>
  )
}

export default PopularEvents