import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice.js';
import eventReducer from './eventSlice.js';
import createEventReducer from './createEventSlice.js';
import categoryReducer from './categorySlice.js';

export default configureStore({
    reducer: {
        user: userReducer,
        events: eventReducer,
        createEvent: createEventReducer,
        categories: categoryReducer,
    }
});