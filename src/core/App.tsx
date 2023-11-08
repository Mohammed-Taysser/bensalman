import { ConfigProvider, theme } from 'antd';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import SuspenseLoading from '../components/SuspenseLoading';
import routes from './routes';

import '../assets/scss/styles.scss';

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#dda300',
          fontFamily: `'Lato', sans-serif`,
        },
        components: {
          Typography: {
            fontFamily: `'Lato', sans-serif`,
          },
          Button: {
            colorPrimary: '#cfa670',
            primaryColor: '#000',
          },
          Badge:{
            colorBgContainer:'#fff',
            textFontWeight:'bold',
            textFontSize: 14
          }
        },
      }}
    >
      <Suspense fallback={<SuspenseLoading />}>
        <RouterProvider
          router={routes}
          fallbackElement={<SuspenseLoading />}
        />
      </Suspense>
    </ConfigProvider>
  );
}

export default App;
