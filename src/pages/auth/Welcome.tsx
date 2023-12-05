import { Col, Image, Row, Spin, Typography, message } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import chief from '../../assets/images/icons/chief.png';
import bottomLines from '../../assets/images/icons/welcome/welcome-lines-bottom.png';
import topLines from '../../assets/images/icons/welcome/welcome-lines-top.png';
import SuspenseLoading from '../../components/SuspenseLoading';
import API from '../../core/api';
import { getErrorMessage } from '../../helper';
import {
  selectStatus,
  useAppDispatch,
  useAppSelector,
} from '../../hooks/useRedux';
import Base from '../../layouts/Base';
import { welcome } from '../../redux/slices/status.slice';

function Welcome() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const statusState = useAppSelector(selectStatus);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    API.chooseTakeaway()
      .then((response) => {
        console.log(response);
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
    <Base>
      {contextHolder}
      <Row
        className='min-h-screen justify-center md:justify-around'
        align='middle'
      >
        <Col md={10}>
          <div className='text-center'>
            <Image src={topLines} preview={false} className='mb-5 md:hidden' />
            {statusState.status === 'loading' ? (
              <SuspenseLoading />
            ) : (
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
                        <Spin spinning={isLoading}>
                          <span className='ribbon' onClick={onTakeawayBtnClick}>
                            {item.label}
                          </span>
                        </Spin>
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
            )}
            <Image
              src={bottomLines}
              preview={false}
              className='mt-5 md:hidden'
            />
          </div>
        </Col>

        <Col xs={20} md={10} className='hidden md:block'>
          <div className='text-center'>
            <Image src={topLines} preview={false} className='mb-5' />

            <Typography.Title className='!text-aurora'>
              {t('welcome-to-bs-restaurant')}
            </Typography.Title>

            <div>
              <Image src={chief} preview={false} width={250} />
            </div>

            <Image src={bottomLines} preview={false} className='mt-5' />

            <Typography.Title level={5} className='!font-normal'>
              {t(
                'welcome-to-bs-restaurant-offering-traditional-dishes-of-the-highest-quality'
              )}
            </Typography.Title>
          </div>
        </Col>
      </Row>
    </Base>
  );
}

export default Welcome;
