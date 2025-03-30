import React from 'react';
import { Form, Select } from 'antd';
import PropTypes from 'prop-types';

const { Option } = Select;

/**
 * Reusable select field component for forms
 * @param {Object} props - Component props
 * @param {string} props.name - Field name (required for form)
 * @param {string} props.label - Field label
 * @param {string} props.placeholder - Select placeholder
 * @param {boolean} props.required - Whether the field is required
 * @param {Array} props.options - Array of options { value, label }
 * @param {Object} props.rules - Form validation rules
 * @param {Function} props.onChange - Change handler
 * @param {boolean} props.disabled - Whether the field is disabled
 * @param {string|number} props.value - Initial value
 * @param {boolean} props.allowClear - Whether to allow clearing
 */
const FormSelectField = ({
                             name,
                             label,
                             placeholder,
                             required = false,
                             options = [],
                             rules = [],
                             onChange,
                             disabled = false,
                             value,
                             allowClear = true,
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
            <Select
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
                allowClear={allowClear}
                className="form-select"
            >
                {options.map((option) => (
                    <Option key={option.value} value={option.value}>
                        {option.label}
                    </Option>
                ))}
            </Select>
        </Form.Item>
    );
};

FormSelectField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]).isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    rules: PropTypes.array,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    allowClear: PropTypes.bool,
};

export default FormSelectField;