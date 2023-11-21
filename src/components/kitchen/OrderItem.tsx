import { Col, Image, InputNumber, Row, Typography } from 'antd';
import { getImageUrl } from '../../helper';

function OrderItem(props: Readonly<{ product: Product }>) {
  const { product } = props;

  return (
    <Row gutter={{ xs: 10, md: 20 }}>
      <Col>
        <Image src={getImageUrl(product.image)} preview={false} width={90} />
      </Col>

      <Col>
        <Typography.Title level={4} className='!my-0'>
          {product.item_name}
        </Typography.Title>

        <Typography.Title level={5} className='!my-2'>
          {product.cart_qty * product.standard_rate} ج.م
        </Typography.Title>

        <Row className='mb-3' justify='start'>
          <InputNumber controls value={product.cart_qty} min={0} />
        </Row>
      </Col>
    </Row>
  );
}

export default OrderItem;
