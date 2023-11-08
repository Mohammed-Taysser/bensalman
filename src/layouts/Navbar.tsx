import { Badge, Col, Row, Typography } from 'antd';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { FaRegUserCircle } from 'react-icons/fa';
import { PiArmchairDuotone, PiShoppingCartDuotone } from 'react-icons/pi';

function Navbar() {
  return (
    <nav className='navbar'>
      <Row className='p-5 pr-10' justify='space-between' align='middle'>
        <Col>
          <a href='#'>
            <Row gutter={10} align='middle'>
              <Col>
                <FaRegUserCircle />
              </Col>
              <Col>
                <Typography.Title className='m-0 !text-aurora' level={5}>
                  Mohammed
                </Typography.Title>
              </Col>
            </Row>
          </a>
        </Col>

        <Col>
          <Row gutter={25} align='middle'>
            {/* hide seat on empty */}
            <Col>
              <a href='#'>
                <Badge count={'SE-89'} color='tomato'>
                  <PiArmchairDuotone />
                </Badge>
              </a>
            </Col>

            <Col>
              <a href='#'>
                <Badge count={5} color='tomato'>
                  <PiShoppingCartDuotone />
                </Badge>
              </a>
            </Col>

            <Col>
              <a href='#'>
                <Badge count={412} overflowCount={9999999} color='tomato'>
                  <BiMoneyWithdraw />
                </Badge>
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
    </nav>
  );
}

export default Navbar;
