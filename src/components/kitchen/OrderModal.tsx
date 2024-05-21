import {
  Button,
  Col,
  Image,
  Modal,
  Popconfirm,
  Row,
  Space,
  Tag,
  Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { getImageUrl, toArabicDigits } from '../../helper';

function OrderModal(props: Readonly<KitchenOrderModalProps>) {
  const { isOpen, onClose, selectedOrder } = props;
  const { t } = useTranslation();

  const onConfirmClick = () => {
    console.log(selectedOrder);
  };

  return (
    <Modal
      destroyOnClose={true}
      title=''
      open={isOpen}
      onCancel={onClose}
      centered
      className='md:!w-[80vw]'
      footer={[]}
    >
      <Typography.Title level={3}>
        {t('chair-number')}: {selectedOrder.chair}
      </Typography.Title>

      <Space align='center'>
        <Typography.Title level={4} className='!m-0'>
          {t('order-number')}:
        </Typography.Title>

        <Space>
          {selectedOrder.carts.map((cart) => (
            <Tag key={cart}>{cart}</Tag>
          ))}
        </Space>
      </Space>

      <div className='kitchen-page-orders-products-list my-10'>
        <Row className='!mx-0' gutter={[10, 10]} align='stretch'>
          {selectedOrder.items.map((item) => (
            <Col xs={24} sm={12} md={8} key={item.item}>
              <div className='single-product h-full'>
                <div className='body'>
                  <Row className='w-full' gutter={[10, 10]}>
                    <Col xs={8} md={10}>
                      <div className='w-20 h-20'>
                        <Image
                          preview={false}
                          src={getImageUrl(item.image)}
                          width={80}
                        />
                      </div>
                    </Col>

                    <Col xs={16} md={14}>
                      <div>
                        <div className='title'>{item.item}</div>
                        <div className='subtitle'>
                          {t('quantity')}: {toArabicDigits(item.qty)}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <Space>
        <Popconfirm
          title={t('are-you-sure-to-confirm-order')}
          onConfirm={onConfirmClick}
          okText={t('yes')}
          cancelText={t('cancel')}
        >
          <Button type='primary'>{t('confirm')}</Button>
        </Popconfirm>

        <Button onClick={onClose}>{t('close')}</Button>
      </Space>
    </Modal>
  );
}

export default OrderModal;
