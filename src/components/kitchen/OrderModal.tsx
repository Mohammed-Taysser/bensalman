import { Col, Empty, Modal } from 'antd';
import { useCallback, useState } from 'react';
import SuspenseLoading from '../SuspenseLoading';
import OrderItem from './OrderItem';

function OrderModal(props: Readonly<OrderModalProps>) {
  const { isOpen, onClose } = props;
  const [items, setItems] = useState<CartProduct[]>([]);

  const Products = useCallback(() => {
    if (items.length === 12) {
      return (
        <Col xs={24}>
          <SuspenseLoading />
        </Col>
      );
    }

    if (items.length > 0) {
      return items.map((product) => (
        <Col xs={24} md={12} key={product.item_name}>
          <OrderItem product={product} />
        </Col>
      ));
    }

    return (
      <Col xs={24}>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </Col>
    );
  }, [items]);

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
      <Products />
    </Modal>
  );
}

export default OrderModal;
