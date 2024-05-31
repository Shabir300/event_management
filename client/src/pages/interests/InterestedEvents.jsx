import React from 'react'
import Header from '../../components/header/Header';
import InterestedEventsComponent from '../../components/interestedEvents/InterestedEventsComponent';
import Footer from '../../components/footer/Footer';

const InterestedEvents = () => {
  return (
    <div>
        <Header />
        <InterestedEventsComponent />
        <Footer />
    </div>
  )
}

export default InterestedEvents;