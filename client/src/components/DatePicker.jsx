import React, { useRef, useEffect } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function DatePicker() {
  const datepickerRef = useRef(null);

  useEffect(() => {
    flatpickr(datepickerRef.current, {
      // Options for configuring Flatpickr
      dateFormat: 'Y-m-d', // Example date format
      // Add any other options you need
    });
  }, []);

  return <input type="text" ref={datepickerRef} />;
}

export default DatePicker;
