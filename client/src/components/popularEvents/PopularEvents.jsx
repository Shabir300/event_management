import React from 'react';
import './popularEvents.scss';
import EventCard from '../eventCard/EventCard';

const PopularEvents = () => {
  return (
    <div className='popularEvents'>
        <div className="popularEvents_section-title">
            Popular Events In Islamabad
        </div>
        <div>
          <EventCard/>
          <EventCard/>
          <EventCard/>
          <EventCard/>
          <EventCard/>
          <EventCard/>

        </div>

    </div>
  )
}

export default PopularEvents