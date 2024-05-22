import React, {useEffect, useRef} from 'react';
import './createEvent.scss';
import Header from '../../components/header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from '../../components/dropdown/Dropdown';
import BreadcrumbExample from '../../components/breadcrumbs/BreadCrumbs';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { useState } from 'react';


const CreateEvent = () => {

    const [currentForm, setCurrentForm] = useState('Edit');

   
    const handleNextPage = (e) => {
        e.preventDefault();
        if(currentForm === 'Edit') {
            setCurrentForm('Banner')
        } else if (currentForm === 'Banner') {
            setCurrentForm('Ticketing')
        } else if (currentForm === 'Ticketing') {
            setCurrentForm('Review');
        }
    }

    const EditForm = () => {

        const startDateRef = useRef(null);
        const endDateRef = useRef(null);
    
        useEffect(() => {
          flatpickr(startDateRef.current, {
            // Options for configuring Flatpickr
            // dateFormat: 'Y-m-d', // Example date format
            // Add any other options you need
            enableTime: true,
        dateFormat: "Y-m-d H:i",
    
          });
    
          flatpickr(endDateRef.current, {
            enableTime: true,
            dateFormat: "Y-m-d H:i"
          })
    
        }, []);


        return (
            <div className='createEvent__inputsForm'>

            <div className='createEvent__inputsForm__details'>
                <span className='createEvent__inputsForm__details__title'>Event Details</span>
        
                <div className='createEvent__inputsForm__details__inputBox'>
                    <label>Event Title</label>
                    <input type='text' placeholder='Enter the name of your event' />
                </div>
        
                <div className='createEvent__inputsForm__details__inputBox'>
                    <label>Event Category</label>
                    {/* <input type='text' placeholder='Please select one' /> */}
                    <Dropdown placeholder={'Select a category'} />
                    {/* <SearchDropdown /> */}
                </div>
        
            </div>
        
            <div className='createEvent__inputsForm__dateTime'>
                <span className='createEvent__inputsForm__dateTime__title'>Date & Time</span>
                {/* <h4>Event Type</h4> */}
                <div className='createEvent__inputsForm__dateTime__radiosBox'>
                <label>Event Type</label>
                    <input class="form-check-input radioInput" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                    <label class="form-check-label" for="flexRadioDefault1">
                        Single Event
                    </label>
        
                    <input class="form-check-input radioInput" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                    <label class="form-check-label" for="flexRadioDefault1">
                        Recurring Event
                    </label>
        
                </div>
        
                <div className='createEvent__inputsForm__dateTime__InputPickers'>
        
                    <div className='createEvent__inputsForm__dateTime__inputBox'>
                        <label>Start Date</label>
                        <input type="text" ref={startDateRef} placeholder='Enter start of the event' />
                        <i class="bi bi-calendar3"></i>
                        {/* <input type='text' placeholder='Enter start of the event' /> */}
                    </div>
        
                    <div className='createEvent__inputsForm__dateTime__inputBox'>
                        <label>End Date</label>
                        <input type="text" ref={endDateRef} placeholder='Enter the end of the event' />
                        <i class="bi bi-calendar3"></i>
                        {/* <input type='text' placeholder='Enter the end of the event' /> */}
                    </div>
        
                </div>
        
            
            </div>
        
            <div className='createEvent__inputsForm__location'>
                <span className='createEvent__inputsForm__location__title'>Location</span>
                <div className='createEvent__inputsForm__location__inputBox'>
                    <label>Enter the location</label>
                    {/* <input type='text' placeholder='Enter start of the event' /> */}
                    <Dropdown placeholder={'Select a location'} />
        
                </div>
            
            </div>
        
            <div className='createEvent__inputsForm__description'>
                <span className='createEvent__inputsForm__description__title'>Additional Information</span>
                <div className='createEvent__inputsForm__description__inputBox'>
                    <label>Event Description</label>
                    <textarea placeholder="Enter some description..."></textarea>
        
                </div>
            
            </div>
    
            
        </div>
        )
    }

    const BannerForm = () => {

        const [banner, setBanner] = useState(null);
        const [bannerTypeError, setBannerTypeError] = useState('')
        const imageTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

        const handleBanner = (e) => {
            const file = e.target.files[0];
            if(file) {
                if(imageTypes.includes(file.type)) {
                    setBanner(file);
                    setBannerTypeError('')
                } else {
                    setBannerTypeError('Invalid file format')
                }
            }
        }

        return (
        <div className='createEvent__inputsForm'>

            <div className='createEvent__inputsForm__details'>
                <span className='createEvent__inputsForm__details__title'>Upload Image</span>
        
                <div className='createEvent__inputsForm__details__inputBox'>
                    {/* <label>Event Title</label> */}
                    <input type='file' onChange={e => handleBanner(e)}  />
                    <span>Feature Image must be at least 1170 pixels wide by 504 pixels high.<br />
                    Valid file formats: JPG, GIF, PNG.
                    </span>
                    {bannerTypeError && 
                    <span className='text-danger fw-bold'> <i class="bi bi-exclamation-triangle me-1"></i>{bannerTypeError}</span>
                    }
                    
                </div>
        
            </div>

        </div>
        )
    };

    const TicketingForm = () => {
        return (
            <div className='createEvent__ticketing'>

            <div className='createEvent__ticketing__details'>
                <span className='createEvent__ticketing__details__title'>What type of event are you running?</span>
        
                <div className='createEvent__ticketing__details__typeBox'>
                    <div className='createEvent__ticketing__details__typeBox__singleType'>
                        <i class="bi bi-ticket-perforated"></i>
                        <span className='fw-bold'>Ticketed Event</span>
                        <span>My event requires tickets for entry</span>
                    </div>
                    <div className='createEvent__ticketing__details__typeBox__singleType'>
                        <i class="bi bi-ticket-perforated"></i>
                        <span className='fw-bold'>Free Event</span>
                        <span>I am running a free event</span>
                    </div>
                </div>

        
            </div>

            <div className='createEvent__inputsForm'>

                <div className='createEvent__inputsForm__details'>
                    <span className='createEvent__inputsForm__details__title'>What tickets are you selling?</span>

                    <div className='createEvent__inputsForm__details__inputBox'>
                        <label>Ticket Name</label>
                        <input type='text' placeholder='Ticket Name e.g. General Admission' />
                    </div>

                    <div className='createEvent__inputsForm__details__inputBox'>
                        <label>Ticket Price</label>
                        <input type='number' placeholder='0.00' />
                        {/* <Dropdown placeholder={'Select a category'} /> */}
                        {/* <SearchDropdown /> */}
                    </div>

                </div>

            </div>
        </div>
        )
    };


    const FormComponent = () => {
        switch (currentForm) {
            case 'Edit':
                 return <EditForm />;
            case 'Banner':
                return <BannerForm />;
            case 'Ticketing':
                return <TicketingForm />;
            default: 
            return null;
        }
    }
    

  return (
    <div>
        <Header />

        <div className='createEvent'>
            <span className='createEvent_title'>Create a New Event</span>
            
            <BreadcrumbExample currentForm={currentForm} setCurrentForm={setCurrentForm} />

            {/* <EditForm /> */}
            {/* <BannerForm /> */}
            {/* <TicketingForm /> */}
            <FormComponent />
            

            <button 
            onClick={handleNextPage}
            className='createEvent__saveBtn'>Save & Continue
            </button>
        </div>
    </div>
  )
}

export default CreateEvent