import { Col, Empty, Row, Typography, message } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { PiArmchairDuotone } from 'react-icons/pi';
import columnBG from '../../assets/images/background/bg-column.png';
import SuspenseLoading from '../../components/SuspenseLoading';
import API from '../../core/api';
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

  const onChairClick = async (id: string) => {
    setIsLoading(true);

    API.reserveChair({ chair: id })
      .then((response) => {
        setChairs(response.data.data.chairs);

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

  const Chairs = useCallback(() => {
    if (isLoading) {
      return (
        <Col xs={24}>
          <SuspenseLoading />
        </Col>
      );
    }

    if (chairs.length > 0) {
      return chairs.map((seat) => (
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
      ));
    }

    return (
      <Col xs={24}>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </Col>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, chairs]);

  return (
    <Base  >
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
            <Chairs />
          </Row>
        </Col>
      </Row>
    </Base>
  );
}

export default ChairReservation;
