import {createSlice} from '@reduxjs/toolkit';

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        filteredCategories: [],
    },
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setFilteredCategories: (state, action) => {
            state.filteredCategories = action.payload;
        }
    }
});

export const {setCategories, setFilteredCategories} = categorySlice.actions;

export default categorySlice.reducer;