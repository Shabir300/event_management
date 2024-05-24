import './createEvent.scss';
import Header from '../../components/header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import BreadcrumbExample from '../../components/breadcrumbs/BreadCrumbs';
import { useState } from 'react';
import { makeRequest } from '../../axios.js';
import EditForm from '../../components/createEventComponents/EditForm.jsx';
import BannerForm from '../../components/createEventComponents/BannerForm.jsx';
import TicketingForm from '../../components/createEventComponents/TicketingForm.jsx';
import { useSelector } from 'react-redux';

const CreateEvent = () => {

    const [currentForm, setCurrentForm] = useState('Edit');
    const banner = useSelector(state => state.createEvent.bannerObj);
    const title = useSelector(state => state.createEvent.title);
    const category = useSelector(state => state.createEvent.category);
    const type = useSelector(state => state.createEvent.type);
    const startDate = useSelector(state => state.createEvent.startDate);
    const endDate = useSelector(state => state.createEvent.endDate);
    const location = useSelector(state => state.createEvent.location);
    const description = useSelector(state => state.createEvent.description);
    const free = useSelector(state => state.createEvent.free);


    const handleSaveEvent = async () => {
        const bodyInputs = {
            title,
            category,
            type,
            startDate,
            endDate,
            location,
            description,
            free: free ? 1 : 0,
        }
        try {
            const res = await makeRequest.post('/event', bodyInputs);
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

  return (
    <div>
        <Header />

        <div className='createEvent'>
            <span className='createEvent_title'>Create a New Event</span>
            
            <BreadcrumbExample currentForm={currentForm} setCurrentForm={setCurrentForm} />

            {currentForm === 'Edit' ? <EditForm /> : currentForm === 'Banner' ? <BannerForm /> : currentForm === 'Ticketing' && <TicketingForm />}

            <button 
            onClick={handleNextPage}
            className='createEvent__saveBtn'>Save & Continue
            </button>
        </div>
    </div>
  )
}

export default CreateEvent

