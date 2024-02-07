import { Col, Empty, Image, Progress, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { getImageUrl, toArabicDigits } from '../../helper';
import { selectKitchen, useAppSelector } from '../../hooks/useRedux';

function Products() {
  const kitchenState = useAppSelector(selectKitchen);
  const { t } = useTranslation();

  if (kitchenState.data.products.length > 0) {
    return (
      <div className='products-list'>
        <Row className='!mx-0' gutter={[10, 10]} align='stretch'>
          {kitchenState.data.products.map((item) => (
            <Col xs={24} sm={12} md={8} key={item.name}>
              <div className='single-product h-full'>
                <div className='body'>
                  <Row className='w-full' gutter={[10, 10]}>
                    <Col xs={10}>
                      <div className='w-20 h-20'>
                        <Image
                          preview={false}
                          src={getImageUrl(item.image)}
                          width={80}
                        />
                      </div>
                    </Col>

                    <Col xs={14}>
                      <div>
                        <div className='title'>{item.name}</div>
                        <div className='subtitle'>
                          {item.qty === item.total ? (
                            <>
                              {item.total} {t('completed')}
                            </>
                          ) : (
                            <>
                              {toArabicDigits(item.qty)} {t('completed')}{' '}
                              {' - '} {toArabicDigits(item.total)}{' '}
                              {t('ordered')}
                            </>
                          )}
                        </div>
                        <Progress
                          percent={(item.qty / item.total) * 100}
                          showInfo={false}
                          status={item.qty !== item.total ? 'active' : 'normal'}
                          className='!m-0'
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
