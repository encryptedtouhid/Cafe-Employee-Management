import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Typography, Space } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

/**
 * Error Boundary component to catch JavaScript errors anywhere in the child component tree
 * and display a fallback UI instead of crashing the whole application
 */
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    /**
     * Update state when an error occurs
     */
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    /**
     * Log error information when component catches an error
     */
    componentDidCatch(error, errorInfo) {
        this.setState({ errorInfo });

        // Log the error to console
        console.error('Error caught by ErrorBoundary:', error, errorInfo);

        // You could also log to an error reporting service here
        // Example: logErrorToService(error, errorInfo);
    }

    /**
     * Reset error state and try rerendering the component
     */
    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });
    };

    render() {
        const { hasError, error, errorInfo } = this.state;
        const { children, fallback } = this.props;

        // Return children if there's no error
        if (!hasError) {
            return children;
        }

        // Use custom fallback if provided
        if (fallback) {
            return typeof fallback === 'function'
                ? fallback(error, errorInfo, this.handleReset)
                : fallback;
        }

        // Default error UI
        return (
            <div className="error-boundary-container">
                <Alert
                    type="error"
                    showIcon
                    message={
                        <Title level={4}>Something went wrong</Title>
                    }
                    description={
                        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                            <Text>
                                An error occurred in this component. Please try refreshing the page or contact support if the problem persists.
                            </Text>

                            {process.env.NODE_ENV !== 'production' && error && (
                                <div className="error-details">
                                    <Text strong>Error:</Text>
                                    <Text code>{error.toString()}</Text>

                                    {errorInfo && (
                                        <div className="stack-trace">
                                            <Text strong>Component Stack:</Text>
                                            <pre>{errorInfo.componentStack}</pre>
                                        </div>
                                    )}
                                </div>
                            )}

                            <Button
                                type="primary"
                                icon={<ReloadOutlined />}
                                onClick={this.handleReset}
                            >
                                Try Again
                            </Button>
                        </Space>
                    }
                />
            </div>
        );
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
    fallback: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func
    ]),
};

export default ErrorBoundary;