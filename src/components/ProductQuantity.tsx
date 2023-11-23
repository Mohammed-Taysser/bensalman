import { Button, InputNumber, Row, Spin, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import API from '../core/api';
import { getErrorMessage } from '../helper';
import useDebounce from '../hooks/useDebounce';
import { useAppDispatch } from '../hooks/useRedux';
import { setUserStatus } from '../redux/slices/status.slice';

function ProductQuantity(props: Readonly<ProductQuantityProps>) {
  const { id, quantity, onSuccessCallback, className } = props;
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

    API.modifyCartQuantity({ item: id, qty: debouncedValue })
      .then((response) => {
        dispatch(setUserStatus(response.data.data));

        if (onSuccessCallback) {
          onSuccessCallback();
        }
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

  return (
    <Row className={className ?? ''}>
      {contextHolder}
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
  );
}

export default ProductQuantity;
