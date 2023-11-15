import { ConfigProvider, theme } from 'antd';
import arEG from 'antd/locale/ar_EG';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import SuspenseLoading from '../components/SuspenseLoading';
import store from '../redux/store';
import routes from './routes';

import './i18n';

import 'swiper/scss';
import 'swiper/scss/navigation';
import '../assets/scss/styles.scss';

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider
        locale={arEG}
        direction='rtl'
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: '#dda300',
            fontFamily: `'Cairo', sans-serif`,
          },
          components: {
            Typography: {
              fontFamily: `'Cairo', sans-serif`,
            },
            Button: {
              colorPrimary: '#cfa670',
              primaryColor: '#000',
            },
            Badge: {
              colorBgContainer: '#fff',
              textFontWeight: 'bold',
              textFontSize: 14,
            },
            InputNumber: {
              handleVisible: true,
            },
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
    </Provider>
  );
}

export default App;
