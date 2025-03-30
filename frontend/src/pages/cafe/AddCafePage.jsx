import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../../layouts/MainLayout';
import CafeForm from '../../components/cafe/CafeForm';
import { createCafe } from '../../redux/thunks/cafeThunks';
import {
    selectCafeLoading,
    clearCafeError
} from '../../redux/slices/cafeSlice';

/**
 * Page component for adding a new cafe
 */
const AddCafePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Select data from Redux store
    const loading = useSelector(selectCafeLoading);

    // Handle form submission
    const handleSubmit = (cafeData) => {
        dispatch(createCafe(cafeData))
            .unwrap()
            .then(() => {
                navigate('/cafes');
            })
            .catch((error) => {
                console.error('Failed to create cafe:', error);
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
        </MainLayout>
    );
};

export default AddCafePage;