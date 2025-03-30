import { Typography, Button, Layout, Space, Card } from 'antd';
import { CoffeeOutlined, UserOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const { Title, Paragraph } = Typography;

const WelcomePage = () => {
    return (
        <MainLayout title="Welcome to GIC Café & Staff Manager">
            <div className="welcome-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <Space direction="vertical" size="large" style={{ width: '100%', marginTop: '32px' }}>
                    <Card title="Get Started" style={{ textAlign: 'center' }}>
                        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                            <div>
                                <Button
                                    type="primary"
                                    size="large"
                                    icon={<CoffeeOutlined />}
                                    style={{ marginRight: '16px' }}
                                >
                                    <Link to="/cafes">Manage Cafés</Link>
                                </Button>
                                <Button
                                    size="large"
                                    icon={<UserOutlined />}
                                >
                                    <Link to="/employees">Manage Employees</Link>
                                </Button>
                            </div>
                        </Space>
                    </Card>

                    <Card title="Features">
                        <ul style={{ paddingLeft: '20px' }}>
                            <li>Add, edit, and delete cafés</li>
                            <li>Manage employees within cafés</li>
                            <li>Track employee work history</li>
                            <li>Filter cafés by location</li>
                            <li>View café employee statistics</li>
                        </ul>
                    </Card>
                </Space>

            </div>
        </MainLayout>
    );
};

export default WelcomePage;