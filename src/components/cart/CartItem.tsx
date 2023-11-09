import { Button, Col, Image, InputNumber, Row, Typography } from 'antd';
import { useState } from 'react';

function CartItem(props: Readonly<CartItemProps>) {
  const { product } = props;

  const [qty, setQty] = useState(product.qty);

  const onQtyChange = (value: number | null) => {
    if (value) {
      setQty(value);
    }
  };

  return (
    <Row gutter={{ xs: 10, md: 20 }}>
      <Col>
        <Image
          src={
            'https://wgl-demo.net/benoit/wp-content/uploads/2021/03/bg-column_02.jpg'
          }
          preview={false}
          width={90}
        />
      </Col>

      <Col>
        <Typography.Title level={4} className='!my-0'>
          {product.title}
        </Typography.Title>

        <Typography.Title level={5} className='!my-2'>
          ${product.price}
        </Typography.Title>

        <Row className='mb-3' justify='start'>
          {product.qty > 0 ? (
            <InputNumber controls min={1} value={qty} onChange={onQtyChange} />
          ) : (
            <Button>Add To Cart</Button>
          )}
        </Row>
      </Col>
    </Row>
  );
}

export default CartItem;
