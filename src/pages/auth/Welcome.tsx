import { Col, Image, Row, Typography, message } from 'antd';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import welcomeBG from '../../assets/images/background/welcome.jpeg';
import chief from '../../assets/images/icons/chief.png';
import bottomLines from '../../assets/images/icons/welcome/welcome-lines-bottom.png';
import topLines from '../../assets/images/icons/welcome/welcome-lines-top.png';
import {
  selectStatus,
  useAppDispatch,
  useAppSelector,
} from '../../hooks/useRedux';
import Base from '../../layouts/Base';
import { welcome } from '../../redux/slices/status.slice';

function Welcome() {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const statusState = useAppSelector(selectStatus);

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

  return (
    <Base bg={welcomeBG}>
      {contextHolder}
      <Row
        className='min-h-screen justify-center md:justify-around'
        align='middle'
      >
        <Col md={10}>
          <div className='text-center'>
            <Image src={topLines} preview={false} className='mb-10 md:hidden' />
            <Row
              align='middle'
              justify='center'
              gutter={[
                { xs: 0, md: 100 },
                { xs: 50, sm: 50, md: 50 },
              ]}
            >
              {statusState.data.home_routing.map((item) => (
                <Col key={item.id} xs={20} md={12}>
                  <Link to={item.path} className='ribbon'>
                    {item.label}
                  </Link>
                </Col>
              ))}
            </Row>
            <Image
              src={bottomLines}
              preview={false}
              className='mt-10 md:hidden'
            />
          </div>
        </Col>

        <Col xs={20} md={10} className='hidden md:block'>
          <div className='text-center'>
            <Image src={topLines} preview={false} className='mb-5' />

            <Typography.Title className='dancing-font !text-aurora'>
              Welcome To BS Restaurant
            </Typography.Title>

            <div>
              <Image src={chief} preview={false} width={250} />
            </div>

            <Image src={bottomLines} preview={false} className='mt-5' />

            <Typography.Title level={5} className='!font-normal'>
              Welcome to Risotto Restaurant. Since 1988, Offering Traditional
              Dishes of the highest quality.
            </Typography.Title>
          </div>
        </Col>
      </Row>
    </Base>
  );
}

export default Welcome;