import { Button, Col, InputNumber, Row, Spin, Typography, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { API } from '../../core/api';
import { getErrorMessage } from '../../helper';
import useDebounce from '../../hooks/useDebounce';
import { useAppDispatch } from '../../hooks/useRedux';
import { setUserStatus } from '../../redux/slices/status.slice';

function MenuItem(props: Readonly<MenuItemProps>) {
  const { product, onProductClick } = props;
  const dispatch = useAppDispatch();

  const { t } = useTranslation();
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

  const onQtyChange = (value: number | null) => {
    if (value !== null && !isNaN(value)) {
      setQty(value);
    }
  };

  const onAddToCartBtnClick = () => {
    setDebouncedValue(1);
    setQty(1);
  };

  if (!product) {
    return null;
  }

  return (
    <div className='single-product-card'>
      {contextHolder}
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
        {debouncedValue > 0 ? (
          <Spin spinning={isLoading}>
            <InputNumber controls value={qty} min={0} onChange={onQtyChange} />
          </Spin>
        ) : (
          <Button loading={isLoading} onClick={onAddToCartBtnClick}>
            {t('add-to-cart')}
          </Button>
        )}
      </Row>
    </div>
  );
}

export default MenuItem;
