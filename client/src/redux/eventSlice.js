import {createSlice} from '@reduxjs/toolkit';

const eventSlice = createSlice({
    name: 'events',
    initialState: {
        value: [],
        search: '',
        sortBy: `Price (high to low)`,
        filteredPricing: null,
        filteredStartDate: '',
    },
    reducers: {
        setEvents: (state, action) => {
            state.value = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        setFilteredPricing: (state, action) => {
            state.filteredPricing = action.payload;
        },
        setFilteredStartDate: (state, action) => {
            state.filteredStartDate = action.payload;
        }
    },
});

export const {setEvents, setSearch, setSortBy, setFilteredPricing, setFilteredStartDate} = eventSlice.actions;

export default eventSlice.reducer;