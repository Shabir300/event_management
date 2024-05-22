import React from 'react';
import './event.scss';
import Header from '../../components/header/Header';

const Event = () => {
  return (
<>
    <Header/>
    <div className='singleEvent'>
        
        <div>
            <img alt='event-img' src='/static/singleEventImage.png' />
            <i class="bi bi-arrow-left"></i>
        </div>

        <div>
            <div className='singleEvent_titleShare'>
                <h1>Lake of Muree 2021</h1>
                <div className='singleEvent_titleShare_Icons'>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-share"></i>
                </div>
            </div>
            <div className='singleEvent_dateTicket'>
                <div className='singleEvent_dateTicket_fullDate'>
                    <h4>Date and Time</h4>
                    <span><i class="bi bi-calendar-date-fill"></i>Saturday, 2 December 2023</span>
                    <span><i class="bi bi-clock"></i>6:30 PM - 9:30 PM</span>
                    <a href='lkl'>+ Add to Calendar</a>
                </div>
                <div className='singleEvent_dateTicket_tickets'>
                    <div>
                        <i class="bi bi-ticket-perforated"></i>
                        <button>Buy Tickets</button>
                    </div>
                    <div>
                        <h5>Ticket Information</h5>
                        <h6>Standard Ticket: ₹ 200 each</h6>
                    </div>
                </div>
            </div>
            <div className='singleEvent_location'>
                <h4>Location</h4>
                <div className='singleEvent_location_iconandplace'>
                    <i class="bi bi-geo-alt-fill"></i>
                    <h6>Bal Gandharva Rang Mandir, Near Junction Of 24th & 32nd 
                        Road & Patwardhan Park,Off Linking Road, Bandra West., 
                        Mumbai, India
                    </h6>
                </div>
            </div>
            <div className='singleEvent_hostedBy'>
                <h4>Hosted By</h4>
                <div className='singleEvent_hostedBy_Organizer'>
                    <img alt='organizer' src='/static/hostImage.png' />
                    <div className='singleEvent_hostedBy_Organizer_desc'>
                        <h7>City Movement</h7>
                        <div className='singleEvent_hostedBy_Organizer_desc_btns'>
                            <button>Contact</button>
                            <button> Follow</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='singleEvent_eventDescription'>
                <h4>Event Description</h4>
                <p>Get ready to kick off the Christmas season in Mumbai with SOUND OF CHRISTMAS - your favourite LIVE Christmas concert!
                City Youth Movement invites you to the 4th edition of our annual Christmas festivities - by the youth and for the youth! Feat. your favourite worship leaders, carols, quizzes and some exciting surprises!
                Bring your family and friends and sing along your favourite Christmas carols on the 2nd of December, 6:30 PM onwards at the Balgandharva Rang Mandir, Bandra West. Book your tickets now!
                </p>
            </div>

            <div className='singleEvent_tags'>
                <h4>Tags</h4>

                <div className='singleEvent_tags_texts'>
                    <span>#Live performance</span>
                    <span>#Seasonal Event</span>
                    <span>#Family-Friends</span>
                    <span>#Trade</span>
                    <span>#Tech</span>
                    <span>#Cyber</span>
                </div>

            </div>
        </div>
    </div>
</>

  )
}

export default Event