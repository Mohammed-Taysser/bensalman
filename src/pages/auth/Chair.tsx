import { Col, Row, Typography, message } from 'antd';
import { useEffect, useState } from 'react';
import { PiArmchairDuotone } from 'react-icons/pi';
import columnBG from '../../assets/images/background/bg-column.png';
import welcomeBG from '../../assets/images/background/welcome.jpeg';
import SuspenseLoading from '../../components/SuspenseLoading';
import { API } from '../../core/api';
import { getErrorMessage } from '../../helper';
import { useAppDispatch } from '../../hooks/useRedux';
import Base from '../../layouts/Base';
import { setUserStatus } from '../../redux/slices/status.slice';

function ChairReservation() {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const [isLoading, setIsLoading] = useState(true);
  const [chairs, setChairs] = useState<Chair[]>([]);

  useEffect(() => {
    getChairs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getChairs = async () => {
    setIsLoading(true);

    API.getChairs()
      .then((response) => {
        setChairs(response.data.data.chairs);

        const payload: UserStatus = {
          balance: response.data.data.balance,
          current_chair: response.data.data.current_chair,
          home_routing: response.data.data.home_routing,
          current_cart: response.data.data.current_cart,
          cart_count: response.data.data.cart_count,
        };

        dispatch(setUserStatus(payload));
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

  const onChairClick = async (id: string) => {
    setIsLoading(true);

    API.reserveChair({ chair: id })
      .then((response) => {
        const payload: UserStatus = {
          balance: response.data.data.balance,
          current_chair: response.data.data.current_chair,
          home_routing: response.data.data.home_routing,
          current_cart: response.data.data.current_cart,
          cart_count: response.data.data.cart_count,
        };

        setChairs(response.data.data.chairs);

        dispatch(setUserStatus(payload));
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

  return (
    <Base bg={welcomeBG}>
      {contextHolder}

      <Row
        className='min-h-screen justify-center md:justify-around menu-page '
        align='middle'
      >
        <Col xs={22} md={18}>
          <Row
            gutter={[{ xs: 25, md: 30 }, 15]}
            align='middle'
            justify='center'
            className='menu-wrapper'
            style={{
              backgroundImage: `url('${columnBG}')`,
            }}
          >
            {isLoading ? (
              <Col xs={24}>
                <SuspenseLoading />
              </Col>
            ) : (
              chairs.map((seat) => (
                <Col xs={12} md={6} key={seat.name}>
                  <Row
                    gutter={{ xs: 10, md: 20 }}
                    className='px-3 py-5 md:py-8 md:px-5 rounded border border-gray-500 border-solid cursor-pointer'
                    justify='space-between'
                    onClick={() => onChairClick(seat.name)}
                  >
                    <Col xs={24}>
                      <Row justify='space-between'>
                        <Col>
                          <PiArmchairDuotone className='text-aurora text-4xl' />
                        </Col>

                        <Col>
                          <Typography.Title className='!my-0' level={4}>
                            {seat.code}
                          </Typography.Title>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              ))
            )}
          </Row>
        </Col>
      </Row>
    </Base>
  );
}

export default ChairReservation;
