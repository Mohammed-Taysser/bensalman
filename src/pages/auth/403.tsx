import { Col, Image, Row, Typography } from 'antd';
import image403 from '../../assets/images/background/403.svg';
import columnBG from '../../assets/images/background/bg-column.png';
import welcomeBG from '../../assets/images/background/welcome.jpeg';
import Base from '../../layouts/Base';

function NotAuthorized() {
  return (
    <Base bg={welcomeBG}>
      <Row
        className='min-h-screen justify-center md:justify-around menu-page '
        align='middle'
      >
        <Col xs={22} md={18}>
          <Row
            gutter={{ xs: 0, md: 20 }}
            align='middle'
            className='menu-wrapper'
            style={{
              backgroundImage: `url('${columnBG}')`,
            }}
          >
            <Col xs={24} className='text-center my-16 '>
              <Image preview={false} src={image403} width={300} />
              <Typography.Title className='!text-aurora' level={3}>
                You't Authorized To See This Page
              </Typography.Title>
            </Col>
          </Row>
        </Col>
      </Row>
    </Base>
  );
}

export default NotAuthorized;
