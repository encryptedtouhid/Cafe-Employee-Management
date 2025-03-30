import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../../layouts/MainLayout';
import EmployeeForm from '../../components/employee/EmployeeForm';
import { createEmployee } from '../../redux/thunks/employeeThunks';
import {
    selectEmployeeLoading,
    clearEmployeeError
} from '../../redux/slices/employeeSlice';

/**
 * Page component for adding a new employee
 */
const AddEmployeePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Select data from Redux store
    const loading = useSelector(selectEmployeeLoading);

    // Handle form submission
    const handleSubmit = (employeeData) => {
        dispatch(createEmployee(employeeData))
            .unwrap()
            .then(() => {
                navigate('/employees');
            })
            .catch((error) => {
                console.error('Failed to create employee:', error);
            });
    };

    // Handle cancel
    const handleCancel = () => {
        // Clear any errors
        dispatch(clearEmployeeError());
        navigate('/employees');
    };

    return (
        <MainLayout title="Add New Employee">
            <EmployeeForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                loading={loading}
                mode="create"
            />
        </MainLayout>
    );
};

export default AddEmployeePage;