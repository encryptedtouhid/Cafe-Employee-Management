import React, { useState, useEffect } from 'react';
import { Form, Button, Upload, Card, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import FormTextField from '../common/FormTextField';
import UnsavedChangesAlert from '../common/UnsavedChangesAlert';

/**
 * Form component for creating/editing cafes
 * @param {Object} props - Component props
 * @param {Object} props.initialValues - Initial form values
 * @param {Function} props.onSubmit - Function to call on form submission
 * @param {Function} props.onCancel - Function to call on cancel
 * @param {boolean} props.loading - Loading state
 * @param {string} props.mode - Form mode ('create' or 'edit')
 */
const CafeForm = ({
                      initialValues = {},
                      onSubmit,
                      onCancel,
                      loading = false,
                      mode = 'create'
                  }) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [formChanged, setFormChanged] = useState(false);

    // Set initial form values and file list if in edit mode
    useEffect(() => {
        if (initialValues && Object.keys(initialValues).length > 0) {
            form.setFieldsValue({
                name: initialValues.name || '',
                description: initialValues.description || '',
                location: initialValues.location || '',
            });

            // If logo exists, add it to fileList
            if (initialValues.logo) {
                setFileList([
                    {
                        uid: '-1',
                        name: 'logo.png',
                        status: 'done',
                        url: initialValues.logo,
                    },
                ]);
            }
        }
    }, [initialValues, form]);

    // Handle form value changes to track unsaved changes
    const handleFormChange = () => {
        setFormChanged(true);
    };

    // Handle form submission
    const handleSubmit = (values) => {
        // Get the file if exists
        const logoFile = fileList.length > 0 && fileList[0].originFileObj
            ? fileList[0].originFileObj
            : null;

        // Prepare data to submit
        const cafeData = {
            ...values,
            logo: logoFile || initialValues.logo || null,
        };

        onSubmit(cafeData);
        setFormChanged(false);
    };

    // Handle logo file upload
    const handleLogoChange = ({ fileList: newFileList }) => {
        // Check file size (2MB limit)
        if (newFileList.length > 0 && newFileList[0].size > 2 * 1024 * 1024) {
            message.error('Logo file must be smaller than 2MB!');
            return;
        }

        setFileList(newFileList);
        setFormChanged(true);
    };

    // Custom file upload button
    const uploadButton = (
        <div>
            <UploadOutlined />
            <div>Upload Logo</div>
        </div>
    );

    // Form validation rules
    const nameRules = [
        { min: 6, message: 'Name must be at least 6 characters' },
        { max: 10, message: 'Name cannot exceed 10 characters' },
    ];

    const descriptionRules = [
        { max: 256, message: 'Description cannot exceed 256 characters' },
    ];

    return (
        <Card title={mode === 'create' ? 'Add New Cafe' : 'Edit Cafe'}>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                onValuesChange={handleFormChange}
                className="cafe-form"
            >
                <FormTextField
                    name="name"
                    label="Name"
                    placeholder="Enter cafe name"
                    required={true}
                    rules={nameRules}
                />

                <FormTextField
                    name="description"
                    label="Description"
                    placeholder="Enter cafe description"
                    required={true}
                    rules={descriptionRules}
                />

                <FormTextField
                    name="location"
                    label="Location"
                    placeholder="Enter cafe location"
                    required={true}
                />

                <Form.Item
                    name="logo"
                    label="Logo"
                    valuePropName="fileList"
                    extra="Logo file must be smaller than 2MB. Supported formats: JPG, PNG, GIF"
                >
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleLogoChange}
                        beforeUpload={() => false} // Prevent auto upload
                        maxCount={1}
                        accept="image/*"
                    >
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        style={{ marginRight: '10px' }}
                    >
                        {mode === 'create' ? 'Create Cafe' : 'Update Cafe'}
                    </Button>
                    <Button
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                </Form.Item>
            </Form>

            <UnsavedChangesAlert hasUnsavedChanges={formChanged} />
        </Card>
    );
};

CafeForm.propTypes = {
    initialValues: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    mode: PropTypes.oneOf(['create', 'edit']),
};

export default CafeForm;