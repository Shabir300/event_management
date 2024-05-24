import {createSlice} from '@reduxjs/toolkit';

const createEventSlice= createSlice({
    name: 'createEvent',
    initialState: {
        bannerObj: {},
        title: '',
        category: '',
        type: '',
        startDate: '',
        endDate: '',
        location: '',
        description: '',
        free: false,
    },
    reducers: {
        setBanner: (state, action) => {
            state.bannerObj = action.payload;
        },
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        }, 
        setType: (state, action) => {
            state.type = action.payload;
        }, 
        setStartDate: (state, action) => {
            state.startDate = action.payload;
        }, 
        setEndDate: (state, action) => {
            state.endDate = action.payload;
        },
        setLocation: (state, action) => {
            state.location = action.payload;
        },
        setDescription: (state, action) => {
            state.description = action.payload;
        },
        setFree: (state) => {
            state.free = !state.free;
        },
    }
});

export const {setBanner, setEditInputs, setFree, setTitle, setCategory, setType, setStartDate, setEndDate, setLocation, setDescription}  = createEventSlice.actions;

export default createEventSlice.reducer;