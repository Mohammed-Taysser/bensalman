import { Button, Col, Row, Space, Statistic, Steps } from 'antd';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { MdOutlineSoupKitchen } from 'react-icons/md';
import { PiArmchairDuotone, PiShoppingCartDuotone } from 'react-icons/pi';
import { TbToolsKitchen2 } from 'react-icons/tb';
import columnBG from '../assets/images/background/bg-column.png';
import welcomeBG from '../assets/images/background/welcome.jpeg';
import CartItem from '../components/cart/CartItem';
import Base from '../layouts/Base';

const PRODUCTS = [
  {
    title: 'Pepper - Black, Ground',
    price: 80.15,
    id: '14794b15-b81f-4ea9-8a94-2db3f20e516e',
    qty: 1,
    image: 'http://dummyimage.com/186x100.png/dddddd/000000',
  },
  {
    title: 'Sausage - Meat',
    price: 38.25,
    id: '822d9f19-a68f-42b8-87d1-613f3cbe348f',
    qty: 7,
    image: 'http://dummyimage.com/150x100.png/dddddd/000000',
  },
  {
    title: 'Tomatoes - Grape',
    price: 30.71,
    id: 'dbfddae8-77d0-4f72-9390-bff9d5d4abbb',
    qty: 2,
    image: 'http://dummyimage.com/181x100.png/5fa2dd/ffffff',
  },
  {
    title: 'Chicken Thigh - Bone Out',
    price: 83.59,
    id: 'ce4437be-e2fb-468a-ad37-273685f29903',
    qty: 8,
    image: 'http://dummyimage.com/154x100.png/ff4444/ffffff',
  },
  {
    title: 'Squash - Butternut',
    price: 32.78,
    id: '52006cda-cc87-44e3-9f72-f20bafb8cbe7',
    qty: 9,
    image: 'http://dummyimage.com/199x100.png/cc0000/ffffff',
  },
];

function Menu() {
  return (
    <Base bg={welcomeBG}>
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
                items={[
                  {
                    status: 'finish',
                    title: 'Ordered',
                    icon: <PiShoppingCartDuotone />,
                  },
                  {
                    title: 'Preparing',
                    status: 'process',
                    icon: <MdOutlineSoupKitchen />,
                  },
                  {
                    title: 'Completed',
                    status: 'wait',
                    icon: <PiArmchairDuotone />,
                  },
                  {
                    title: 'On Table',
                    status: 'wait',
                    icon: <TbToolsKitchen2 />,
                  },
                ]}
              />
            </Col>

            {PRODUCTS.map((product) => (
              <Col xs={24} md={12} key={product.id}>
                <CartItem product={product} />
              </Col>
            ))}

            <Col xs={24} className='mt-5'>
              <Space>
                <Button type='primary'>Checkout</Button>
                <Button disabled>Cancel</Button>
              </Space>
            </Col>

            <Col xs={24} className='mt-8'>
              <Row gutter={16}>
                <Col xs={12} md={6}>
                  <Statistic
                    title='Total Price'
                    value={1128}
                    prefix={<BiMoneyWithdraw />}
                  />
                </Col>

                <Col xs={12} md={6}>
                  <Statistic
                    title='Total Products'
                    value={18}
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

export default Menu;
