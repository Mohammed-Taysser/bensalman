import { Col, Image, Row, Typography } from 'antd';
import { getImageUrl } from '../../helper';
import Quantity from '../ProductQuantity';

function MenuItem(props: Readonly<MenuItemProps>) {
  const { product, onProductClick } = props;

  return (
    <Row gutter={10}>
      <Col>
        <Image
          src={getImageUrl(product.image)}
          preview={false}
          className='!w-16 !h-16 md:!w-24 md:!h-24'
        />
      </Col>

      <Col flex='auto'>
        <div className='single-product-card'>
          <Row justify='space-between' className='product-content'>
            <Col order={1}>
              <Typography.Title
                level={4}
                className='product-title mt-0 !text-lg md:!text-xl'
                onClick={() => onProductClick(product.name)}
              >
                {product.item_name}
              </Typography.Title>
            </Col>

            <Col order={3}>
              <Typography.Title className='!m-0 !text-base md:!text-lg' level={4}>
                {product.standard_rate} ج.م
              </Typography.Title>
            </Col>
          </Row>

          <Typography.Text className='text-gray-400 hidden md:visible'>
            {product.description.substring(0, 80)}
          </Typography.Text>

          <Quantity
            id={product.item_name}
            quantity={product.cart_qty}
            className='md:justify-end'
          />
        </div>
      </Col>
    </Row>
  );
}

export default MenuItem;
