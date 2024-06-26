import { DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Empty,
  Popconfirm,
  Row,
  Typography,
  message,
} from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import columnBG from '../../assets/images/background/bg-column.png';
import ReReservationModal from '../../components/reservation/ReReservationModal';
import SuspenseLoading from '../../components/SuspenseLoading';
import API from '../../core/api';
import { getErrorMessage } from '../../helper';
import { useAppDispatch } from '../../hooks/useRedux';
import Base from '../../layouts/Base';
import { setUserStatus } from '../../redux/slices/status.slice';

function Reservation() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [chairs, setChairs] = useState<ChairReservation[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isReReservePopupOpen, setIsReReservePopupOpen] = useState(false);

  useEffect(() => {
    getReservationApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getReservationApi = async () => {
    setIsLoading(true);

    API.getChairReservation()
      .then((res) => {
        setChairs(res.data.data.chairs);
        dispatch(setUserStatus(res.data.data));
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

  const onDeleteBtnClick = async (chairName: string) => {
    setIsLoading(true);

    await API.reserveChair({
      chair: chairName,
      remove: 1,
      invite: 0,
    })
      .catch((error) => {
        messageApi.open({
          type: 'error',
          content: getErrorMessage(error),
        });
      })
      .finally(() => {
        setIsLoading(false);
        getReservationApi();
      });
  };

  const onReReserveBtnClick = () => {
    setIsReReservePopupOpen(true);
  };

  const onReReserveClose = () => {
    setIsReReservePopupOpen(false);
    getReservationApi();
  };

  const ReservationContent = useCallback(() => {
    if (isLoading) {
      return (
        <Col xs={24}>
          <SuspenseLoading />
        </Col>
      );
    }

    if (chairs.length > 0) {
      return chairs.map((item) => (
        <Col xs={24} md={8} key={item.chair}>
          <Card size='small'>
            <Row justify='space-between' align='middle'>
              <Col>
                <Typography.Text
                  className={item.invite === 0 ? 'my-1 block' : ''}
                >
                  {item.chair}
                </Typography.Text>
              </Col>

              <Col>
                {item.invite === 0 ? (
                  <Button
                    type='text'
                    icon={<ReloadOutlined />}
                    onClick={onReReserveBtnClick}
                  />
                ) : (
                  <Popconfirm
                    title={t(
                      'are-you-sure-you-want-to-delete-this-reservation'
                    )}
                    onConfirm={() => onDeleteBtnClick(item.chair)}
                    okText={t('yes')}
                    cancelText={t('cancel')}
                  >
                    <Button type='text' danger icon={<DeleteOutlined />} />
                  </Popconfirm>
                )}
              </Col>
            </Row>
          </Card>
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

      <ReReservationModal
        isOpen={isReReservePopupOpen}
        onClose={onReReserveClose}
        onConfirm={() => getReservationApi()}
      />

      <Row
        className='min-h-screen justify-center md:justify-around menu-page '
        align='middle'
      >
        <Col xs={22} md={18}>
          <Row
            gutter={[
              { xs: 10, md: 20 },
              { xs: 10, md: 20 },
            ]}
            align='middle'
            className='menu-wrapper'
            style={{
              backgroundImage: `url('${columnBG}')`,
            }}
          >
            <Col xs={24}>
              <Row gutter={[10, 10]}>
                <ReservationContent />
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Base>
  );
}

export default Reservation;
