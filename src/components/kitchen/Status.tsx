import { Col, Row } from 'antd';

function Status() {
  return (
    <Row className='justify-center md:justify-between' gutter={[5, 10]}>
      <Col xs={24}>
        <div className='single-card-status card-1'>
          <div className='body'>
            <div className='title-wrapper'>
              <div className='title'>45</div>
              <div className='total-count'>/ 50</div>
            </div>
            <div className='subtitle'>Ordered</div>
          </div>
        </div>
      </Col>

      <Col xs={24}>
        <div className='single-card-status card-2'>
          <div className='body'>
            <div className='title-wrapper'>
              <div className='title'>32</div>
              <div className='total-count'>/ 50</div>
            </div>
            <div className='subtitle'>Completed</div>
          </div>
        </div>
      </Col>

      <Col xs={24}>
        <div className='single-card-status card-3'>
          <div className='body'>
            <div className='title-wrapper'>
              <div className='title'>12</div>
              <div className='total-count'>/ 50</div>
            </div>
            <div className='subtitle'>On Tabled</div>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default Status;
