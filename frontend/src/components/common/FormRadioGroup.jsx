import { Form, Radio } from 'antd';
import PropTypes from 'prop-types';

/**
 * Reusable radio group component for forms
 * @param {Object} props - Component props
 * @param {string} props.name - Field name (required for form)
 * @param {string} props.label - Field label
 * @param {boolean} props.required - Whether the field is required
 * @param {Array} props.options - Array of options { value, label }
 * @param {Object} props.rules - Form validation rules
 * @param {Function} props.onChange - Change handler
 * @param {boolean} props.disabled - Whether the field is disabled
 * @param {string} props.value - Initial value
 * @param {string} props.direction - Layout direction ('horizontal' or 'vertical')
 */
const FormRadioGroup = ({
                            name,
                            label,
                            required = false,
                            options = [],
                            rules = [],
                            onChange,
                            disabled = false,
                            value,
                            direction = 'horizontal',
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
            <Radio.Group
                onChange={onChange}
                disabled={disabled}
                className={`radio-group-${direction}`}
            >
                {options.map((option) => (
                    <Radio key={option.value} value={option.value}>
                        {option.label}
                    </Radio>
                ))}
            </Radio.Group>
        </Form.Item>
    );
};

FormRadioGroup.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
                PropTypes.bool
            ]).isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    rules: PropTypes.array,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool
    ]),
    direction: PropTypes.oneOf(['horizontal', 'vertical']),
};

export default FormRadioGroup;