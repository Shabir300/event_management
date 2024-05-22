import React from 'react';
import './eventCard.scss';

const EventCard = () => {
  return (
    <div className='eventCard'>
        
        <img className='eventCard_image' alt='event' src='/static/eventImage.png' />
        <div className='eventCard_description'>
            <div>
                NOV <br /> 24
            </div>
            <div>
                    <span>Lakeside Camping at Pawna</span>
                    <span>Online</span>
                    <span>8:30 AM - 7:30 PM</span>
                    <span>Interested  *Free</span>

            </div>
        </div>
    </div>
  )
}

export default EventCard;