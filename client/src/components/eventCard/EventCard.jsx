import React from 'react';
import './eventCard.scss';

const EventCard = ({event}) => {
  console.log('event', event)
  return (
    <div className='eventCard'>
        
        <img className='eventCard_image' alt='event' src='/static/eventImage.png' />
        <div className='eventCard_description'>
            <div>
                NOV <br /> 24
            </div>
            <div>
                    <span>{event.title}</span>
                    <span>Online</span>
                    <span>{event.startDate} - {event.endDate}</span>
                    <span>Interested  *Free</span>

            </div>
        </div>
    </div>
  )
}

export default EventCard;