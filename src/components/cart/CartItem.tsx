import { Col, Image, InputNumber, Row, Typography } from 'antd';
import { useState } from 'react';

function CartItem(props: Readonly<{ product: Product }>) {
  const { product } = props;

  const [qty, setQty] = useState(product.cart_qty);

  const onQtyChange = (value: number | null) => {
    if (value) {
      setQty(value);
    }
  };

  return (
    <Row gutter={{ xs: 10, md: 20 }}>
      <Col>
        <Image src={product.image} preview={false} width={90} />
      </Col>

      <Col>
        <Typography.Title level={4} className='!my-0'>
          {product.item_name}
        </Typography.Title>

        <Typography.Title level={5} className='!my-2'>
          ${product.standard_rate}
        </Typography.Title>

        <Row className='mb-3' justify='start'>
          <InputNumber controls value={qty} onChange={onQtyChange} />
        </Row>
      </Col>
    </Row>
  );
}

export default CartItem;
