import { useRoutes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import routes from './routes';

const App = () => {
    const routeElements = useRoutes(routes);

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#1890ff',
                    borderRadius: 4,
                },
            }}
        >
            {routeElements}
        </ConfigProvider>
    );
};

export default App;