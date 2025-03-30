import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Spin, Card, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import MainLayout from '../../layouts/MainLayout';
import CafeTable from '../../components/cafe/CafeTable';
import CafeFilter from '../../components/cafe/CafeFilter';
import {
    fetchCafes,
    deleteCafe
} from '../../redux/thunks/cafeThunks';
import {
    selectAllCafes,
    selectCafeLoading,
    selectCafeError,
    selectLocationFilter,
    setLocationFilter,
    clearCafeError
} from '../../redux/slices/cafeSlice';

/**
 * Page component for displaying the list of cafes
 * Updated to properly handle location filtering
 */
const CafeListPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Local state for debouncing filter changes
    const [filterLoading, setFilterLoading] = useState(false);

    // Select data from Redux store
    const cafes = useSelector(selectAllCafes);
    const loading = useSelector(selectCafeLoading);
    const error = useSelector(selectCafeError);
    const locationFilter = useSelector(selectLocationFilter);

    // Fetch cafes when component mounts or filter changes
    useEffect(() => {
        setFilterLoading(true);
        dispatch(fetchCafes(locationFilter))
            .unwrap()
            .then(() => {
                setFilterLoading(false);
            })
            .catch((err) => {
                setFilterLoading(false);
                message.error(`Failed to fetch cafes: ${err.message || 'Unknown error'}`);
            });

        // Clear any errors when component unmounts
        return () => {
            dispatch(clearCafeError());
        };
    }, [dispatch, locationFilter]);

    // Handle filter change
    const handleFilterChange = (location) => {
        dispatch(setLocationFilter(location));
    };

    // Handle cafe deletion
    const handleDelete = (cafeId) => {
        dispatch(deleteCafe(cafeId))
            .unwrap()
            .then(() => {
                message.success('Cafe deleted successfully');
            })
            .catch((err) => {
                message.error(`Failed to delete cafe: ${err.message || 'Unknown error'}`);
            });
    };

    // Handle add new cafe button click
    const handleAddClick = () => {
        navigate('/cafe/add');
    };

    return (
        <MainLayout title="Cafes">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div className="page-actions" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAddClick}
                    >
                        Add New Cafe
                    </Button>

                    <CafeFilter
                        initialLocation={locationFilter}
                        onFilter={handleFilterChange}
                        loading={filterLoading}
                    />
                </div>

                <Card>
                    {loading ? (
                        <div className="loading-container" style={{ textAlign: 'center', padding: '40px' }}>
                            <Spin size="large" />
                        </div>
                    ) : error ? (
                        <div className="error-container" style={{ color: 'red', padding: '20px', textAlign: 'center' }}>
                            {typeof error === 'string' ? error : (error?.message || 'An error occurred while fetching cafes')}
                        </div>
                    ) : (
                        <CafeTable
                            cafes={cafes}
                            onDelete={handleDelete}
                            loading={loading}
                        />
                    )}
                </Card>
            </Space>
        </MainLayout>
    );
};

export default CafeListPage;