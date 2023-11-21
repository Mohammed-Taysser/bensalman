import {
  Col,
  ConfigProvider,
  Row,
  Select,
  SelectProps,
  Space,
  theme,
} from 'antd';
import { useEffect } from 'react';
import Orders from '../../components/kitchen/Orders';
import Products from '../../components/kitchen/Products';
import Status from '../../components/kitchen/Status';

function Kitchen() {
  const shiftsOptions: SelectProps['options'] = Array.from({ length: 20 }).map(
    (_, index) => ({
      label: `SHIFT-${index.toString().padStart(2, '0')}`,
      value: index,
    })
  );

  const statusOptions: SelectProps['options'] = [
    {
      label: `Ordered`,
      value: 1,
    },
    {
      label: `Completed`,
      value: 2,
    },
    {
      label: `On Table`,
      value: 3,
    },
  ];

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
              options={shiftsOptions}
              className='w-32'
            />

            <Select
              placeholder='Select Status'
              onChange={onStatusChange}
              options={statusOptions}
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
