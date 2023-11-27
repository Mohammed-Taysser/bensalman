import { Col, Row, Typography } from 'antd';
import ProductQuantity from '../ProductQuantity';

function MenuItem(props: Readonly<MenuItemProps>) {
  const { product, onProductClick } = props;

  if (!product) {
    return null;
  }

  return (
    <div className='single-product-card'>
      <Row justify='space-between' className='product-content'>
        <Col order={1}>
          <Typography.Title
            level={4}
            className='product-title'
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

      <ProductQuantity
        id={product.item_name}
        quantity={product.cart_qty}
        className='justify-end'
      />
    </div>
  );
}

export default MenuItem;
