import { useState } from "react";

const TicketingForm = () => {
    
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



    return (
        <div className='createEvent__ticketing'>

        <div className='createEvent__ticketing__details'>
            <span className='createEvent__ticketing__details__title'>What type of event are you running?</span>
    
            <div className='createEvent__ticketing__details__typeBox'>
                <div
                //  onClick={() => setInputs(prev => ({...prev, free: false}))} style={{backgroundColor: inputs.free ? `transparent` : `#F6FBFF`}}
                  className='createEvent__ticketing__details__typeBox__singleType'>
                    <i class="bi bi-ticket-perforated"></i>
                    <span className='fw-bold'>Ticketed Event</span>
                    <span>My event requires tickets for entry</span>
                </div>
                <div 
                // onClick={() => setInputs(prev => ({...prev, free: true}))} style={{backgroundColor: inputs.free ? `#F6FBFF` : `transparent`}}
                 className='createEvent__ticketing__details__typeBox__singleType'>
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

export default TicketingForm;
