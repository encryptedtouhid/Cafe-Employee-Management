import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Spin, Card, Space } from 'antd';
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
    selectLocationFilter,
    setLocationFilter,
    clearCafeError
} from '../../redux/slices/cafeSlice';

/**
 * Page component for displaying the list of cafes
 */
const CafeListPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Select data from Redux store
    const cafes = useSelector(selectAllCafes);
    const loading = useSelector(selectCafeLoading);
    const locationFilter = useSelector(selectLocationFilter);

    // Fetch cafes when component mounts or filter changes
    useEffect(() => {
        dispatch(fetchCafes(locationFilter));

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
        dispatch(deleteCafe(cafeId));
    };

    // Handle add new cafe button click
    const handleAddClick = () => {
        navigate('/cafe/add');
    };

    return (
        <MainLayout title="Cafes">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div className="page-actions">
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAddClick}
                    >
                        Add New Cafe
                    </Button>
                </div>

                <CafeFilter
                    initialLocation={locationFilter}
                    onFilter={handleFilterChange}
                />

                <Card>
                    {loading ? (
                        <div className="loading-container">
                            <Spin size="large" />
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