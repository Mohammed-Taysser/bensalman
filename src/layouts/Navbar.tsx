import { Badge, Col, Dropdown, Row, Typography } from 'antd';
import type { ItemType } from 'antd/es/menu/hooks/useItems';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoLogOutOutline } from 'react-icons/io5';
import { PiArmchairDuotone, PiShoppingCartDuotone } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { getIcon } from '../helper';
import {
  selectAuth,
  selectStatus,
  useAppDispatch,
  useAppSelector,
} from '../hooks/useRedux';
import { logout } from '../redux/slices/auth.slice';

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

  const menuItems = useMemo(() => {
    const menu: ItemType[] = statusState.data.drop_down.map((item) => {
      const Icon = getIcon(item.path);

      return {
        key: item.id,
        icon: <Icon className='!text-lg' />,
        label: <Link to={item.path}>{item.label}</Link>,
      };
    });

    if (menu.length > 0) {
      menu.push({
        type: 'divider',
      });
    }

    menu.push({
      label: (
        <a href='#logout' onClick={onLogoutBtnClick}>
          {t('logout')}
        </a>
      ),
      key: 'logout',
      danger: true,
      icon: <IoLogOutOutline className='!text-lg' />,
    });

    return menu;
  }, [statusState]);

  return (
    <nav className='navbar'>
      <Row className='p-5 pl-10' justify='space-between' align='middle'>
        <Col>
          <Dropdown
            menu={{
              items: menuItems,
            }}
            trigger={['click']}
          >
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
                    data-test='current-chair-badge'
                    overflowCount={9999999}
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
                  data-test='cart-count-badge'
                >
                  <PiShoppingCartDuotone />
                </Badge>
              </Link>
            </Col>

            <Col>
              <Badge
                count={statusState.data.balance}
                showZero
                data-test='balance-badge'
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
