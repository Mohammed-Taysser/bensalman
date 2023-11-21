import { Button, Col, Empty, Row, Typography } from 'antd';
import { useMemo, useState } from 'react';
import { selectKitchen, useAppSelector } from '../../hooks/useRedux';
import OrderModal from './OrderModal';

function Orders() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const kitchenState = useAppSelector(selectKitchen);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const onOrderClick = (id: string) => {
    setIsPopupOpen(true);
    setSelectedOrderId(id);
  };

  const onClosePopup = () => {
    setIsPopupOpen(false);
  };

  const selectedOrder = useMemo(
    () =>
      kitchenState.data.orders.find(
        (product) => product.orderNumber === selectedOrderId
      ),
    [selectedOrderId, kitchenState.data.orders]
  );

  if (kitchenState.data.orders.length > 0) {
    return (
      <>
        {selectedOrder && (
          <OrderModal
            isOpen={isPopupOpen}
            onClose={onClosePopup}
            selectedOrder={selectedOrder}
          />
        )}

        <Row className='justify-center md:justify-start' gutter={[15, 15]}>
          {kitchenState.data.orders.map((item) => (
            <Col xs={24} sm={12} md={8} key={item.orderNumber}>
              <div className='px-5 py-8 rounded border border-solid border-[#fc8019]'>
                <Row align='middle'>
                  <Col flex='auto'>
                    <Typography.Title level={4} className='!my-0'>
                      {item.orderNumber}
                    </Typography.Title>
                    <Typography.Title
                      level={5}
                      className='!my-0 !text-gray-400 '
                    >
                      {item.tableNumber}
                    </Typography.Title>
                  </Col>

                  <Col>
                    <Button
                      key='details'
                      type='primary'
                      onClick={() => onOrderClick(item.orderNumber)}
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

  return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
}

export default Orders;
