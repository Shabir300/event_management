import React, { useEffect } from 'react';
import PopularEvents from '../../components/popularEvents/PopularEvents';
import Header from '../../components/header/Header';
import EventHeroSection from '../../components/eventsHeroSection/EventsHeroSection';
import { makeRequest } from '../../axios.js';
import { setEvents } from '../../redux/eventSlice.js';
import { useDispatch } from 'react-redux';

const Events = () => {

    // const dispatch = useDispatch();

    // useEffect(() => {
    //     const fetchEvents = async () => {
    //         try {
    //             const res = await makeRequest.get(`/get-event-search?search=`);
    //             dispatch(setEvents(res.data));
    //             // console.log('search res: ', res);
    //             return res;
    //           } catch (err) {
    //             return err;
    //           }
    //     };
    //     fetchEvents();

    // }, []);

  return (
    <div>
        <Header />
        <EventHeroSection />
        <PopularEvents  />
    </div>
  )
}

export default Events;