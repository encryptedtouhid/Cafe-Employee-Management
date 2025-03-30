import React, { useCallback, useState, useEffect } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

/**
 * Filter component for cafes by location
 * @param {Object} props - Component props
 * @param {string} props.initialLocation - Initial location filter value
 * @param {Function} props.onFilter - Function to call when filter is applied
 */
const CafeFilter = ({ initialLocation = '', onFilter }) => {
    const [form] = Form.useForm();
    const [location, setLocation] = useState(initialLocation);

    // Set initial form values
    useEffect(() => {
        form.setFieldsValue({ location: initialLocation });
        setLocation(initialLocation);
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

    return (
        <Card className="filter-card">
            <Form
                form={form}
                layout="inline"
                onFinish={handleSubmit}
                initialValues={{ location: initialLocation }}
            >
                <Form.Item name="location" label="Location">
                    <Input
                        placeholder="Filter by location"
                        onChange={handleLocationChange}
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

CafeFilter.propTypes = {
    initialLocation: PropTypes.string,
    onFilter: PropTypes.func.isRequired,
};

export default CafeFilter;