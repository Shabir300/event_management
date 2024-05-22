import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function RadioInput() {
  const [selectedOption, setSelectedOption] = useState('option1');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="exampleRadios"
          id="exampleRadios1"
          value="option1"
          checked={selectedOption === 'option1'}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="exampleRadios1">
          Option 1
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="exampleRadios"
          id="exampleRadios2"
          value="option2"
          checked={selectedOption === 'option2'}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="exampleRadios2">
          Option 2
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="exampleRadios"
          id="exampleRadios3"
          value="option3"
          checked={selectedOption === 'option3'}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="exampleRadios3">
          Option 3
        </label>
      </div>
    </div>
  );
}

export default RadioInput;
