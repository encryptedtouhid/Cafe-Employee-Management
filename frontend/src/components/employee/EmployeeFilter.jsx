import { useCallback, useEffect } from 'react';
import { Form, Select, Button, Card } from 'antd';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectAllCafes } from '../../redux/slices/cafeSlice';

/**
 * Filter component for employees by cafe
 * @param {Object} props - Component props
 * @param {string} props.initialCafeId - Initial cafe filter value
 * @param {Function} props.onFilter - Function to call when filter is applied
 */
const EmployeeFilter = ({ initialCafeId = '', onFilter }) => {
    const [form] = Form.useForm();
    const cafes = useSelector(selectAllCafes);

    // Set initial form values
    useEffect(() => {
        form.setFieldsValue({ cafeId: initialCafeId });
    }, [initialCafeId, form]);

    // Handle filter form submission
    const handleSubmit = useCallback((values) => {
        onFilter(values.cafeId || '');
    }, [onFilter]);

    // Handle clearing the filter
    const handleClear = useCallback(() => {
        form.resetFields();
        onFilter('');
    }, [form, onFilter]);

    // Prepare cafe options for dropdown
    const cafeOptions = [
        { value: '', label: 'All Cafes' },
        ...cafes.map(cafe => ({
            value: cafe.id,
            label: cafe.name,
        }))
    ];

    return (
        <Card className="filter-card">
            <Form
                form={form}
                layout="inline"
                onFinish={handleSubmit}
                initialValues={{ cafeId: initialCafeId }}
            >
                <Form.Item name="cafeId" label="Cafe">
                    <Select
                        placeholder="Filter by cafe"
                        options={cafeOptions}
                        style={{ width: 200 }}
                        allowClear
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        icon={<SearchOutlined />}
                    >
                        Filter
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button
                        onClick={handleClear}
                        icon={<ClearOutlined />}
                    >
                        Clear
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

EmployeeFilter.propTypes = {
    initialCafeId: PropTypes.string,
    onFilter: PropTypes.func.isRequired,
};

export default EmployeeFilter;