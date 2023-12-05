import { Button, Row, Spin, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiMinus, FiPlus } from 'react-icons/fi';
import API from '../core/api';
import { getErrorMessage } from '../helper';
import useDebounce from '../hooks/useDebounce';
import { useAppDispatch } from '../hooks/useRedux';
import { setUserStatus } from '../redux/slices/status.slice';

function ProductQuantity(props: Readonly<ProductQuantityProps>) {
  const { id, quantity, className } = props;
  const dispatch = useAppDispatch();

  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const isMount = useRef(false);

  const [qty, setQty] = useState(quantity);
  const [isLoading, setIsLoading] = useState(false);

  const { debouncedValue, setDebouncedValue } = useDebounce(qty);

  useEffect(() => {
    setTimeout(() => {
      isMount.current = true;
    }, 1000);
  }, []);

  useEffect(() => {
    if (isMount.current) {
      modifyQty();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const modifyQty = async () => {
    setIsLoading(true);

    return API.modifyCartQuantity({ item: id, qty: debouncedValue })
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

  const onIncreaseBtnClick = () => {
    setQty((prev) => prev + 1);
  };

  const onDecreaseBtnClick = () => {
    setQty((prev) => (prev - 1 <= 0 ? 0 : prev - 1));
  };

  return (
    <Row className={className ?? ''}>
      {contextHolder}
      {debouncedValue > 0 ? (
        <Spin spinning={isLoading}>
          <Button.Group>
            <Button
              size='small'
              onClick={onDecreaseBtnClick}
              icon={<FiMinus />}
            />

            <Button size='small' disabled>
              {qty}
            </Button>

            <Button
              size='small'
              onClick={onIncreaseBtnClick}
              icon={<FiPlus />}
            />
          </Button.Group>
        </Spin>
      ) : (
        <Button size='small' loading={isLoading} onClick={onAddToCartBtnClick}>
          {t('add-to-cart')}
        </Button>
      )}
    </Row>
  );
}

export default ProductQuantity;
