import {
  Button,
  Col,
  Image,
  InputNumber,
  Modal,
  Row,
  Spin,
  Typography,
  message,
} from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { API } from '../../core/api';
import { getErrorMessage, getImageUrl } from '../../helper';
import useDebounce from '../../hooks/useDebounce';
import { useAppDispatch } from '../../hooks/useRedux';
import { setUserStatus } from '../../redux/slices/status.slice';

function ProductModal(props: Readonly<MenuProductModalProps>) {
  const { isOpen, onClose, product } = props;

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [messageApi, contextHolder] = message.useMessage();
  const fistInit = useRef(true);

  const [qty, setQty] = useState(product.cart_qty);
  const [isLoading, setIsLoading] = useState(false);

  const { debouncedValue, setDebouncedValue } = useDebounce(qty);

  useEffect(() => {
    setTimeout(() => {
      fistInit.current = false;
    }, 1000);
  }, []);

  useEffect(() => {
    if (!fistInit.current) {
      modifyQty();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const modifyQty = async () => {
    setIsLoading(true);

    API.modifyCartQuantity({ item: product.item_name, qty: debouncedValue })
      .then((response) => {
        dispatch(setUserStatus(response.data.data));
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

  const onAddToCartBtnClick = () => {
    setDebouncedValue(1);
    setQty(1);
  };

  const onQtyChange = (value: number | null) => {
    if (value !== null && !isNaN(value)) {
      setQty(value);
    }
  };

  if (!product) {
    return null;
  }

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
      <Row gutter={{ xs: 10, md: 20 }}>
        <Col xs={24} md={10}>
          <Image src={getImageUrl(product.image)} preview={false} />
        </Col>

        <Col xs={24} md={14}>
          <Typography.Title level={4}>{product.item_name}</Typography.Title>
          <Typography.Title level={5}>
            {product.standard_rate} ج.م
          </Typography.Title>
          <Row className='mb-3' justify='start'>
            {debouncedValue > 0 ? (
              <Spin spinning={isLoading}>
                <InputNumber
                  controls
                  value={qty}
                  min={0}
                  onChange={onQtyChange}
                />
              </Spin>
            ) : (
              <Button loading={isLoading} onClick={onAddToCartBtnClick}>
                {t('add-to-cart')}
              </Button>
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
