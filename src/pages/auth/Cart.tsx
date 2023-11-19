import {
  Button,
  Col,
  Empty,
  Row,
  Space,
  Statistic,
  Steps,
  message,
} from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { MdOutlineMenuBook, MdOutlineSoupKitchen } from 'react-icons/md';
import { PiArmchairDuotone, PiShoppingCartDuotone } from 'react-icons/pi';
import { TbToolsKitchen2 } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import columnBG from '../../assets/images/background/bg-column.png';
import SuspenseLoading from '../../components/SuspenseLoading';
import CartItem from '../../components/cart/CartItem';
import { API } from '../../core/api';
import { getErrorMessage } from '../../helper';
import { useAppDispatch } from '../../hooks/useRedux';
import Base from '../../layouts/Base';
import { setUserStatus } from '../../redux/slices/status.slice';

function Cart() {
  const { t } = useTranslation();
  const navigateTo = useNavigate();
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [extraInfo, setExtraInfo] = useState<CartExtraInfo>({
    status: 'Ordered',
    total_amount: 0,
    total_items: 0,
  });

  useEffect(() => {
    fetchNeededData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchNeededData = async () => {
    setIsLoading(true);

    API.getCartItems()
      .then((response) => {
        setProducts(response.data.data.items);

        setExtraInfo({
          status: response.data.data.status,
          total_amount: response.data.data.total_amount,
          total_items: response.data.data.total_items,
        });

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

  const Products = useCallback(() => {
    if (isLoading) {
      return (
        <Col xs={24}>
          <SuspenseLoading />
        </Col>
      );
    }

    if (products.length > 0) {
      return products.map((product) => (
        <Col xs={24} md={12} key={product.item_name}>
          <CartItem product={product} setExtraInfo={setExtraInfo} />
        </Col>
      ));
    }

    return (
      <Col xs={24}>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </Col>
    );
  }, [isLoading, products]);

  const orderStatusIndex = useMemo(() => {
    switch (extraInfo.status) {
      case 'Ordered':
        return 0;
      case 'Prepare':
        return 1;
      case 'Completed':
        return 2;
      case 'On Table':
        return 3;
      default:
        return 0;
    }
  }, [extraInfo.status]);

  return (
    <Base>
      {contextHolder}
      <Row
        className='min-h-screen justify-center md:justify-around menu-page '
        align='middle'
      >
        <Col xs={22} md={18}>
          <Row
            gutter={{ xs: 0, md: 20 }}
            align='middle'
            className='menu-wrapper'
            style={{
              backgroundImage: `url('${columnBG}')`,
            }}
          >
            <Col className='mb-8' xs={24}>
              <Steps
                current={orderStatusIndex}
                items={[
                  {
                    title: t('ordered'),
                    icon: <PiShoppingCartDuotone />,
                  },
                  {
                    title: t('preparing'),
                    icon: <MdOutlineSoupKitchen />,
                  },
                  {
                    title: t('completed'),
                    icon: <PiArmchairDuotone />,
                  },
                  {
                    title: t('on-table'),
                    icon: <TbToolsKitchen2 />,
                  },
                ]}
              />
            </Col>

            <Products />

            <Col xs={24} className='mt-5'>
              <Space>
                <Button size='large' type='primary'>
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
                    value={extraInfo.total_amount}
                    prefix={<BiMoneyWithdraw />}
                  />
                </Col>

                <Col xs={12} md={6}>
                  <Statistic
                    title={t('total-products')}
                    value={extraInfo.total_items}
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
