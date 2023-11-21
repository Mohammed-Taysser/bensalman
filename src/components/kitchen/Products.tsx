import { Col, Empty, Image, Progress, Row } from 'antd';
import { selectKitchen, useAppSelector } from '../../hooks/useRedux';

function Products() {
  const kitchenState = useAppSelector(selectKitchen);

  if (kitchenState.data.products.length > 0) {
    return (
      <div className='products-list'>
        <Row className='!mx-0' gutter={[10, 10]}>
          {kitchenState.data.products.map((item) => (
            <Col xs={24} sm={12} md={8} key={item.name}>
              <div className='single-product'>
                <div className='body'>
                  <Row className='w-full' gutter={[10, 10]}>
                    <Col>
                      <div className='bg-white rounded-full'>
                        <Image preview={false} src={item.image} width={80} />
                      </div>
                    </Col>

                    <Col flex='auto'>
                      <div>
                        <div className='title'>{item.name}</div>
                        <div className='subtitle'>{item.qty}</div>
                        <Progress
                          percent={(item.qty / item.total / 100) * 100}
                          showInfo={false}
                          status='active'
                        />
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

  return (
    <div className='h-full flex justify-center items-center rounded border border-solid border-[#f0f0f0]'>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    </div>
  );
}

export default Products;
