import { Col, Image, Progress, Row } from 'antd';

function Products() {
  return (
    <div className='products-list'>
      <Row className='!mx-0' gutter={[10, 10]}>
        {Array.from({ length: 30 }).map((_item, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <div className='single-product'>
              <div className='body'>
                <Row className='w-full' gutter={[10, 10]}>
                  <Col>
                    <div className='bg-white rounded-full'>
                      <Image
                        preview={false}
                        src='https://fooddesk.dexignlab.com/react/demo/static/media/pic-1.0a21631e6947499af364.jpg'
                        width={80}
                      />
                    </div>
                  </Col>

                  <Col flex='auto'>
                    <div>
                      <div className='title'>PRODUCT-{index}</div>
                      <div className='subtitle'>21</div>
                      <Progress percent={70} showInfo={false} status='active' />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Products;
