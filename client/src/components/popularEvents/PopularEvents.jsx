import React from 'react';
import './popularEvents.scss';
import EventCard from '../eventCard/EventCard';
import { useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';

const PopularEvents = () => {

  const searchedEvents = useSelector(state => state.events.value);
  const [sortBy, setSortBy] = useState('Price (high to low)')
  // console.log('redux events:', searchedEvents);

  return (
    <div className='popularEvents'>
        
        <div className="popularEvents_section-title">
            Explore Events Around The City
                <div className='popularEvents__sortBy'>
                    Sort by: 
                    <Dropdown>
                      <Dropdown.Toggle className='bg-white text-dark mw-100' id="">
                        {sortBy}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setSortBy('Price (high to low)')}>{`Price (high to low)`}</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSortBy('Price (low to high)')}>{`Price (low to high)`}</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSortBy('Start date')}>{`Start date`}</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                </div>
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