import React from 'react';
import './eventCard.scss';

const EventCard = ({event}) => {
  console.log('event', event);
  // const tickets = 
  const tickets = JSON.parse(event.tickets);


  return (
    <div className='eventCard'>
      <div className='eventCard_imageWrapper'>
        <img className='eventCard_image' alt='event' src={event.coverPic ? `/uploads/${event.coverPic}` : '/static/eventImage.png'} />
      </div>
      <div className='eventCard__description'>
          <div>
              NOV <br /> 24
          </div>
          <div>
                  <span>{event.title}</span>
                  <span>Online</span>
                  <span>{event.startDate} - {event.endDate}</span>
                  <div className='eventCard__tickets'>
                  {tickets?.map(ticket => (
                    <span>{ticket.ticketName} - {ticket.ticketPrice}</span>
                  ))}
                  </div>

          </div>
      </div>
    </div>
  )
}

export default EventCard;