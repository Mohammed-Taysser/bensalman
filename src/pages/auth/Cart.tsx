import { Button, Col, Empty, Row, Space, Statistic, message } from 'antd';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { MdOutlineMenuBook } from 'react-icons/md';
import { PiShoppingCartDuotone } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import columnBG from '../../assets/images/background/bg-column.png';
import SuspenseLoading from '../../components/SuspenseLoading';
import CartItem from '../../components/cart/CartItem';
import {
  selectCart,
  useAppDispatch,
  useAppSelector,
} from '../../hooks/useRedux';
import Base from '../../layouts/Base';
import { checkout, getCartItems } from '../../redux/slices/cart.slice';
import { setUserStatus } from '../../redux/slices/status.slice';

function Cart() {
  const { t } = useTranslation();
  const navigateTo = useNavigate();
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const cartState = useAppSelector(selectCart);

  useEffect(() => {
    dispatch(getCartItems()).then((action) => {
      if (getCartItems.fulfilled.match(action)) {
        dispatch(setUserStatus(action.payload.data));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cartState.error) {
      messageApi.open({
        type: 'error',
        content: cartState.error,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartState.error]);

  const onCheckoutBtnClick = async () => {
    dispatch(checkout()).then((action) => {
      if (checkout.fulfilled.match(action)) {
        dispatch(setUserStatus(action.payload.data));
        navigateTo('/success');
      }
    });
  };

  const Products = useCallback(() => {
    if (cartState.status === 'loading') {
      return (
        <Col xs={24}>
          <SuspenseLoading />
        </Col>
      );
    }

    if (cartState.data.items.length > 0) {
      return cartState.data.items.map((product) => (
        <Col xs={24} md={12} key={product.item_name}>
          <CartItem product={product} />
        </Col>
      ));
    }

    return (
      <Col xs={24}>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </Col>
    );
  }, [cartState.status, cartState.data.items]);

  return (
    <Base>
      {contextHolder}
      <Row
        className='min-h-screen justify-center md:justify-around menu-page '
        align='middle'
      >
        <Col xs={22} md={18}>
          <Row
            gutter={[
              { xs: 10, md: 20 },
              { xs: 10, md: 20 },
            ]}
            align='middle'
            className='menu-wrapper'
            style={{
              backgroundImage: `url('${columnBG}')`,
            }}
          >
            <Products />

            <Col xs={24} className='mt-5'>
              <Space>
                <Button
                  size='large'
                  type='primary'
                  onClick={onCheckoutBtnClick}
                >
                  {t('checkout')}
                </Button>
                <Button
                  size='large'
                  onClick={() => navigateTo('/menu')}
                  icon={
                    <MdOutlineMenuBook className='text-xl relative top-1 ' />
                  }
                >
                  {t('continue-shopping')}
                </Button>
              </Space>
            </Col>

            <Col xs={24} className='mt-8'>
              <Row gutter={16}>
                <Col xs={12} md={6}>
                  <Statistic
                    title={t('total-price')}
                    value={cartState.data.total_amount}
                    prefix={<BiMoneyWithdraw />}
                  />
                </Col>

                <Col xs={12} md={6}>
                  <Statistic
                    title={t('total-products')}
                    value={cartState.data.total_items}
                    prefix={<PiShoppingCartDuotone />}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Base>
  );
}

export default Cart;
