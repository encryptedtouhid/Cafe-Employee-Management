import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import { Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import ConfirmationDialog from '../common/ConfirmationDialog';

// Import AG Grid styles
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

/**
 * Employee Table Component using AG Grid
 * @param {Object} props - Component props
 * @param {Array} props.employees - Array of employee objects
 * @param {Function} props.onDelete - Function to call on delete
 * @param {boolean} props.loading - Loading state
 */
const EmployeeTable = ({ employees, onDelete, loading }) => {
    const navigate = useNavigate();
    const gridRef = useRef();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    // Define AG Grid column definitions
    const columnDefs = [
        {
            headerName: 'ID',
            field: 'id',
            sortable: true,
            filter: true,
            width: 120
        },
        {
            headerName: 'Name',
            field: 'name',
            sortable: true,
            filter: true,
            flex: 1,
            minWidth: 150
        },
        {
            headerName: 'Email',
            field: 'email_address',
            sortable: true,
            filter: true,
            flex: 1,
            minWidth: 200
        },
        {
            headerName: 'Phone',
            field: 'phone_number',
            sortable: true,
            filter: true,
            width: 120
        },
        {
            headerName: 'Days Worked',
            field: 'days_worked',
            sortable: true,
            type: 'numericColumn',
            width: 120
        },
        {
            headerName: 'Cafe',
            field: 'cafe',
            sortable: true,
            filter: true,
            width: 150
        },
        {
            headerName: 'Actions',
            width: 120,
            cellRenderer: (params) => {
                return (
                    <Space>
                        <Button
                            icon={<EditOutlined />}
                            onClick={() => navigate(`/employee/edit/${params.data.id}`)}
                            aria-label="Edit employee"
                            type="primary"
                            ghost
                        />
                        <Button
                            icon={<DeleteOutlined />}
                            onClick={() => handleDeleteClick(params.data)}
                            aria-label="Delete employee"
                            danger
                        />
                    </Space>
                );
            }
        }
    ];

    // Define default column settings
    const defaultColDef = {
        resizable: true,
    };

    // Handle click on delete button
    const handleDeleteClick = useCallback((employee) => {
        setSelectedEmployee(employee);
        setDeleteDialogOpen(true);
    }, []);

    // Handle confirmation of delete
    const handleDeleteConfirm = useCallback(() => {
        if (selectedEmployee) {
            onDelete(selectedEmployee.id);
        }
        setDeleteDialogOpen(false);
        setSelectedEmployee(null);
    }, [selectedEmployee, onDelete]);

    // Handle cancel of delete
    const handleDeleteCancel = useCallback(() => {
        setDeleteDialogOpen(false);
        setSelectedEmployee(null);
    }, []);

    // Auto-size columns when data changes
    useEffect(() => {
        if (gridRef.current && gridRef.current.api && employees.length > 0) {
            gridRef.current.api.sizeColumnsToFit();
        }
    }, [employees]);

    return (
        <div className="employee-table">
            <div
                className="ag-theme-alpine"
                style={{
                    height: '500px',
                    width: '100%'
                }}
            >
                <AgGridReact
                    ref={gridRef}
                    rowData={employees}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    paginationPageSize={10}
                    animateRows={true}
                    rowSelection="single"
                    overlayLoadingTemplate={
                        '<span class="ag-overlay-loading-center">Loading...</span>'
                    }
                    overlayNoRowsTemplate={
                        '<span class="ag-overlay-no-rows-center">No employees found</span>'
                    }
                    loadingOverlayComponent
                />
            </div>

            <ConfirmationDialog
                open={deleteDialogOpen}
                title="Delete Employee"
                content={`Are you sure you want to delete "${selectedEmployee?.name}"?`}
                okText="Delete"
                cancelText="Cancel"
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
            />
        </div>
    );
};

EmployeeTable.propTypes = {
    employees: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    loading: PropTypes.bool,
};

export default EmployeeTable;