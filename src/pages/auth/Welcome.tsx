import { Col, Row, Spin, message } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SuspenseLoading from '../../components/SuspenseLoading';
import API from '../../core/api';
import { getErrorMessage } from '../../helper';
import {
  selectStatus,
  useAppDispatch,
  useAppSelector,
} from '../../hooks/useRedux';
import Base from '../../layouts/Base';
import { setUserStatus, welcome } from '../../redux/slices/status.slice';

function Welcome() {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const statusState = useAppSelector(selectStatus);
  const [isTakeawayLoading, setIsTakeawayLoading] = useState(false);

  useEffect(() => {
    getWelcomeStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (statusState.error) {
      messageApi.open({
        type: 'error',
        content: statusState.error,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusState.error]);

  const getWelcomeStatus = () => {
    dispatch(welcome());
  };

  const onTakeawayBtnClick = () => {
    setIsTakeawayLoading(true);

    API.reserveChair({
      chair: 'takeaway',
    })
      .then((response) => {
        dispatch(setUserStatus(response.data.data));
      })
      .catch((error) => {
        messageApi.open({
          type: 'error',
          content: getErrorMessage(error),
        });
      })
      .finally(() => {
        setIsTakeawayLoading(false);
      });
  };

  return (
    <Base bg=''>
      {contextHolder}
      <Row
        className='min-h-screen justify-center md:justify-around'
        align='middle'
      >
        <Col md={10}>
          <div className='text-center'>
            {statusState.status === 'loading' ? (
              <SuspenseLoading />
            ) : (
              <Spin spinning={isTakeawayLoading}>
                <Row
                  align='middle'
                  justify='center'
                  gutter={[
                    { xs: 0, md: 100 },
                    { xs: 20, sm: 50, md: 50 },
                  ]}
                >
                  {statusState.data.home_routing.map((item) => {
                    if (item.path === '/takeaway') {
                      return (
                        <Col key={item.id} xs={20} md={12}>
                          <span
                            className='ribbon cursor-pointer'
                            onClick={onTakeawayBtnClick}
                          >
                            {item.label}
                          </span>
                        </Col>
                      );
                    }

                    return (
                      <Col key={item.id} xs={20} md={12}>
                        <Link to={item.path} className='ribbon'>
                          {item.label}
                        </Link>
                      </Col>
                    );
                  })}
                </Row>
              </Spin>
            )}
          </div>
        </Col>
      </Row>
    </Base>
  );
}

export default Welcome;
