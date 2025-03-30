import { configureStore } from '@reduxjs/toolkit';
import cafeReducer from './slices/cafeSlice';
import employeeReducer from './slices/employeeSlice';

/**
 * Configure the Redux store with all reducers
 */
const store = configureStore({
    reducer: {
        cafes: cafeReducer,
        employees: employeeReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Allows non-serializable values in state
        }),
});

export default store;