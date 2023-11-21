import { Col, ConfigProvider, Row, Select, Space, theme } from 'antd';
import { useEffect } from 'react';
import Orders from '../../components/kitchen/Orders';
import Products from '../../components/kitchen/Products';
import Status from '../../components/kitchen/Status';
import { selectKitchen, useAppSelector } from '../../hooks/useRedux';

function Kitchen() {
  const kitchenState = useAppSelector(selectKitchen);

  useEffect(() => {
    document.body.classList.add('light');
  }, []);

  const onShiftChange = (value: string) => {
    console.log(value);
  };

  const onStatusChange = (value: string) => {
    console.log(value);
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
      <div className='kitchen-page mb-10'>
        <div className='p-5 bg-[#fc8019]'>
          <Space>
            <Select
              placeholder='Select Shift'
              onChange={onShiftChange}
              options={kitchenState.data.options.shift}
              className='w-32'
            />

            <Select
              placeholder='Select Status'
              onChange={onStatusChange}
              options={kitchenState.data.options.status}
              className='w-32'
            />
          </Space>
        </div>

        <Row justify='center' className='mt-10'>
          <Col xs={23}>
            <Row gutter={[10, 10]}>
              <Col xs={24} md={6}>
                <Status />
              </Col>

              <Col xs={24} md={18}>
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
    </ConfigProvider>
  );
}

export default Kitchen;
