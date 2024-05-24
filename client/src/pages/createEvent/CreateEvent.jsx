import React, {useEffect, useRef} from 'react';
import './createEvent.scss';
import Header from '../../components/header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from '../../components/dropdown/Dropdown';
import BreadcrumbExample from '../../components/breadcrumbs/BreadCrumbs';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { useState } from 'react';
import { makeRequest } from '../../axios';


const CreateEvent = () => {

    const [currentForm, setCurrentForm] = useState('Edit');
    const [banner, setBanner] = useState(null);
    const [bannerUrl, setBannerUrl] = useState('');
    
    const [inputs, setInputs] = useState({
        title: '',
        category: '',
        type: '',
        startDate: '',
        endDate: '',
        location: '',
        description: '',
        free: false,
    });
    
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };
    
    const [ticketInputs, setTicketInputs] = useState([
        {
            id: 1,
            name: '',
            price: 0,
        },
    ]);

    const handleAddTicket = () => {
        const updatedTickets = [...ticketInputs, {id: ticketInputs.length + 1, name: '', price: 0}];
       setTicketInputs(updatedTickets)
    };

    const handleRemoveTicket = (id) => {
        const updatedTickets = [...ticketInputs]
        const filteredTickets = updatedTickets.filter(ticket => ticket.id !== id);
        setTicketInputs(filteredTickets);
    };

    const handleTicketChange = (id, field, value) => {
        setTicketInputs(prevTickets => 
            prevTickets.map((ticket) => 
            ticket.id === id ? {...ticket, [field]: value} : ticket),
        )
    }

    // console.log('TICKET');

    const handleSaveEvent = async () => {
        const bodyInputs = {
            title: inputs.title,
            category: inputs.category,
            type: inputs.type,
            startDate: inputs.startDate,
            endDate: inputs.endDate,
            location: inputs.location,
            description: inputs.description,
            free: inputs.free ? 1 : 0,
        }
        try {
            const res = await makeRequest.post('/event', bodyInputs);
            console.log('save event: ', res)
            return res;
        } catch (err) {
            return err;
        }
    }

    const handleUploadBanner = async () => {
        const formData = new FormData();
        formData.append('file', banner);

        try {
            const res = await makeRequest.post('/upload', formData);
            await handleSaveEvent();
            return res;
        } catch (err) {
            return err;
        }
    };
   
    const handleNextPage = (e) => {
        e.preventDefault();
        if(currentForm === 'Edit') {
            setCurrentForm('Banner')
        } else if (currentForm === 'Banner') {
            setCurrentForm('Ticketing')
        } else if (currentForm === 'Ticketing') {
            handleUploadBanner()
        }
    }

    const EditForm = () => {
        

        const startDateRef = useRef(null);
        const endDateRef = useRef(null);
        // const [type, setType] = useState('');

        const handleStartDate = (selectedDates, dateStr, instance) => {
            setInputs(prev => ({...prev, startDate: dateStr}));
        };

        const handleEndDate = (selectedDates, dateStr, instance) => {
            setInputs(prev => ({...prev, endDate: dateStr}));
        }


        useEffect(() => {
          flatpickr(startDateRef.current, {
            enableTime: true,
            dateFormat: "d-m-Y H:i",
            onChange: handleStartDate,
          });
    
          flatpickr(endDateRef.current, {
            enableTime: true,
            dateFormat: "d-m-Y H:i",
            onChange: handleEndDate
          })
    
        }, []);


        const handleTypeChange = (e) => {
            setInputs(prev => ({...prev, type: e.target.name}));
        };

        console.log('start date time here: ', inputs.startDate);

        return (
            <div className='createEvent__inputsForm'>

            <div className='createEvent__inputsForm__details'>
                <span className='createEvent__inputsForm__details__title'>Event Details</span>
        
                <div className='createEvent__inputsForm__details__inputBox'>
                    <label>Event Title</label>
                    <input  name='title' value={inputs.title}  type='text' placeholder='Enter the name of your event' onChange={handleEditChange}  />
                </div>
        
                <div className='createEvent__inputsForm__details__inputBox'>
                    <label>Event Category</label>
                    <input  name='category' type='text' placeholder='Please select one' 
                     value={inputs.category} onChange={handleEditChange} />
                    {/* <Dropdown placeholder={'Select a category'} /> */}
                    {/* <SearchDropdown /> */}
                </div>
        
            </div>
        
            <div className='createEvent__inputsForm__dateTime'>
                <span className='createEvent__inputsForm__dateTime__title'>Date & Time</span>
                <div className='createEvent__inputsForm__dateTime__radiosBox'>
                <label>Event Type</label>
                    <input onChange={handleTypeChange} class="form-check-input radioInput" type="radio" name="singleEvent" checked={inputs.type === 'singleEvent'} id="flexRadioDefault1" />
                    <label class="form-check-label" for="flexRadioDefault1">
                        Single Event
                    </label>
        
                    <input onChange={handleTypeChange} class="form-check-input radioInput" type="radio" name="recurringEvent" checked={inputs.type === 'recurringEvent'} id="flexRadioDefault1" />
                    <label class="form-check-label" for="flexRadioDefault1">
                        Recurring Event
                    </label>
        
                </div>
        
                <div className='createEvent__inputsForm__dateTime__InputPickers'>
        
                    <div className='createEvent__inputsForm__dateTime__inputBox'>
                        <label>Start Date</label>
                        <input type="text" ref={startDateRef} value={inputs.startDate} onChange={handleStartDate} placeholder='Enter start of the event' />
                        <i class="bi bi-calendar3"></i>
                        {/* <input type='text' placeholder='Enter start of the event' /> */}
                    </div>
        
                    <div className='createEvent__inputsForm__dateTime__inputBox'>
                        <label>End Date</label>
                        <input type="text" ref={endDateRef} value={inputs.endDate} placeholder='Enter the end of the event' />
                        <i class="bi bi-calendar3"></i>
                        {/* <input type='text' placeholder='Enter the end of the event' /> */}
                    </div>
        
                </div>
        
            </div>
        
            <div className='createEvent__inputsForm__location'>
                <span className='createEvent__inputsForm__location__title'>Location</span>
                <div className='createEvent__inputsForm__location__inputBox'>
                    <label>Enter the location</label>
                    <input  value={inputs.location} 
                    onChange={e => setInputs(prev => ({...prev, location: e.target.value}))} 
                    type='text' placeholder='Enter start of the event' />
                    {/* <Dropdown placeholder={'Select a location'} /> */}
        
                </div>
            
            </div>
        
            <div className='createEvent__inputsForm__description'>
                <span className='createEvent__inputsForm__description__title'>Additional Information</span>
                <div className='createEvent__inputsForm__description__inputBox'>
                    <label>Event Description</label>
                    <textarea  value={inputs.description} 
                    onChange={e => setInputs(prev => ({...prev, description: e.target.value}))}
                    placeholder="Enter some description...">
                    </textarea>
        
                </div>
            
            </div>
    
            
        </div>
        )
    };

    const BannerForm = () => {

        const [bannerTypeError, setBannerTypeError] = useState('');
        const imageTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

        const handleBanner = (e) => {
            const file = e.target.files[0];
            if(file) {
                if(imageTypes.includes(file.type)) {
                    setBanner(file);
                    setBannerTypeError('');
                    const url = URL.createObjectURL(file);
                    setBannerUrl(url);
                } else {
                    setBannerTypeError('Invalid file format');
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
                    {bannerUrl !== '' && <img src={bannerUrl} alt='banner' />}
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
                    <div onClick={() => setInputs(prev => ({...prev, free: false}))} style={{backgroundColor: inputs.free ? `transparent` : `#F6FBFF`}} className='createEvent__ticketing__details__typeBox__singleType'>
                        <i class="bi bi-ticket-perforated"></i>
                        <span className='fw-bold'>Ticketed Event</span>
                        <span>My event requires tickets for entry</span>
                    </div>
                    <div onClick={() => setInputs(prev => ({...prev, free: true}))} style={{backgroundColor: inputs.free ? `#F6FBFF` : `transparent`}} className='createEvent__ticketing__details__typeBox__singleType'>
                        <i class="bi bi-ticket-perforated"></i>
                        <span className='fw-bold'>Free Event</span>
                        <span>I am running a free event</span>
                    </div>
                </div>

        
            </div>

            <div className='createEvent__inputsForm'>

                <div className='createEvent__inputsForm__details'>
                    <span className='createEvent__inputsForm__details__title'>What tickets are you selling?</span>

                    {ticketInputs?.map(ticket => (
                       <>
                       <div className='ticketBoxDiv'>
                            <button onClick={() => handleRemoveTicket(ticket.id)}>X</button>
                            <div className='createEvent__inputsForm__details__inputBox'>
                                <label>Ticket Name</label>
                                <input value={ticket.name} onChange={(e) => handleTicketChange(ticket.id, 'name', e.target.value)} type='text' placeholder='Ticket Name e.g. General Admission' />
                            </div>

                            <div className='createEvent__inputsForm__details__inputBox'>
                                <label>Ticket Price</label>
                                <input type='number' value={ticket.price} onChange={(e) => handleTicketChange(ticket.id, 'price', e.target.value)} placeholder='0.00' />
                                {/* <Dropdown placeholder={'Select a category'} /> */}
                                {/* <SearchDropdown /> */}
                            </div>
                       </div>
                       </>
                    ))}

                    <button className='addTicketBtn' onClick={handleAddTicket}>+</button>

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

