import { createSlice } from '@reduxjs/toolkit';
import {
    fetchCafes,
    fetchCafeById,
    createCafe,
    updateCafe,
    deleteCafe
} from '../thunks/cafeThunks';

/**
 * Initial state for the cafes slice
 */
const initialState = {
    cafes: [],
    selectedCafe: null,
    loading: false,
    error: null,
    filter: {
        location: '',
    },
};

/**
 * Cafe slice with reducers for all cafe-related actions
 */
const cafeSlice = createSlice({
    name: 'cafes',
    initialState,
    reducers: {
        setLocationFilter: (state, action) => {
            state.filter.location = action.payload;
        },
        clearSelectedCafe: (state) => {
            state.selectedCafe = null;
        },
        clearCafeError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all cafes
            .addCase(fetchCafes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCafes.fulfilled, (state, action) => {
                state.loading = false;
                state.cafes = action.payload;
            })
            .addCase(fetchCafes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch cafes';
            })

            // Fetch cafe by ID
            .addCase(fetchCafeById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCafeById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedCafe = action.payload;
            })
            .addCase(fetchCafeById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch cafe';
            })

            // Create cafe
            .addCase(createCafe.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCafe.fulfilled, (state, action) => {
                state.loading = false;
                state.cafes.push(action.payload);
            })
            .addCase(createCafe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to create cafe';
            })

            // Update cafe
            .addCase(updateCafe.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCafe.fulfilled, (state, action) => {
                state.loading = false;
                // Update the cafe in the cafes array
                const index = state.cafes.findIndex(cafe => cafe.id === action.payload.id);
                if (index !== -1) {
                    state.cafes[index] = action.payload;
                }
                state.selectedCafe = action.payload;
            })
            .addCase(updateCafe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to update cafe';
            })

            // Delete cafe
            .addCase(deleteCafe.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCafe.fulfilled, (state, action) => {
                state.loading = false;
                // Remove the cafe from the cafes array
                state.cafes = state.cafes.filter(cafe => cafe.id !== action.meta.arg);
            })
            .addCase(deleteCafe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to delete cafe';
            });
    },
});

// Export actions
export const { setLocationFilter, clearSelectedCafe, clearCafeError } = cafeSlice.actions;

// Export selectors
export const selectAllCafes = (state) => state.cafes.cafes;
export const selectCafeById = (state, cafeId) =>
    state.cafes.cafes.find(cafe => cafe.id === cafeId);
export const selectSelectedCafe = (state) => state.cafes.selectedCafe;
export const selectCafeLoading = (state) => state.cafes.loading;
export const selectCafeError = (state) => state.cafes.error;
export const selectLocationFilter = (state) => state.cafes.filter.location;

// Export reducer
export default cafeSlice.reducer;