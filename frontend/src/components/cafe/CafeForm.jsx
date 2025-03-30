import { useState, useEffect } from 'react';
import { Form, Button, Upload, Card, message, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

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
                        name: 'current-logo.png',
                        status: 'done',
                        url: initialValues.logo,
                    },
                ]);
            } else {
                // Clear fileList if no logo
                setFileList([]);
            }
        }
    }, [initialValues, form]);

    // Handle form value changes to track unsaved changes
    const handleFormChange = () => {
        setFormChanged(true);
    };

    // Handle form submission
    const handleSubmit = (values) => {
        // Get the file if exists (either a new file or null if removed)
        const logoFile = fileList.length > 0 && fileList[0].originFileObj
            ? fileList[0].originFileObj  // New file uploaded
            : fileList.length > 0
                ? fileList[0].url          // Existing file kept
                : null;                    // No file (removed or never existed)

        // Prepare data to submit
        const cafeData = {
            ...values,
            logo: logoFile,
        };

        onSubmit(cafeData);
        setFormChanged(false);
    };

    // Handle logo file upload
    const handleLogoChange = ({ fileList: newFileList }) => {
        // Check file size (2MB limit) for new uploads
        if (
            newFileList.length > 0 &&
            newFileList[0].originFileObj &&
            newFileList[0].originFileObj.size > 2 * 1024 * 1024
        ) {
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

    // Form validation rules based on Swagger documentation
    const nameRules = [
        { required: true, message: 'Name is required' },
        { min: 6, message: 'Name must be at least 6 characters' },
        { max: 10, message: 'Name cannot exceed 10 characters' },
    ];

    const descriptionRules = [
        { required: true, message: 'Description is required' },
        { max: 256, message: 'Description cannot exceed 256 characters' },
    ];

    const locationRules = [
        { required: true, message: 'Location is required' },
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
                <Form.Item
                    name="name"
                    label="Name"
                    tooltip="Name must be between 6-10 characters"
                    rules={nameRules}
                >
                    <Input placeholder="Enter cafe name (6-10 characters)" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    tooltip="Maximum 256 characters"
                    rules={descriptionRules}
                >
                    <Input.TextArea
                        placeholder="Enter cafe description (max 256 characters)"
                        rows={4}
                    />
                </Form.Item>

                <Form.Item
                    name="location"
                    label="Location"
                    rules={locationRules}
                >
                    <Input placeholder="Enter cafe location" />
                </Form.Item>

                <Form.Item
                    label="Logo"
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

            {formChanged && (
                <div className="unsaved-changes-alert" style={{ marginTop: '16px', color: 'orange' }}>
                    You have unsaved changes. Please save or cancel your changes.
                </div>
            )}
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