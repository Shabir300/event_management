import React from 'react';
import './popularEvents.scss';
import EventCard from '../eventCard/EventCard';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';
import { setSortBy } from '../../redux/eventSlice';

const PopularEvents = () => {

  const dispatch = useDispatch();
  const searchedEvents = useSelector(state => state.events.value);
  // const [sortBy, setSortBy] = useState('Price (high to low)')
  // console.log('redux events:', searchedEvents);
  const sortBy = useSelector(state => state.events.sortBy);

  return (
    <div className='popularEvents'>
        
        <div className="popularEvents_section-title">
            Explore Events Around The City
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