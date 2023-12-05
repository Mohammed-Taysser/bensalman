import { Button, Col, Image, Row, Spin, Typography, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
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

  const onIncreaseBtnClick = () => {
    setQty((prev) => prev + 1);
  };

  const onDecreaseBtnClick = () => {
    setQty((prev) => (prev - 1 <= 0 ? 0 : prev - 1));
  };

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

        <Spin spinning={cartStatus.data.loading.includes(product.item_name)}>
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
      </Col>
    </Row>
  );
}

export default CartItem;
