import {createSlice} from '@reduxjs/toolkit';

const eventSlice = createSlice({
    name: 'events',
    initialState: {
        value: []
    },
    reducers: {
        setEvents: (state, action) => {
            state.value = action.payload;
        }
    },
});

export const {setEvents} = eventSlice.actions;

export default eventSlice.reducer;