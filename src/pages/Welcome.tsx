import { Col, Image, Row, Typography } from 'antd';
import welcomeBG from '../assets/images/background/welcome.jpeg';
import chief from '../assets/images/icons/chief.png';
import bottomLines from '../assets/images/icons/welcome/welcome-lines-bottom.png';
import topLines from '../assets/images/icons/welcome/welcome-lines-top.png';
import Base from '../layouts/Base';

const CATEGORY = [
  {
    label: 'Margherita',
    url: '/',
  },
  {
    label: 'Simply Cheese',
    url: '/',
  },
  {
    label: 'Project details',
    url: '/',
  },
  {
    label: 'QUATTRO FORMAGGI',
    url: '/',
  },
];

function Welcome() {
  return (
    <Base bg={welcomeBG}>
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
              {CATEGORY.map((item) => (
                <Col key={item.label} xs={20} md={12}>
                  <a href='#' className='ribbon'>
                    {item.label}
                  </a>
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
