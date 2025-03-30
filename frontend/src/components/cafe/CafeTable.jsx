import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import { Button, Space, Avatar } from 'antd';
import { EditOutlined, DeleteOutlined, CoffeeOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import ConfirmationDialog from '../common/ConfirmationDialog';

// Import AG Grid styles
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

/**
 * Cafe Table Component using AG Grid
 * Updated to correctly display logo images with proper URLs
 *
 * @param {Object} props - Component props
 * @param {Array} props.cafes - Array of cafe objects
 * @param {Function} props.onDelete - Function to call on delete
 * @param {boolean} props.loading - Loading state
 */
const CafeTable = ({ cafes, onDelete, loading }) => {
    const navigate = useNavigate();
    const gridRef = useRef();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedCafe, setSelectedCafe] = useState(null);

    // Function to handle image errors
    const handleImageError = (event) => {
        event.target.src = 'https://via.placeholder.com/40?text=No+Logo';
    };

    // Define AG Grid column definitions
    const columnDefs = [
        {
            headerName: 'Logo',
            field: 'logo',
            width: 100,
            cellRenderer: (params) => {
                return (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        {params.value ? (
                            <Avatar
                                src={params.value}
                                size={40}
                                shape="square"
                                onError={handleImageError}
                                style={{ objectFit: 'cover' }}
                            />
                        ) : (
                            <Avatar
                                icon={<CoffeeOutlined />}
                                size={40}
                                shape="square"
                            />
                        )}
                    </div>
                );
            }
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
            headerName: 'Description',
            field: 'description',
            sortable: true,
            filter: true,
            flex: 2,
            minWidth: 200,
            cellRenderer: (params) => {
                // Truncate long descriptions
                const maxLength = 100;
                const text = params.value || '';
                return text.length > maxLength
                    ? `${text.substring(0, maxLength)}...`
                    : text;
            }
        },
        {
            headerName: 'Employees',
            field: 'employees',
            sortable: true,
            type: 'numericColumn',
            width: 120,
            cellRenderer: (params) => {
                return (
                    <Button
                        type="link"
                        onClick={() => navigate(`/employees?cafe=${params.data.id}`)}
                    >
                        {params.value}
                    </Button>
                );
            }
        },
        {
            headerName: 'Location',
            field: 'location',
            sortable: true,
            filter: true,
            width: 120
        },
        {
            headerName: 'Actions',
            width: 120,
            cellRenderer: (params) => {
                return (
                    <Space>
                        <Button
                            icon={<EditOutlined />}
                            onClick={() => navigate(`/cafe/edit/${params.data.id}`)}
                            aria-label="Edit cafe"
                            type="primary"
                            ghost
                        />
                        <Button
                            icon={<DeleteOutlined />}
                            onClick={() => handleDeleteClick(params.data)}
                            aria-label="Delete cafe"
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
    const handleDeleteClick = useCallback((cafe) => {
        setSelectedCafe(cafe);
        setDeleteDialogOpen(true);
    }, []);

    // Handle confirmation of delete
    const handleDeleteConfirm = useCallback(() => {
        if (selectedCafe) {
            onDelete(selectedCafe.id);
        }
        setDeleteDialogOpen(false);
        setSelectedCafe(null);
    }, [selectedCafe, onDelete]);

    // Handle cancel of delete
    const handleDeleteCancel = useCallback(() => {
        setDeleteDialogOpen(false);
        setSelectedCafe(null);
    }, []);

    // Auto-size columns when data changes
    useEffect(() => {
        if (gridRef.current && gridRef.current.api && cafes?.length > 0) {
            gridRef.current.api.sizeColumnsToFit();
        }
    }, [cafes]);

    return (
        <div className="cafe-table">
            <div
                className="ag-theme-alpine"
                style={{
                    height: '500px',
                    width: '100%'
                }}
            >
                <AgGridReact
                    ref={gridRef}
                    rowData={cafes}
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
                        '<span class="ag-overlay-no-rows-center">No cafes found</span>'
                    }
                />
            </div>

            <ConfirmationDialog
                open={deleteDialogOpen}
                title="Delete Cafe"
                content={`Are you sure you want to delete "${selectedCafe?.name}"? This will also delete all employees assigned to this cafe.`}
                okText="Delete"
                cancelText="Cancel"
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
            />
        </div>
    );
};

CafeTable.propTypes = {
    cafes: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    loading: PropTypes.bool,
};

export default CafeTable;