import { Spin } from 'antd';
import PropTypes from 'prop-types';

/**
 * Reusable loading indicator component
 * @param {Object} props - Component props
 * @param {boolean} props.spinning - Whether the indicator is spinning
 * @param {string} props.tip - Text to display below the spinner
 * @param {string} props.size - Size of the spinner (small, default, large)
 * @param {React.ReactNode} props.children - Content to display when not loading
 * @param {string} props.className - Additional CSS class
 */
const LoadingIndicator = ({
                              spinning = true,
                              tip = 'Loading...',
                              size = 'large',
                              children,
                              className = '',
                          }) => {
    return (
        <Spin
            spinning={spinning}
            tip={tip}
            size={size}
            className={`loading-indicator ${className}`}
        >
            {children}
        </Spin>
    );
};

LoadingIndicator.propTypes = {
    spinning: PropTypes.bool,
    tip: PropTypes.string,
    size: PropTypes.oneOf(['small', 'default', 'large']),
    children: PropTypes.node,
    className: PropTypes.string,
};

export default LoadingIndicator;