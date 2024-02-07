import { Button, Col, Empty, Row, Typography } from 'antd';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { selectKitchen, useAppSelector } from '../../hooks/useRedux';
import OrderModal from './OrderModal';

function Orders() {
  const { t } = useTranslation();
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
        (product) => product.chair === selectedOrderId
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
            <Col xs={24} sm={12} md={8} key={item.chair}>
              <div className='px-5 py-8 rounded border border-solid border-[#fc8019]'>
                <Row align='middle'>
                  <Col flex='auto'>
                    <Typography.Title level={4} className='!my-0'>
                      {item.chair}
                    </Typography.Title>

                    <Typography.Title
                      level={5}
                      className='!my-0 !text-gray-400 '
                    >
                      {item.carts[0]}
                    </Typography.Title>
                  </Col>

                  <Col>
                    <Button
                      type='primary'
                      onClick={() => onOrderClick(item.chair)}
                    >
                      {t('details')}
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
