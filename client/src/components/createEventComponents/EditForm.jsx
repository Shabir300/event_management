import { useState, useEffect, useRef } from "react";
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setDescription, setEndDate, setLocation, setStartDate, setTitle, setType } from "../../redux/createEventSlice";
import LocationDropdown from '../locationDropdown/LocationDropdown';

const EditForm = () => {

    const dispatch = useDispatch();

    // const [inputs, setInputs] = useState({
    //     title: '',
    //     category: '',
    //     type: '',
    //     startDate: '',
    //     endDate: '',
    //     location: '',
    //     description: '',
    //     free: false,
    // });
    const banner = useSelector(state => state.createEvent.bannerObj);
    const title = useSelector(state => state.createEvent.title);
    const category = useSelector(state => state.createEvent.category);
    const type = useSelector(state => state.createEvent.type);
    const startDate = useSelector(state => state.createEvent.startDate);
    const endDate = useSelector(state => state.createEvent.endDate);
    const location = useSelector(state => state.createEvent.location);
    const description = useSelector(state => state.createEvent.description);
    const free = useSelector(state => state.createEvent.free);


    // const handleEditChange = (e) => {
    //     const { name, value } = e.target;
    //     setInputs(prev => ({ ...prev, [name]: value }));
    // };

    const startDateRef = useRef(null);
    const endDateRef = useRef(null);
    // const [type, setType] = useState('');

    const handleStartDate = (selectedDates, dateStr, instance) => {
        // setInputs(prev => ({...prev, startDate: dateStr}));
        dispatch(setStartDate(dateStr));
    };

    const handleEndDate = (selectedDates, dateStr, instance) => {
        // setInputs(prev => ({...prev, endDate: dateStr}));
        dispatch(setEndDate(dateStr));
    };

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
      });
    }, []);


    // const handleTypeChange = (e) => {
    //     // setInputs(prev => ({...prev, type: e.target.name}));
    //     dispatch(setType(e.target.name))
    // };

    // console.log('start date time here: ', inputs.startDate);

    return (

    <div className='createEvent__inputsForm'>

        <div className='createEvent__inputsForm__details'>
            <span className='createEvent__inputsForm__details__title'>Event Details</span>

            <div className='createEvent__inputsForm__details__inputBox'>
                <label>Event Title</label>
                <input  name='title' value={title}  type='text' placeholder='Enter the name of your event' onChange={e => dispatch(setTitle(e.target.value))}  />
            </div>
    
            <div className='createEvent__inputsForm__details__inputBox'>
                <label>Event Category</label>
                <input  name='category' type='text' placeholder='Please select one' 
                 value={category} onChange={e => dispatch(setCategory(e.target.value))} />
                {/* <Dropdown placeholder={'Select a category'} /> */}
                {/* <SearchDropdown /> */}
            </div>
    
        </div>
    
        <div className='createEvent__inputsForm__dateTime'>
            <span className='createEvent__inputsForm__dateTime__title'>Date & Time</span>
            <div className='createEvent__inputsForm__dateTime__radiosBox'>
            <label>Event Type</label>
                <input onChange={e => dispatch(setType(e.target.name))} class="form-check-input radioInput" type="radio" name="singleEvent" checked={type === 'singleEvent'} id="flexRadioDefault1" />
                <label class="form-check-label" for="flexRadioDefault1">
                    Single Event
                </label>
    
                <input onChange={e => dispatch(setType(e.target.name))} class="form-check-input radioInput" type="radio" name="recurringEvent" checked={type === 'recurringEvent'} id="flexRadioDefault1" />
                <label class="form-check-label" for="flexRadioDefault1">
                    Recurring Event
                </label>
    
            </div>
    
            <div className='createEvent__inputsForm__dateTime__InputPickers'>
    
                <div className='createEvent__inputsForm__dateTime__inputBox'>
                    <label>Start Date</label>
                    <input type="text" ref={startDateRef} value={startDate}  placeholder='Enter start of the event' />
                    <i class="bi bi-calendar3"></i>
                    {/* <input type='text' placeholder='Enter start of the event' /> */}
                </div>
    
                <div className='createEvent__inputsForm__dateTime__inputBox'>
                    <label>End Date</label>
                    <input type="text" ref={endDateRef} value={endDate} placeholder='Enter the end of the event' />
                    <i class="bi bi-calendar3"></i>
                    {/* <input type='text' placeholder='Enter the end of the event' /> */}
                </div>
    
            </div>
    
        </div>
    
        <div className='createEvent__inputsForm__location'>
            <span className='createEvent__inputsForm__location__title'>Location</span>
            <div className='createEvent__inputsForm__location__inputBox'>
                <label>Enter the location</label>
                <LocationDropdown location={location} />
    
            </div>
        
        </div>
    
        <div className='createEvent__inputsForm__description'>
            <span className='createEvent__inputsForm__description__title'>Additional Information</span>
            <div className='createEvent__inputsForm__description__inputBox'>
                <label>Event Description</label>
                <textarea  value={description} 
                onChange={e => dispatch(setDescription(e.target.value))}
                placeholder="Enter some description...">
                </textarea>
    
            </div>
        
        </div>

        
    </div>
    )
};

export default EditForm;