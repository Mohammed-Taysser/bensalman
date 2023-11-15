import { Badge, Col, Row, Typography } from 'antd';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { FaRegUserCircle } from 'react-icons/fa';
import { PiArmchairDuotone, PiShoppingCartDuotone } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { selectAuth, selectStatus, useAppSelector } from '../hooks/useRedux';

function Navbar() {
  const statusState = useAppSelector(selectStatus);
  const authState = useAppSelector(selectAuth);

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
                  {authState.data.full_name}
                </Typography.Title>
              </Col>
            </Row>
          </a>
        </Col>

        <Col>
          <Row gutter={25} align='middle'>
            {statusState.data.current_chair && (
              <Col>
                <Link to='/chair'>
                  <Badge
                    count={statusState.data.current_chair}
                    showZero
                    color='tomato'
                  >
                    <PiArmchairDuotone />
                  </Badge>
                </Link>
              </Col>
            )}

            <Col>
              <Link to='/cart'>
                <Badge
                  count={statusState.data.cart_count}
                  showZero
                  color='tomato'
                >
                  <PiShoppingCartDuotone />
                </Badge>
              </Link>
            </Col>

            <Col>
              <Badge
                count={statusState.data.balance}
                showZero
                overflowCount={9999999}
                color='tomato'
              >
                <BiMoneyWithdraw />
              </Badge>
            </Col>
          </Row>
        </Col>
      </Row>
    </nav>
  );
}

export default Navbar;
