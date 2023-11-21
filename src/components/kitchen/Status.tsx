import { Col, Row } from 'antd';
import { selectKitchen, useAppSelector } from '../../hooks/useRedux';

function Status() {
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
            <div className='subtitle'>Ordered</div>
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
            <div className='subtitle'>Completed</div>
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
            <div className='subtitle'>On Tabled</div>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default Status;
