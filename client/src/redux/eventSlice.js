import {createSlice} from '@reduxjs/toolkit';

const eventSlice = createSlice({
    name: 'events',
    initialState: {
        value: [],
        search: '',
    },
    reducers: {
        setEvents: (state, action) => {
            state.value = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        }
    },
});

export const {setEvents, setSearch} = eventSlice.actions;

export default eventSlice.reducer;