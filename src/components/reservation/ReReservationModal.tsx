import {
  Button,
  Col,
  Empty,
  message,
  Modal,
  Row,
  Space,
  Typography,
} from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import API from '../../core/api';
import { getErrorMessage } from '../../helper';
import { useAppDispatch } from '../../hooks/useRedux';
import { setAuthRoutes } from '../../redux/slices/auth.slice';
import { setUserStatus } from '../../redux/slices/status.slice';
import SuspenseLoading from '../SuspenseLoading';
import ChairCard from './ChairCard';

function ReReservationModal(props: Readonly<ReReservationModalProps>) {
  const { isOpen, onClose } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [messageApi, contextHolder] = message.useMessage();

  const [isLoading, setIsLoading] = useState(true);
  const [chairs, setChairs] = useState<Chair[]>([]);

  useEffect(() => {
    if (isOpen) {
      getChairs();
    } else {
      setChairs([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const getChairs = async () => {
    setIsLoading(true);

    await API.getChairs()
      .then((response) => {
        setChairs(response.data.data.chairs);
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
      invite: 0,
    })
      .then((response) => {
        setChairs(response.data.data.chairs);
        dispatch(setAuthRoutes(response.data.data.routing));

        dispatch(setUserStatus(response.data.data));

        onClose();
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
      return (
        <Row
          className='my-10'
          gutter={[{ xs: 25, md: 30 }, 15]}
          align='middle'
          justify='center'
        >
          {chairs.map((seat) => (
            <Col xs={12} md={6} key={seat.name}>
              <ChairCard seat={seat} onChairClick={onChairClick} />
            </Col>
          ))}
        </Row>
      );
    }

    return (
      <Col xs={24}>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </Col>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, chairs]);

  return (
    <Modal
      destroyOnClose={true}
      title=''
      open={isOpen}
      className='md:!w-[70vw]'
      onCancel={onClose}
      centered
      footer={[]}
    >
      {contextHolder}
      <Typography.Title level={3}>{t('change-chair')}</Typography.Title>

      <Chairs />

      <Space>
        <Button onClick={onClose}>{t('cancel')}</Button>
      </Space>
    </Modal>
  );
}

export default ReReservationModal;
