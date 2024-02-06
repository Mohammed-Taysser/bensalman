import { Card, Col, Empty, Image, Row, Typography, message } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import columnBG from '../../assets/images/background/bg-column.png';
import SuspenseLoading from '../../components/SuspenseLoading';
import API from '../../core/api';
import { getErrorMessage, getImageUrl } from '../../helper';
import { useAppDispatch } from '../../hooks/useRedux';
import Base from '../../layouts/Base';
import { setUserStatus } from '../../redux/slices/status.slice';

function Orders() {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [orders, setOrders] = useState<Order[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getReservationApi();
  }, []);

  const getReservationApi = async () => {
    setIsLoading(true);

    API.getOrders()
      .then((res) => {
        setOrders(res.data.data.orders);
        dispatch(setUserStatus(res.data.data));
      })
      .catch((error) => {
        messageApi.open({
          type: 'error',
          content: getErrorMessage(error),
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const OrdersContent = useCallback(() => {
    if (isLoading) {
      return (
        <Col xs={24}>
          <SuspenseLoading />
        </Col>
      );
    }

    if (orders.length > 0) {
      return orders.map((order) => (
        <Col key={order.name} xs={24}>
          <Card size='small' title={order.date}>
            <Row gutter={[10, 10]}>
              {order.products.map((product) => (
                <Col xs={24} md={8} key={product.item_name}>
                  <Row gutter={{ xs: 10, md: 20 }}>
                    <Col>
                      <Image
                        src={getImageUrl(product.image)}
                        preview={false}
                        width={50}
                      />
                    </Col>

                    <Col>
                      <Typography.Title level={5} className='!my-0'>
                        {product.item_name}
                      </Typography.Title>

                      <Typography.Text className='block'>
                        {product.standard_rate} ج.م
                      </Typography.Text>
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      ));
    }

    return (
      <Col xs={24}>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </Col>
    );
  }, [isLoading, orders]);

  return (
    <Base>
      {contextHolder}
      <Row
        className='min-h-screen justify-center md:justify-around menu-page '
        align='middle'
      >
        <Col xs={22} md={18}>
          <Row
            gutter={[
              { xs: 10, md: 20 },
              { xs: 10, md: 20 },
            ]}
            className='menu-wrapper'
            style={{
              backgroundImage: `url('${columnBG}')`,
            }}
          >
            <OrdersContent />
          </Row>
        </Col>
      </Row>
    </Base>
  );
}

export default Orders;
