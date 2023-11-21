import { Button, Col, Empty, Row, Typography } from 'antd';
import { useState } from 'react';
import OrderModal from './OrderModal';

function Orders() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const onOrderClick = (id: string) => {
    setIsPopupOpen(true);
    console.log(id);
  };

  const onClosePopup = () => {
    setIsPopupOpen(false);
  };

  if (Math.random() === 5) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  return (
    <>
      <OrderModal isOpen={isPopupOpen} onClose={onClosePopup} />

      <Row className='justify-center md:justify-start' gutter={[15, 15]}>
        {Array.from({ length: 30 }).map((_item, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <div className='px-5 py-8 rounded border border-solid border-[#fc8019]'>
              <Row align='middle'>
                <Col flex='auto'>
                  <Typography.Title level={4} className='!my-0'>
                    Order Number
                  </Typography.Title>
                  <Typography.Title level={5} className='!my-0 !text-gray-400 '>
                    Table Number
                  </Typography.Title>
                </Col>

                <Col>
                  <Button
                    key='details'
                    type='primary'
                    onClick={() => onOrderClick(index)}
                  >
                    Details
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Orders;
