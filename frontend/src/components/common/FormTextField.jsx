import { Form, Input } from 'antd';
import PropTypes from 'prop-types';

/**
 * Reusable text field component for forms
 * @param {Object} props - Component props
 * @param {string} props.name - Field name (required for form)
 * @param {string} props.label - Field label
 * @param {string} props.placeholder - Input placeholder
 * @param {boolean} props.required - Whether the field is required
 * @param {string} props.type - Input type (text, password, email, etc.)
 * @param {Object} props.rules - Form validation rules
 * @param {Function} props.onChange - Change handler
 * @param {boolean} props.disabled - Whether the field is disabled
 * @param {string} props.value - Initial value
 */
const FormTextField = ({
                           name,
                           label,
                           placeholder,
                           required = false,
                           type = 'text',
                           rules = [],
                           onChange,
                           disabled = false,
                           value,
                       }) => {
    // Build validation rules
    const validationRules = [...rules];

    // Add required rule if needed
    if (required) {
        validationRules.unshift({
            required: true,
            message: `${label} is required`,
        });
    }

    return (
        <Form.Item
            name={name}
            label={label}
            rules={validationRules}
            initialValue={value}
        >
            <Input
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
                className="form-input"
            />
        </Form.Item>
    );
};

FormTextField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    type: PropTypes.string,
    rules: PropTypes.array,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    value: PropTypes.string,
};

export default FormTextField;