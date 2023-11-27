import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { selectKitchen, useAppSelector } from '../../hooks/useRedux';

function Status() {
  const { t } = useTranslation();
  const kitchenState = useAppSelector(selectKitchen);

  return (
    <Row className='justify-center md:justify-between' gutter={[5, 10]}>
      <Col xs={24}>
        <div className='single-card-status card-1'>
          <div className='body'>
            <div className='title-wrapper'>
              <div className='title'>{kitchenState.data.status.ordered}</div>
              <div className='total-count'>
                / {kitchenState.data.status.total}
              </div>
            </div>
            <div className='subtitle'>{t('ordered')}</div>
          </div>
        </div>
      </Col>

      <Col xs={24}>
        <div className='single-card-status card-4'>
          <div className='body'>
            <div className='title-wrapper'>
              <div className='title'>{kitchenState.data.status.Prepare}</div>
              <div className='total-count'>
                / {kitchenState.data.status.total}
              </div>
            </div>
            <div className='subtitle'>{t('preparing')}</div>
          </div>
        </div>
      </Col>

      <Col xs={24}>
        <div className='single-card-status card-2'>
          <div className='body'>
            <div className='title-wrapper'>
              <div className='title'>{kitchenState.data.status.completed}</div>
              <div className='total-count'>
                / {kitchenState.data.status.total}
              </div>
            </div>
            <div className='subtitle'>{t('completed')}</div>
          </div>
        </div>
      </Col>

      <Col xs={24}>
        <div className='single-card-status card-3'>
          <div className='body'>
            <div className='title-wrapper'>
              <div className='title'>{kitchenState.data.status.onTable}</div>
              <div className='total-count'>
                / {kitchenState.data.status.total}
              </div>
            </div>
            <div className='subtitle'>{t('on-tabled')}</div>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default Status;
