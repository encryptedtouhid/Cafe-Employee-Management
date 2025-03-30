import React from 'react';
import { Layout, Typography, Alert } from 'antd';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Navigation from './Navigation';
import { selectCafeError } from '../redux/slices/cafeSlice';
import { selectEmployeeError } from '../redux/slices/employeeSlice';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

/**
 * Main layout component that wraps all pages
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {string} props.title - Page title
 */
const MainLayout = ({ children, title }) => {
    // Get error states from Redux
    const cafeError = useSelector(selectCafeError);
    const employeeError = useSelector(selectEmployeeError);
    const error = cafeError || employeeError;

    const currentYear = new Date().getFullYear();

    return (
        <Layout className="layout">
            <Header className="header">
                <div className="logo">
                    <Title level={4} style={{ color: 'white', margin: 0 }}>
                        Café Employee Manager
                    </Title>
                </div>
                <Navigation />
            </Header>

            <Content className="content">
                <div className="page-container">
                    {title && (
                        <Title level={2} className="page-title">
                            {title}
                        </Title>
                    )}

                    {error && (
                        <Alert
                            message="Error"
                            description={error}
                            type="error"
                            showIcon
                            closable
                            className="error-alert"
                        />
                    )}

                    {children}
                </div>
            </Content>

            <Footer className="footer">
                <Typography.Text>
                    Café Employee Manager ©{currentYear} - Created with React & Node.js
                </Typography.Text>
            </Footer>
        </Layout>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
};

export default MainLayout;