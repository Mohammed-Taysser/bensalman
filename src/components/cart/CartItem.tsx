import { Col, Image, InputNumber, Row, Spin, Typography, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { API } from '../../core/api';
import { getErrorMessage, getImageUrl } from '../../helper';
import useDebounce from '../../hooks/useDebounce';
import { useAppDispatch } from '../../hooks/useRedux';
import { setUserStatus } from '../../redux/slices/status.slice';

function CartItem(props: Readonly<{ product: Product }>) {
  const { product } = props;
  const dispatch = useAppDispatch();

  const [messageApi, contextHolder] = message.useMessage();
  const fistInit = useRef(true);

  const [qty, setQty] = useState(product.cart_qty);
  const [isLoading, setIsLoading] = useState(false);

  const { debouncedValue } = useDebounce(qty);

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

  if (!product) {
    return null;
  }

  return (
    <Row gutter={{ xs: 10, md: 20 }}>
      {contextHolder}
      <Col>
        <Image src={getImageUrl(product.image)} preview={false} width={90} />
      </Col>

      <Col>
        <Typography.Title level={4} className='!my-0'>
          {product.item_name}
        </Typography.Title>

        <Typography.Title level={5} className='!my-2'>
          {product.total} ج.م
        </Typography.Title>

        <Row className='mb-3' justify='start'>
          <Spin spinning={isLoading}>
            <InputNumber controls value={qty} min={0} onChange={onQtyChange} />
          </Spin>
        </Row>
      </Col>
    </Row>
  );
}

export default CartItem;
