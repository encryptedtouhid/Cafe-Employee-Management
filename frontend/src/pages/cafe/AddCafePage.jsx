import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import MainLayout from '../../layouts/MainLayout';
import CafeForm from '../../components/cafe/CafeForm';
import { createCafe } from '../../redux/thunks/cafeThunks';
import {
    selectCafeLoading,
    selectCafeError,
    clearCafeError
} from '../../redux/slices/cafeSlice';

/**
 * Page component for adding a new cafe
 * Updated to handle validation errors based on Swagger specs
 */
const AddCafePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Select data from Redux store
    const loading = useSelector(selectCafeLoading);
    const error = useSelector(selectCafeError);

    // Handle form submission
    const handleSubmit = (cafeData) => {
        // Front-end validation based on Swagger specifications
        if (!cafeData.name || cafeData.name.length < 6 || cafeData.name.length > 10) {
            message.error('Name must be between 6-10 characters');
            return;
        }

        if (!cafeData.description || cafeData.description.length > 256) {
            message.error('Description is required and cannot exceed 256 characters');
            return;
        }

        if (!cafeData.location) {
            message.error('Location is required');
            return;
        }

        dispatch(createCafe(cafeData))
            .unwrap()
            .then(() => {
                message.success('Cafe created successfully');
                navigate('/cafes');
            })
            .catch((error) => {
                // Error is already handled by the reducer
                console.error('Failed to create cafe:', error);

                // Display specific error message if available
                if (typeof error === 'string') {
                    message.error(error);
                } else if (error?.message) {
                    message.error(error.message);
                } else {
                    message.error('Failed to create cafe. Please try again.');
                }
            });
    };

    // Handle cancel
    const handleCancel = () => {
        // Clear any errors
        dispatch(clearCafeError());
        navigate('/cafes');
    };

    return (
        <MainLayout title="Add New Cafe">
            <CafeForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                loading={loading}
                mode="create"
            />

            {/* Display any API errors that might come from the Redux store */}
            {error && (
                <div className="error-message" style={{ color: 'red', marginTop: '16px' }}>
                    {typeof error === 'string' ? error : (error?.message || 'An error occurred')}
                </div>
            )}
        </MainLayout>
    );
};

export default AddCafePage;