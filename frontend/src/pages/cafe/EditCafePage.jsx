import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import MainLayout from '../../layouts/MainLayout';
import CafeForm from '../../components/cafe/CafeForm';
import {
    fetchCafeById,
    updateCafe
} from '../../redux/thunks/cafeThunks';
import {
    selectSelectedCafe,
    selectCafeLoading,
    clearCafeError,
    clearSelectedCafe
} from '../../redux/slices/cafeSlice';

/**
 * Page component for editing an existing cafe
 */
const EditCafePage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Select data from Redux store
    const cafe = useSelector(selectSelectedCafe);
    const loading = useSelector(selectCafeLoading);

    // Fetch cafe data when component mounts
    useEffect(() => {
        dispatch(fetchCafeById(id));

        // Clear selected cafe when component unmounts
        return () => {
            dispatch(clearSelectedCafe());
            dispatch(clearCafeError());
        };
    }, [dispatch, id]);

    // Handle form submission
    const handleSubmit = (cafeData) => {
        dispatch(updateCafe({ id, cafeData }))
            .unwrap()
            .then(() => {
                navigate('/cafes');
            })
            .catch((error) => {
                console.error('Failed to update cafe:', error);
            });
    };

    // Handle cancel
    const handleCancel = () => {
        // Clear any errors
        dispatch(clearCafeError());
        navigate('/cafes');
    };

    // Show loading indicator while fetching cafe data
    if (loading && !cafe) {
        return (
            <MainLayout title="Edit Cafe">
                <div className="loading-container">
                    <Spin size="large" />
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout title={`Edit Cafe: ${cafe?.name || ''}`}>
            {cafe && (
                <CafeForm
                    initialValues={cafe}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    loading={loading}
                    mode="edit"
                />
            )}
        </MainLayout>
    );
};

export default EditCafePage;