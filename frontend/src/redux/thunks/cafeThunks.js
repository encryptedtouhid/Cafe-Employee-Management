import { createAsyncThunk } from '@reduxjs/toolkit';
import cafeApi from '../../api/cafeApi';

/**
 * Fetch all cafes with optional location filter
 */
export const fetchCafes = createAsyncThunk(
    'cafes/fetchCafes',
    async (location, { rejectWithValue }) => {
        try {
            return await cafeApi.getAllCafes(location);
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch cafes');
        }
    }
);

/**
 * Fetch a cafe by ID
 */
export const fetchCafeById = createAsyncThunk(
    'cafes/fetchCafeById',
    async (id, { rejectWithValue }) => {
        try {
            return await cafeApi.getCafeById(id);
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch cafe');
        }
    }
);

/**
 * Create a new cafe
 */
export const createCafe = createAsyncThunk(
    'cafes/createCafe',
    async (cafeData, { rejectWithValue }) => {
        try {
            return await cafeApi.createCafe(cafeData);
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to create cafe');
        }
    }
);

/**
 * Update an existing cafe
 */
export const updateCafe = createAsyncThunk(
    'cafes/updateCafe',
    async ({ id, cafeData }, { rejectWithValue }) => {
        try {
            return await cafeApi.updateCafe(id, cafeData);
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to update cafe');
        }
    }
);

/**
 * Delete a cafe
 */
export const deleteCafe = createAsyncThunk(
    'cafes/deleteCafe',
    async (id, { rejectWithValue }) => {
        try {
            await cafeApi.deleteCafe(id);
            return id; // Return the ID for removing from state
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to delete cafe');
        }
    }
);