import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import {makeRequest} from '../../axios.js';
import {useDispatch, useSelector} from 'react-redux';
import { setCategories, setFilteredCategories } from '../../redux/categorySlice.js';
import { setFilteredPricing, setFilteredStartDate } from '../../redux/eventSlice.js';

function FiltersOffCanvas() {

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const categories = useSelector(state => state.categories.categories);
  const [selectedCategoriesFilter, setSelectedCategoriesFilter] = useState([]);
  const [isFree, setIsFree] = useState(null);
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
       try {
        const res = await makeRequest.get('/get-categories');
        dispatch(setCategories(res.data))
        return res;
       } catch(err) {
        return err;
       }
    }

    fetchCategories();
  }, [dispatch]);

  const handleAddCat = (category) => {
    const updatedCats = selectedCategoriesFilter.includes(category.name) ? selectedCategoriesFilter.filter(cat => cat !== category.name) : [...selectedCategoriesFilter, category.name];
    // updatedCats.push(category.name);
    setSelectedCategoriesFilter(updatedCats);
    dispatch(setFilteredCategories(updatedCats));
  };

  
  const handleFreeChange = () => {
    const newValue = isFree ? null : true;
    setIsFree(newValue);
    dispatch(setFilteredPricing(newValue));
  }

  const handlePaidChange = () => {
    const newValue = isFree === false ? null : false;
    setIsFree(newValue);
    dispatch(setFilteredPricing(newValue));
  }

  
  const handleTodayChange = () => {
    const newValue = date === 'Today' ? '' : 'Today';
    setDate(newValue)
    dispatch(setFilteredStartDate(newValue))
  };

  const handleWeekChange = () => {
    const newValue = date === 'Week' ? '' : 'Week';
    setDate(newValue);
    dispatch(setFilteredStartDate(newValue))
  };

  const handleMonthChange = () => {
    const newValue = date === 'Month' ? '' : 'Month';
    setDate(newValue);
    dispatch(setFilteredStartDate(newValue))
  }
  
  console.log('logged categories: ', date);

  return (
    <>
      <Button className='fw-bold' size='lg' variant='' onClick={handleShow}>
        Filters
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>FILTERS</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form> 
            <Form.Group className='mb-5 d-flex flex-column gap-2'>
              <p className='fs-6 text-body-secondary'>~ categories</p>
              {categories?.map(category => (
                <Form.Check
                type='checkbox'
                label={category.name}
                id={category.id}
                checked={selectedCategoriesFilter.includes(category.name)}
                onChange={() => handleAddCat(category)}
              />
              ))}
            </Form.Group>

            <Form.Group className='mb-5'>
              <p className='fs-6 text-body-secondary'>~ pricing</p>
              <Form.Check
                type='checkbox'
                label='free'
                checked={isFree === true}
                onChange={handleFreeChange}
                id='adventures-checkbox-2'
              />
              <Form.Check
                type='checkbox'
                label='paid'
                checked={isFree === false}
                onChange={handlePaidChange}
                id='adventures-checkbox-2'
              />
            </Form.Group>

            <Form.Group className='mb-5 d-flex flex-column gap-1'>
              <p className='fs-6 text-body-secondary'>~ Date</p>
              <Form.Check
                type='checkbox'
                label='Today'
                checked={date === 'Today'}
                onChange={handleTodayChange}
                id='date-checkbox-1'
              />
              <Form.Check
                type='checkbox'
                label='This week'
                checked={date === 'Week'}
                onChange={handleWeekChange}
                id='date-checkbox-1'
              />
              <Form.Check
                type='checkbox'
                label='This month'
                checked={date === 'Month'}
                onChange={handleMonthChange}
              />
            </Form.Group>

          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default FiltersOffCanvas;