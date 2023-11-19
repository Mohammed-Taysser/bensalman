import { Col, Empty, Image, Modal, Row, Typography, message } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { API } from '../../core/api';
import { getErrorMessage, getImageUrl } from '../../helper';
import ProductQuantity from '../ProductQuantity';
import SuspenseLoading from '../SuspenseLoading';

function ProductModal(props: Readonly<MenuProductModalProps>) {
  const [messageApi, contextHolder] = message.useMessage();

  const { isOpen, onClose, id } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProducts = async () => {
    setIsLoading(true);

    API.getProducts({ item_name: id })
      .then((response) => {
        setProducts(response.data.data);
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

  const Product = useCallback(() => {
    if (isLoading) {
      return (
        <Col xs={24}>
          <SuspenseLoading />
        </Col>
      );
    }

    if (products.length === 1) {
      const product = products[0];

      return (
        <Row gutter={{ xs: 10, md: 20 }}>
          <Col xs={24} md={10}>
            <Image src={getImageUrl(product.image)} preview={false} />
          </Col>

          <Col xs={24} md={14}>
            <Typography.Title level={4}>{product.item_name}</Typography.Title>

            <Typography.Title level={5}>
              {product.standard_rate} ج.م
            </Typography.Title>

            <ProductQuantity
              id={product.item_name}
              quantity={product.cart_qty}
            />

            <Typography.Text className='text-gray-400 mt-3'>
              {product.description}
            </Typography.Text>
          </Col>
        </Row>
      );
    }

    return (
      <Col xs={24}>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </Col>
    );
  }, [isLoading, products]);

  return (
    <Modal
      destroyOnClose={true}
      title=''
      open={isOpen}
      onCancel={onClose}
      centered
      className='md:!w-[60vw]'
      footer={[]}
    >
      {contextHolder}
      <Product />
    </Modal>
  );
}

export default ProductModal;
