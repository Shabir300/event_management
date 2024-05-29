import React, { useEffect, useState } from 'react';
import './event.scss';
import Header from '../../components/header/Header';
import { useParams } from 'react-router-dom';
import { makeRequest } from '../../axios.js';
import moment from 'moment';

const Event = () => {
    const {id} = useParams();
    const [liked, setLiked] = useState(true);
    const [event, setEvent] = useState({});
    const [tickets, setTickets] = useState([]);
    const [organizer, setOrganizer] = useState({});

useEffect(() => {

    const fetchOrganizer = async (id) => {
        try {
            const res = await makeRequest.get(`/get-organizer?id=${id}`);
            setOrganizer(res.data);
            console.log('user here', res)
            return res;
        } catch (err) {
            return err;
        }
    }

    const fetchEvent = async () => {
        try {
            const res = await makeRequest.get(`/event/${id}`);
            setEvent(res.data[0]);
            const tickets = res.data[0].tickets;
            const ticketsArray = JSON.parse(tickets);
            setTickets(ticketsArray);
            await fetchOrganizer(res.data[0].userId);
            return res;
        } catch (err) {
            return err;
        }
    };

    fetchEvent();

}, [id]);

console.log('organizer', organizer)

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
                <h1>{event?.title}</h1>
                <div className='singleEvent_titleShare_Icons'>
                    <i class={`bi bi-star${liked ? '-fill' : ''}`}></i>
                    <i class="bi bi-share"></i>
                </div>
            </div>
            <div className='singleEvent_dateTicket'>
                <div className='singleEvent_dateTicket_fullDate'>
                    <h4>Date and Time</h4>
                    {/* <span><i class="bi bi-calendar-date-fill"></i>Saturday, 2 December 2023</span> */}
                    <span><i class="bi bi-calendar-date-fill"></i>{moment(event?.startDate).format('dddd,  Do MMMM YYYY')}</span>
                    <span><i class="bi bi-clock"></i>{moment(event?.startDate).format('h:mm A')} - {moment(event?.endDate).format('h:mm A')}</span>
                    <a href='lkl'>+ Add to Calendar</a>
                </div>
                <div className='singleEvent_dateTicket_tickets'>
                    <div>
                        <i class="bi bi-ticket-perforated"></i>
                        <button>Buy Tickets</button>
                    </div>
                    <div>
                        <h5>Ticket Information</h5>
                        {/* <h6>Standard Ticket: ₹ 200 each</h6> */}
                        {tickets?.map(ticket => (
                            <h6>{ticket.ticketName} - $ {ticket.ticketPrice}</h6>
                        ))}
                    </div>
                </div>
            </div>
            <div className='singleEvent_location'>
                <h4>Location</h4>
                <div className='singleEvent_location_iconandplace'>
                    <i class="bi bi-geo-alt-fill"></i>
                    <h6>{event?.location}
                    </h6>
                </div>
            </div>
            <div className='singleEvent_hostedBy'>
                <h4>Hosted By</h4>
                <div className='singleEvent_hostedBy_Organizer'>
                    <img alt='organizer' src={organizer?.profilePic ? `/uploads/${organizer.profilePic}` : '/static/hostImage.png'} />
                    <div className='singleEvent_hostedBy_Organizer_desc'>
                        <h7>{organizer?.name}</h7>
                        <div className='singleEvent_hostedBy_Organizer_desc_btns'>
                            <button>Contact</button>
                            <button> Follow</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='singleEvent_eventDescription'>
                <h4>Event Description</h4>
                <p>{event?.description}</p>
            </div>

            <div className='singleEvent_tags'>
                <h4>Category</h4>

                <div className='singleEvent_tags_texts'>
                    <span>{event?.category}</span>
                </div>

            </div>
        </div>
    </div>
</>

  )
}

export default Event