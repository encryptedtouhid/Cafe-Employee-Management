import { Layout, Typography, Alert, Menu } from 'antd';
import {
    HomeOutlined,
    CoffeeOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { selectCafeError } from '../redux/slices/cafeSlice';
import { selectEmployeeError } from '../redux/slices/employeeSlice';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const MainLayout = ({ children, title }) => {
    const location = useLocation();
    const cafeError = useSelector(selectCafeError);
    const employeeError = useSelector(selectEmployeeError);
    const error = cafeError || employeeError;

    const currentYear = new Date().getFullYear();

    // Sidebar active key
    const selectedKey = location.pathname.startsWith('/cafe')
        ? 'cafes'
        : location.pathname.startsWith('/employee')
            ? 'employees'
            : 'home';

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                width={200}
                style={{
                    background: '#001529',
                    position: 'fixed',
                    height: '100vh',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    zIndex: 1000,
                }}
            >
                <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>
                    GIC Café & Staff Manager
                </div>
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[selectedKey]}
                    style={{ height: '100%' }}
                >
                    <Menu.Item key="home" icon={<HomeOutlined />}>
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="cafes" icon={<CoffeeOutlined />}>
                        <Link to="/cafes">Cafes</Link>
                    </Menu.Item>
                    <Menu.Item key="employees" icon={<UserOutlined />}>
                        <Link to="/employees">Employees</Link>
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout style={{ marginLeft: 200 }}>
                <Header
                    style={{
                        background: '#fff',
                        padding: '0 24px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    }}
                >
                    <Title level={4} style={{ margin: 0, marginTop:'13px', textAlign: 'center' }}>
                        {title || 'Café & Staff Manager'}
                    </Title>
                </Header>

                <Content style={{ margin: '24px', overflow: 'auto' }}>
                    {error && (
                        <Alert
                            message="Error"
                            description={error}
                            type="error"
                            showIcon
                            closable
                            style={{ marginBottom: 16 }}
                        />
                    )}
                    <div className="page-container">
                        {children}
                    </div>
                </Content>

                <Footer style={{ textAlign: 'center' }}>
                    Café Employee Manager ©{currentYear} - Created with React & Node.js
                </Footer>
            </Layout>
        </Layout>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
};

export default MainLayout;
