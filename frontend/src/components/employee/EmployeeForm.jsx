import { useState, useEffect } from 'react';
import { Form, Button, Card } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import FormTextField from '../common/FormTextField';
import FormRadioGroup from '../common/FormRadioGroup';
import FormSelectField from '../common/FormSelectField';
import UnsavedChangesAlert from '../common/UnsavedChangesAlert';
import { fetchCafes } from '../../redux/thunks/cafeThunks';
import { selectAllCafes } from '../../redux/slices/cafeSlice';

/**
 * Form component for creating/editing employees
 * @param {Object} props - Component props
 * @param {Object} props.initialValues - Initial form values
 * @param {Function} props.onSubmit - Function to call on form submission
 * @param {Function} props.onCancel - Function to call on cancel
 * @param {boolean} props.loading - Loading state
 * @param {string} props.mode - Form mode ('create' or 'edit')
 */
const EmployeeForm = ({
                          initialValues = {},
                          onSubmit,
                          onCancel,
                          loading = false,
                          mode = 'create'
                      }) => {
    const [form] = Form.useForm();
    const [formChanged, setFormChanged] = useState(false);
    const dispatch = useDispatch();
    const cafes = useSelector(selectAllCafes);

    // Fetch cafes when component mounts
    useEffect(() => {
        dispatch(fetchCafes());
    }, [dispatch]);

    // Set initial form values if in edit mode
    useEffect(() => {
        if (initialValues && Object.keys(initialValues).length > 0) {
            // Find cafe ID from cafe name
            let cafeId = '';
            if (initialValues.cafe) {
                const cafe = cafes.find(c => c.name === initialValues.cafe);
                cafeId = cafe ? cafe.id : '';
            }

            form.setFieldsValue({
                name: initialValues.name || '',
                email_address: initialValues.email_address || '',
                phone_number: initialValues.phone_number || '',
                gender: initialValues.gender || '',
                cafeId: cafeId,
            });
        }
    }, [initialValues, form, cafes]);

    // Handle form value changes to track unsaved changes
    const handleFormChange = () => {
        setFormChanged(true);
    };

    // Handle form submission
    const handleSubmit = (values) => {
        onSubmit(values);
        setFormChanged(false);
    };

    // Form validation rules
    const nameRules = [
        { min: 6, message: 'Name must be at least 6 characters' },
        { max: 10, message: 'Name cannot exceed 10 characters' },
    ];

    const emailRules = [
        { type: 'email', message: 'Please enter a valid email address' },
    ];

    const phoneRules = [
        {
            pattern: /^[89]\d{7}$/,
            message: 'Phone number must start with 8 or 9 and have 8 digits'
        },
    ];

    // Prepare cafe options for dropdown
    const cafeOptions = cafes.map(cafe => ({
        value: cafe.id,
        label: cafe.name,
    }));

    // Gender options for radio group
    const genderOptions = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
    ];

    return (
        <Card title={mode === 'create' ? 'Add New Employee' : 'Edit Employee'}>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                onValuesChange={handleFormChange}
                className="employee-form"
            >
                <FormTextField
                    name="name"
                    label="Name"
                    placeholder="Enter employee name"
                    required={true}
                    rules={nameRules}
                />

                <FormTextField
                    name="email_address"
                    label="Email Address"
                    placeholder="Enter email address"
                    type="email"
                    required={true}
                    rules={emailRules}
                />

                <FormTextField
                    name="phone_number"
                    label="Phone Number"
                    placeholder="Enter phone number (starting with 8 or 9)"
                    required={true}
                    rules={phoneRules}
                />

                <FormRadioGroup
                    name="gender"
                    label="Gender"
                    options={genderOptions}
                    required={true}
                />

                <FormSelectField
                    name="cafeId"
                    label="Assigned Cafe"
                    placeholder="Select a cafe"
                    options={cafeOptions}
                    required={true}
                />

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        style={{ marginRight: '10px' }}
                    >
                        {mode === 'create' ? 'Create Employee' : 'Update Employee'}
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

EmployeeForm.propTypes = {
    initialValues: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    mode: PropTypes.oneOf(['create', 'edit']),
};

export default EmployeeForm;