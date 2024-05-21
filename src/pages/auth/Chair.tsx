import { Col, Empty, Row, message } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import columnBG from '../../assets/images/background/bg-column.png';
import ChairCard from '../../components/reservation/ChairCard';
import SuspenseLoading from '../../components/SuspenseLoading';
import API from '../../core/api';
import { getErrorMessage } from '../../helper';
import {
  selectStatus,
  useAppDispatch,
  useAppSelector,
} from '../../hooks/useRedux';
import Base from '../../layouts/Base';
import { setAuthRoutes } from '../../redux/slices/auth.slice';
import { setUserStatus } from '../../redux/slices/status.slice';

function ChairReservation() {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const statusState = useAppSelector(selectStatus);

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

    API.reserveChair({
      chair: id,
      invite: statusState.data.current_chair ? 1 : 0,
    })
      .then((response) => {
        setChairs(response.data.data.chairs);
        dispatch(setAuthRoutes(response.data.data.routing));

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
          <ChairCard seat={seat} onChairClick={onChairClick} />
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
    <Base>
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
            data-test='chair-wrapper'
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
