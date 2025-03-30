import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import MainLayout from '../../layouts/MainLayout';
import EmployeeForm from '../../components/employee/EmployeeForm';
import {
    fetchEmployeeById,
    updateEmployee
} from '../../redux/thunks/employeeThunks';
import {
    selectSelectedEmployee,
    selectEmployeeLoading,
    clearEmployeeError,
    clearSelectedEmployee
} from '../../redux/slices/employeeSlice';

/**
 * Page component for editing an existing employee
 */
const EditEmployeePage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Select data from Redux store
    const employee = useSelector(selectSelectedEmployee);
    const loading = useSelector(selectEmployeeLoading);

    // Fetch employee data when component mounts
    useEffect(() => {
        dispatch(fetchEmployeeById(id));

        // Clear selected employee when component unmounts
        return () => {
            dispatch(clearSelectedEmployee());
            dispatch(clearEmployeeError());
        };
    }, [dispatch, id]);

    // Handle form submission
    const handleSubmit = (employeeData) => {
        dispatch(updateEmployee({ id, employeeData }))
            .unwrap()
            .then(() => {
                navigate('/employees');
            })
            .catch((error) => {
                console.error('Failed to update employee:', error);
            });
    };

    // Handle cancel
    const handleCancel = () => {
        // Clear any errors
        dispatch(clearEmployeeError());
        navigate('/employees');
    };

    // Show loading indicator while fetching employee data
    if (loading && !employee) {
        return (
            <MainLayout title="Edit Employee">
                <div className="loading-container">
                    <Spin size="large" />
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout title={`Edit Employee: ${employee?.name || ''}`}>
            {employee && (
                <EmployeeForm
                    initialValues={employee}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    loading={loading}
                    mode="edit"
                />
            )}
        </MainLayout>
    );
};

export default EditEmployeePage;