import {
  Col,
  ConfigProvider,
  Row,
  Select,
  Space,
  Spin,
  message,
  theme,
} from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Orders from '../../components/kitchen/Orders';
import Products from '../../components/kitchen/Products';
import Status from '../../components/kitchen/Status';
import { WS_SERVER_URL } from '../../core/config';
import {
  selectKitchen,
  useAppDispatch,
  useAppSelector,
} from '../../hooks/useRedux';
import {
  getKitchenInfo,
  setSelectedShiftDropdown,
  setSelectedStatusDropdown,
} from '../../redux/slices/kitchen.slice';

function Kitchen() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const kitchenState = useAppSelector(selectKitchen);

  useEffect(() => {
    document.body.classList.add('light');

    wsConnect();
  }, []);

  useEffect(() => {
    dispatch(getKitchenInfo({ status: null, shift: null }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (kitchenState.error) {
      messageApi.open({
        type: 'error',
        content: kitchenState.error,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kitchenState.error]);

  const wsConnect = () => {
    const ws = new WebSocket(`${WS_SERVER_URL}`);
    console.log(111);

    ws.onopen = () => {
      ws.send('yalla');
    };

    ws.onmessage = (event) => {
      console.log(event.data);

      // try {
      //   const payload = JSON.parse(event.data);
      //   console.log(payload);
      // } catch (error) {
      //   console.log('Error parsing WebSocket message:');
      // }
    };

    ws.onerror = () => {
      console.log('Error in WebSocket connection');
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };
  };

  const onShiftChange = (value: string) => {
    dispatch(setSelectedShiftDropdown(value));

    dispatch(
      getKitchenInfo({
        shift: value,
        status: kitchenState.data.options.selectedStatus,
      })
    );
  };

  const onStatusChange = (value: string) => {
    dispatch(setSelectedStatusDropdown(value));

    dispatch(
      getKitchenInfo({
        status: value,
        shift: kitchenState.data.options.selectedShift,
      })
    );
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#fc8019',
          colorInfo: '#fc8019',
        },
        components: {
          Button: {
            colorPrimary: '#fc8019',
            primaryColor: '#fff',
          },
        },
      }}
    >
      {contextHolder}
      <Spin size='large' spinning={kitchenState.status === 'loading'}>
        <div className='kitchen-page mb-20'>
          <div className='p-5 bg-[#fc8019]'>
            <Space>
              <Select
                placeholder={t('select-shift')}
                onChange={onShiftChange}
                options={kitchenState.data.options.shifts}
                className='md:w-60 w-32'
                value={kitchenState.data.options.selectedShift}
              />

              <Select
                placeholder={t('select-status')}
                onChange={onStatusChange}
                options={kitchenState.data.options.status}
                className='w-32'
                value={kitchenState.data.options.selectedStatus}
              />
            </Space>
          </div>

          <Row justify='center' className='mt-5 md:mt-10'>
            <Col xs={23}>
              <Row gutter={[10, 10]}>
                <Col xs={24} md={5}>
                  <Status />
                </Col>

                <Col xs={24} md={19}>
                  <Products />
                </Col>
              </Row>
            </Col>
          </Row>

          <Row justify='center' className='mt-10'>
            <Col xs={23}>
              <Orders />
            </Col>
          </Row>
        </div>
      </Spin>
    </ConfigProvider>
  );
}

export default Kitchen;
