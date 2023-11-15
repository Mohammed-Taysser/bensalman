import { Button, Col, Row, Space, Statistic, Steps } from 'antd';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { MdOutlineMenuBook, MdOutlineSoupKitchen } from 'react-icons/md';
import { PiArmchairDuotone, PiShoppingCartDuotone } from 'react-icons/pi';
import { TbToolsKitchen2 } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import CartItem from '../../components/cart/CartItem';
import Base from '../../layouts/Base';
import columnBG from '../../assets/images/background/bg-column.png';
import welcomeBG from '../../assets/images/background/welcome.jpeg';

const PRODUCTS = [
  {
    name: 'Cup - Paper 10oz 92959',
    standard_rate: 53.5,
    item_name: 'Pepper - Green, Chili',
    description:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    item_group: 'Structural and Misc Steel (Fabrication)',
    image: 'http://dummyimage.com/148x100.png/dddddd/000000',
    cart_qty: 1,
  },
  {
    name: 'Miso - Soy Bean Paste',
    standard_rate: 28.9,
    item_name: 'Beer - Creemore',
    description:
      'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
    item_group: 'Curb & Gutter',
    image: 'http://dummyimage.com/128x100.png/ff4444/ffffff',
    cart_qty: 1,
  },
  {
    name: 'Wine - Soave Folonari',
    standard_rate: 95.6,
    item_name: 'Artichokes - Jerusalem',
    description:
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
    item_group: 'RF Shielding',
    image: 'http://dummyimage.com/151x100.png/cc0000/ffffff',
    cart_qty: 2,
  },
  {
    name: 'Oranges - Navel, 72',
    standard_rate: 5.0,
    item_name: 'Sobe - Cranberry Grapefruit',
    description:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    item_group: 'Curb & Gutter',
    image: 'http://dummyimage.com/134x100.png/5fa2dd/ffffff',
    cart_qty: 1,
  },
  {
    name: 'Sausage - Meat',
    standard_rate: 75.4,
    item_name: 'Beans - Kidney, Canned',
    description:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
    item_group: 'Fire Protection',
    image: 'http://dummyimage.com/123x100.png/ff4444/ffffff',
    cart_qty: 2,
  },
  {
    name: 'Garlic Powder',
    standard_rate: 13.0,
    item_name: 'Orange - Canned, Mandarin',
    description:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    item_group: 'Granite Surfaces',
    image: 'http://dummyimage.com/113x100.png/ff4444/ffffff',
    cart_qty: 0,
  },
  {
    name: 'Filling - Mince Meat',
    standard_rate: 68.1,
    item_name: 'Wine - Tribal Sauvignon',
    description:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
    item_group: 'RF Shielding',
    image: 'http://dummyimage.com/103x100.png/cc0000/ffffff',
    cart_qty: 0,
  },
];

function Cart() {
  const navigateTo = useNavigate();

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
              <Col xs={24} md={12} key={product.name}>
                <CartItem product={product} />
              </Col>
            ))}

            <Col xs={24} className='mt-5'>
              <Space>
                <Button size='large' type='primary'>
                  Checkout
                </Button>
                <Button
                  size='large'
                  onClick={() => navigateTo('/menu')}
                  icon={
                    <MdOutlineMenuBook className='text-xl relative top-1 ' />
                  }
                >
                  Continue Shopping
                </Button>
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

export default Cart;
