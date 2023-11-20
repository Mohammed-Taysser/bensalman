import { Col, Image, InputNumber, Row, Spin, Typography, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { getImageUrl } from '../../helper';
import useDebounce from '../../hooks/useDebounce';
import {
  selectCart,
  useAppDispatch,
  useAppSelector,
} from '../../hooks/useRedux';
import { modifyCartQuantity } from '../../redux/slices/cart.slice';
import { setUserStatus } from '../../redux/slices/status.slice';

function CartItem(props: Readonly<{ product: Product }>) {
  const { product } = props;
  const dispatch = useAppDispatch();
  const cartStatus = useAppSelector(selectCart);

  const [messageApi, contextHolder] = message.useMessage();
  const isMount = useRef(false);

  const [qty, setQty] = useState(product.cart_qty);

  const { debouncedValue } = useDebounce(qty);

  useEffect(() => {
    if (cartStatus.error) {
      messageApi.open({
        type: 'error',
        content: cartStatus.error,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartStatus.error]);

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
    dispatch(
      modifyCartQuantity({ item: product.item_name, qty: debouncedValue })
    ).then((action) => {
      if (modifyCartQuantity.fulfilled.match(action)) {
        dispatch(setUserStatus(action.payload.data));
      }
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
          {product.cart_qty * product.standard_rate} ج.م
        </Typography.Title>

        <Row className='mb-3' justify='start'>
          <Spin spinning={cartStatus.data.loading.includes(product.item_name)}>
            <InputNumber controls value={qty} min={0} onChange={onQtyChange} />
          </Spin>
        </Row>
      </Col>
    </Row>
  );
}

export default CartItem;
