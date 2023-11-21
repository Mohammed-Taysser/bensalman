import { Button, Col, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import OrderItem from './OrderItem';

function OrderModal(props: Readonly<OrderModalProps>) {
  const { isOpen, onClose, selectedOrder } = props;
  const { t } = useTranslation();

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
      {selectedOrder.items.map((product) => (
        <Col xs={24} md={12} key={product.item_name}>
          <OrderItem product={product} />
        </Col>
      ))}

      <Button onClick={onClose}>{t('close')}</Button>
    </Modal>
  );
}

export default OrderModal;
