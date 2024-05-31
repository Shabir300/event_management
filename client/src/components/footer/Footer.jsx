import React from 'react';
import {Container} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import './footer.scss';

const Footer = () => {
  return (
    <Container fluid className='footer pt-5  px-5 d-flex flex-column'>
        <Row className='gy-5'>
            <Col  xs={6}  md={3} className='d-flex flex-column gap-1'>
                <p className='h6'>Company Info</p>
                <span className='item'>About Us</span>
                <span className='item'>Contact Us</span>
                <span className='item'>Careers</span>
                <span className='item'>FAQs</span>
                <span className='item'>Terms of Service</span>
                <span className='item'>Privacy Policy</span>

            </Col>

            <Col xs={6}  md={3}  className='d-flex flex-column gap-1'>
                <p className='h6'>Help</p>
                <span className='item'>Account Support</span>
                <span className='item'>Listing Events</span>
                <span className='item'>Event Ticketing</span>
                <span className='item'>Ticket purchase Terms & Conditions</span>

            </Col>

            <Col  xs={6}  md={3} className='d-flex flex-column gap-1'>
                <p className='h6'>Categories</p>
                <span className='item'>Tech Conferences</span>
                <span className='item'>Educational Activities</span>
                <span className='item'>Arts & Antiques</span>
                <span className='item'>Summer Camps</span>
                <span className='item'>Jewelry Exhibitions</span>
                <span className='item'>Coding Contests</span>

            </Col>

            <Col  xs={6}  md={3} className='d-flex flex-column gap-1'>
                <p className='h6'>Follow Us</p>
                <span className='item'>Facebook</span>
                <span className='item'>Twitter</span>
                <span className='item'>Youtube</span>
                <span className='item'>Instagram</span>
            </Col>

        </Row>

        <Row className=' border-top border-dark-subtle mt-5'>
            <Col className='text-center mt-3'>
                <p className='item'>@ 2023 Eventify. All rights reserved.</p>
            </Col>
        </Row>
    </Container>
  )
}

export default Footer