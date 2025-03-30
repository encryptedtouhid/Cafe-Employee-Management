import { useCallback, useState, useEffect } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

/**
 * Filter component for cafes by location
 * Updated with responsive design and loading state
 *
 * @param {Object} props - Component props
 * @param {string} props.initialLocation - Initial location filter value
 * @param {Function} props.onFilter - Function to call when filter is applied
 * @param {boolean} props.loading - Loading state for the filter
 */
const CafeFilter = ({ initialLocation = '', onFilter, loading = false }) => {
    const [form] = Form.useForm();
    const [location, setLocation] = useState(initialLocation || '');

    // Set initial form values
    useEffect(() => {
        form.setFieldsValue({ location: initialLocation || '' });
        setLocation(initialLocation || '');
    }, [initialLocation, form]);

    // Handle location input change
    const handleLocationChange = useCallback((e) => {
        setLocation(e.target.value);
    }, []);

    // Handle filter form submission
    const handleSubmit = useCallback(() => {
        onFilter(location);
    }, [onFilter, location]);

    // Handle clearing the filter
    const handleClear = useCallback(() => {
        form.resetFields();
        setLocation('');
        onFilter('');
    }, [form, onFilter]);

    // Handle Enter key press for immediate search
    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }, [handleSubmit]);

    return (
        <div className="filter-container">
            <Form
                form={form}
                layout="inline"
                onFinish={handleSubmit}
                initialValues={{ location: initialLocation }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}
            >
                <Form.Item name="location" style={{ marginBottom: '8px', flex: '1 1 200px' }}>
                    <Input
                        placeholder="Filter by location"
                        onChange={handleLocationChange}
                        onKeyPress={handleKeyPress}
                        prefix={<SearchOutlined style={{ color: '#d9d9d9' }} />}
                        allowClear
                        disabled={loading}
                    />
                </Form.Item>

                <Form.Item style={{ marginBottom: '8px' }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        icon={<SearchOutlined />}
                        loading={loading}
                    >
                        Filter
                    </Button>
                </Form.Item>

                <Form.Item style={{ marginBottom: '8px' }}>
                    <Button
                        onClick={handleClear}
                        icon={<ClearOutlined />}
                        disabled={loading || !location}
                    >
                        Clear
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

CafeFilter.propTypes = {
    initialLocation: PropTypes.string,
    onFilter: PropTypes.func.isRequired,
    loading: PropTypes.bool,
};

export default CafeFilter;