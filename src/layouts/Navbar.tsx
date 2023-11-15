import { Badge, Col, Dropdown, MenuProps, Row, Typography } from 'antd';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoLogOutOutline } from 'react-icons/io5';
import { MdOutlineMenuBook } from 'react-icons/md';
import { PiArmchairDuotone, PiShoppingCartDuotone } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import {
  selectAuth,
  selectStatus,
  useAppDispatch,
  useAppSelector,
} from '../hooks/useRedux';
import { logout } from '../redux/slices/auth.slice';
import { useTranslation } from 'react-i18next';

function Navbar() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const statusState = useAppSelector(selectStatus);
  const authState = useAppSelector(selectAuth);

  const onLogoutBtnClick = (
    evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    evt.preventDefault();

    dispatch(logout());
  };

  const items: MenuProps['items'] = [
    {
      label: <Link to='/menu'>Menu</Link>,
      icon: <MdOutlineMenuBook className='!text-lg' />,
      key: '0',
    },
    {
      label: <Link to='/chair'>Chairs</Link>,
      icon: <PiArmchairDuotone className='!text-lg' />,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <a href='#logout' onClick={onLogoutBtnClick}>
          {t('logout')}
        </a>
      ),
      key: '3',
      danger: true,
      icon: <IoLogOutOutline className='!text-lg' />,
    },
  ];

  return (
    <nav className='navbar'>
      <Row className='p-5 pl-10' justify='space-between' align='middle'>
        <Col>
          <Dropdown menu={{ items }} trigger={['click']}>
            <Row gutter={10} align='middle' className='cursor-pointer'>
              <Col>
                <FaRegUserCircle />
              </Col>
              <Col>
                <Typography.Title className='m-0 !text-aurora' level={5}>
                  {authState.data.full_name}
                </Typography.Title>
              </Col>
            </Row>
          </Dropdown>
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
