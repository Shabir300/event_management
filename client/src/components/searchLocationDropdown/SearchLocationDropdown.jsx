import React, { useEffect, useState } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import './dropdown.scss';
import Form from 'react-bootstrap/Form';
import { makeRequest } from '../../axios.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../../redux/eventSlice.js';


function BasicExample({location}) {

const dispatch = useDispatch();
  const search = useSelector(state => state.events.search);
  const [locations, setLocations] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    const fetchLocations = async () => {
      if (!search) return;
      const options = {
        method: 'GET',
        url: 'https://google-place-autocomplete-and-place-info.p.rapidapi.com/maps/api/place/autocomplete/json',
        params: {input: search},
        headers: {
          'X-RapidAPI-Key': 'a502d6bc69mshdca6ca79eb61ee1p1fc800jsn361b220e6b33',
          'X-RapidAPI-Host': 'google-place-autocomplete-and-place-info.p.rapidapi.com'
        }
      };
      
      try {
        const response = await axios.request(options);
        const cities = response.data.predictions
          .filter((prediction) => prediction.types.includes('locality')) // Filter based on types
          .map((prediction) => prediction.description);
        console.log('only cities:', cities);
        setLocations(cities);
      } catch (error) {
        console.error(error);
      }
      
    }
    fetchLocations();
  }, [search]);

  console.log('search:', search)

  return (
    <Dropdown className='dropdownComponent eventsSearch'>
      
      <Dropdown.Toggle  as='input' value={search} onChange={e => dispatch(setSearch(e.target.value))}
      className='dropdown-toggle' variant="info" id="dropdown-basic" placeholder='Select a location'>
      </Dropdown.Toggle>

      <Dropdown.Menu >
        {locations?.map(location => (
        <Dropdown.Item onClick={() => dispatch(setSearch(location))}>{location}</Dropdown.Item>
        ))}

      </Dropdown.Menu>
    </Dropdown>
  );
}

export default BasicExample;

