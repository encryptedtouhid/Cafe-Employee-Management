import { createAsyncThunk } from '@reduxjs/toolkit';
import cafeApi from '../../api/cafeApi';
import { getErrorMessage } from '../../utils/errorHandler';

/**
 * Fetch all cafes
 */
export const fetchCafes = createAsyncThunk(
    'cafes/fetchCafes',
    async (location, { rejectWithValue }) => {
        try {
            return await cafeApi.getAllCafes(location);
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
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
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

/**
 * Create a new cafe
 * Updated to align with Swagger schema requirements
 */
export const createCafe = createAsyncThunk(
    'cafes/createCafe',
    async (cafeData, { rejectWithValue }) => {
        try {
            // Client-side validation based on Swagger schema
            if (!cafeData.name || cafeData.name.length < 6 || cafeData.name.length > 10) {
                return rejectWithValue('Name must be between 6-10 characters');
            }

            if (!cafeData.description || cafeData.description.length > 256) {
                return rejectWithValue('Description is required and cannot exceed 256 characters');
            }

            if (!cafeData.location) {
                return rejectWithValue('Location is required');
            }

            // Logo validation - if present, should be under 2MB
            if (cafeData.logo instanceof File && cafeData.logo.size > 2 * 1024 * 1024) {
                return rejectWithValue('Logo file must be smaller than 2MB');
            }

            return await cafeApi.createCafe(cafeData);
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

/**
 * Update an existing cafe
 * Updated to align with Swagger schema requirements
 */
export const updateCafe = createAsyncThunk(
    'cafes/updateCafe',
    async ({ id, cafeData }, { rejectWithValue }) => {
        try {
            // Client-side validation based on Swagger schema
            if (cafeData.name && (cafeData.name.length < 6 || cafeData.name.length > 10)) {
                return rejectWithValue('Name must be between 6-10 characters');
            }

            if (cafeData.description && cafeData.description.length > 256) {
                return rejectWithValue('Description cannot exceed 256 characters');
            }

            // Logo validation - if present, should be under 2MB
            if (cafeData.logo instanceof File && cafeData.logo.size > 2 * 1024 * 1024) {
                return rejectWithValue('Logo file must be smaller than 2MB');
            }

            return await cafeApi.updateCafe(id, cafeData);
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
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
            return await cafeApi.deleteCafe(id);
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);