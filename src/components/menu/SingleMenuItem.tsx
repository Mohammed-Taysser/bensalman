import { Button, Col, InputNumber, Row, Typography } from 'antd';
import { useState } from 'react';

function SingleMenuItem(props: Readonly<SingleMenuItemProps>) {
  const { product, onProductClick } = props;

  const [qty, setQty] = useState(product?.qty ?? 1);

  if (!product) {
    return null;
  }

  const onQtyChange = (value: number | null) => {
    if (value) {
      setQty(value);
    }
  };

  return (
    <div className='single-product-card'>
      <Row justify='space-between' className='product-content'>
        <Col order={1}>
          <Typography.Title
            level={4}
            className='cursor-pointer'
            onClick={() => onProductClick(product.id)}
          >
            {product.title}
          </Typography.Title>
        </Col>
        <Col order={3}>
          <Typography.Title level={4}>${product.price}</Typography.Title>
        </Col>
      </Row>

      <Typography.Text className='text-gray-400'>
        {product.description.substring(0, 80)}
      </Typography.Text>

      <Row justify='end'>
        {product.qty > 0 ? (
          <InputNumber
            controls
            min={1}
            defaultValue={qty}
            onChange={onQtyChange}
          />
        ) : (
          <Button>Add To Cart</Button>
        )}
      </Row>
    </div>
  );
}

export default SingleMenuItem;
