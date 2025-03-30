import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Spin, Card, Space, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import MainLayout from '../../layouts/MainLayout';
import EmployeeTable from '../../components/employee/EmployeeTable';
import {
    fetchEmployees,
    deleteEmployee
} from '../../redux/thunks/employeeThunks';
import { fetchCafes } from '../../redux/thunks/cafeThunks';
import {
    selectAllEmployees,
    selectEmployeeLoading,
    setCafeFilter,
    clearEmployeeError
} from '../../redux/slices/employeeSlice';
import { selectAllCafes } from '../../redux/slices/cafeSlice';

const { Title } = Typography;

/**
 * Page component for displaying the list of employees
 */
const EmployeeListPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Get cafe ID from URL if present
    const cafeId = searchParams.get('cafe');

    // Select data from Redux store
    const employees = useSelector(selectAllEmployees);
    const loading = useSelector(selectEmployeeLoading);
    const cafes = useSelector(selectAllCafes);

    // Fetch employees and cafes when component mounts or cafeId changes
    useEffect(() => {
        dispatch(fetchEmployees(cafeId));
        dispatch(fetchCafes());

        if (cafeId) {
            dispatch(setCafeFilter(cafeId));
        }

        // Clear any errors when component unmounts
        return () => {
            dispatch(clearEmployeeError());
        };
    }, [dispatch, cafeId]);

    // Handle employee deletion
    const handleDelete = (employeeId) => {
        dispatch(deleteEmployee(employeeId));
    };

    // Handle add new employee button click
    const handleAddClick = () => {
        navigate('/employee/add');
    };

    // Find cafe name if filtering by cafe
    const getCafeNameById = (id) => {
        const cafe = cafes.find(c => c.id === id);
        return cafe ? cafe.name : '';
    };

    // Build page title based on filtering
    const getPageTitle = () => {
        if (cafeId) {
            const cafeName = getCafeNameById(cafeId);
            return cafeName ? `Employees - ${cafeName}` : 'Employees';
        }
        return 'Employees';
    };

    return (
        <MainLayout title={getPageTitle()}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div className="page-actions">
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAddClick}
                    >
                        Add New Employee
                    </Button>
                </div>

                {cafeId && (
                    <Button
                        type="link"
                        onClick={() => navigate('/employees')}
                    >
                        View All Employees
                    </Button>
                )}

                <Card>
                    {loading ? (
                        <div className="loading-container">
                            <Spin size="large" />
                        </div>
                    ) : (
                        <EmployeeTable
                            employees={employees}
                            onDelete={handleDelete}
                            loading={loading}
                        />
                    )}
                </Card>
            </Space>
        </MainLayout>
    );
};

export default EmployeeListPage;