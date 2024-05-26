import {createSlice} from '@reduxjs/toolkit';

const eventSlice = createSlice({
    name: 'events',
    initialState: {
        value: [],
        search: '',
        sortBy: `Price (high to low)`,
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
    },
});

export const {setEvents, setSearch, setSortBy} = eventSlice.actions;

export default eventSlice.reducer;