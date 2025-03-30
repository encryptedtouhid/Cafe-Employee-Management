import { Menu } from 'antd';
import {
    CoffeeOutlined,
    UserOutlined,
    HomeOutlined
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

/**
 * Navigation component for the application
 */
const Navigation = () => {
    const location = useLocation();

    // Determine which nav item is active based on current path
    const getSelectedKey = () => {
        const path = location.pathname;
        if (path.startsWith('/cafe')) return 'cafes';
        if (path.startsWith('/employee')) return 'employees';
        return 'home';
    };

    return (
        <Menu
            mode="horizontal"
            selectedKeys={[getSelectedKey()]}
            className="main-navigation"
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
    );
};

export default Navigation;