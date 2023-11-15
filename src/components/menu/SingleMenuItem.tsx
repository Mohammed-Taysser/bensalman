import { Button, Col, InputNumber, Row, Typography } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function SingleMenuItem(props: Readonly<SingleMenuItemProps>) {
  const { product, onProductClick } = props;

  const { t } = useTranslation();

  const [qty, setQty] = useState(product?.cart_qty ?? 1);

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
            onClick={() => onProductClick(product.name)}
          >
            {product.item_name}
          </Typography.Title>
        </Col>
        <Col order={3}>
          <Typography.Title level={4}>
            {product.standard_rate} ج.م
          </Typography.Title>
        </Col>
      </Row>

      <Typography.Text className='text-gray-400'>
        {product.description.substring(0, 80)}
      </Typography.Text>

      <Row justify='end'>
        {product.cart_qty > 0 ? (
          <InputNumber
            controls
            min={1}
            defaultValue={qty}
            onChange={onQtyChange}
          />
        ) : (
          <Button>{t('add-to-cart')}</Button>
        )}
      </Row>
    </div>
  );
}

export default SingleMenuItem;
