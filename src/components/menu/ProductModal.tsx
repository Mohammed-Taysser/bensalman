import { Button, Col, Image, InputNumber, Modal, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../core/api';

function ProductModal(props: Readonly<MenuProductModalProps>) {
  const { isOpen, onClose, product } = props;

  const [qty, setQty] = useState(product.cart_qty);

  useEffect(() => {
    if (isOpen) {
      setQty(product.cart_qty);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const onQtyChange = (value: number | null) => {
    if (value) {
      setQty(value);
    }
  };

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
      <Row gutter={{ xs: 10, md: 20 }}>
        <Col xs={24} md={10}>
          <Image src={SERVER_URL + product.image} preview={false} />
        </Col>

        <Col xs={24} md={14}>
          <Typography.Title level={4}>{product.item_name}</Typography.Title>
          <Typography.Title level={5}>
            ${product.standard_rate}
          </Typography.Title>
          <Row className='mb-3' justify='start'>
            {product.cart_qty > 0 ? (
              <InputNumber
                controls
                min={1}
                value={qty}
                defaultValue={qty}
                onChange={onQtyChange}
              />
            ) : (
              <Button>Add To Cart</Button>
            )}
          </Row>
          <Typography.Text className='text-gray-400'>
            {product.description}
          </Typography.Text>
        </Col>
      </Row>
    </Modal>
  );
}

export default ProductModal;
