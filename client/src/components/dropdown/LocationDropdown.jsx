import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './dropdown.scss';
import Form from 'react-bootstrap/Form';
import { makeRequest } from '../../axios.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLocation } from '../../redux/createEventSlice.js';

const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

 
    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <Form.Control
          autoFocus
          className="py-2 m-0 b-0 w-100vw h-100vh"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value),
          )}
        </ul>
      </div>
    );
  },
);

function BasicExample({location}) {

  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    const fetchLocations = async () => {
      if (!value) return;
      const options = {
        method: 'GET',
        url: 'https://google-place-autocomplete-and-place-info.p.rapidapi.com/maps/api/place/autocomplete/json',
        params: {input: value},
        headers: {
          'X-RapidAPI-Key': 'a502d6bc69mshdca6ca79eb61ee1p1fc800jsn361b220e6b33',
          'X-RapidAPI-Host': 'google-place-autocomplete-and-place-info.p.rapidapi.com'
        }
      };
      
      try {
        const response = await axios.request(options);
        console.log('locs', response.data);
        const locs = response.data.predictions.map(prediction => prediction.description);
        console.log('only locs:', locs)
        setLocations(locs);
      } catch (error) {
        console.error(error);
      }
      
    }
    fetchLocations();
  }, [value]);
  
  
useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await makeRequest.get('/get-categories');
            console.log('cat res: ', res);
            // Handle the response here, e.g., set state
        } catch (err) {
            console.error('Error fetching categories:', err);
            // Handle the error here, e.g., set error state
        }
    };

    fetchData(); // Call the async function
}, []);


useEffect(() => {
  if (location) {
    setValue(location)
  }
}, [])

const handleSelectLocation = (name) => {
    setValue(name);
    dispatch(setLocation(name));
};


  return (
    <Dropdown className='dropdownComponent'>
      <Dropdown.Toggle as='input' value={value} onChange={e => setValue(e.target.value)}
      className='dropdown-toggle' variant="info" id="dropdown-basic" placeholder='Select a location'>
      </Dropdown.Toggle>

      <Dropdown.Menu >
        {locations && locations?.map(location => (
        <Dropdown.Item onClick={() => handleSelectLocation(location)}>{location}</Dropdown.Item>
        ))}

      </Dropdown.Menu>
    </Dropdown>
  );
}

export default BasicExample;