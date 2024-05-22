import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './dropdown.scss';
import Form from 'react-bootstrap/Form';

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

function BasicExample({placeholder}) {
  return (
    <Dropdown className='dropdownComponent'>
      <Dropdown.Toggle className='dropdown-toggle' variant="info" id="dropdown-basic">
        {placeholder}
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu}>
        <Dropdown.Item href="#/action-1">Adventure Travel</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Art Exhibitions</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Auctions & Fundraisers</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Children’s Workshops</Dropdown.Item>
        <Dropdown.Item href="#/action-3">City Tours</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Conferences</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Cooking Classes</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Cruise Vacations</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Cultural Experiences</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Educational Activities</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Educational Seminars</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Fitness Workshops</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Food Festivals</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Tech Conferences</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Workshops</Dropdown.Item>


      </Dropdown.Menu>
    </Dropdown>
  );
}

export default BasicExample;