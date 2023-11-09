import { Col, Image, Row } from 'antd';
import image404 from '../assets/images/background/404.svg';

function PageNotFound() {
  return (
    <div>
      <Row
        className='min-h-screen justify-center md:justify-around menu-page '
        align='middle'
      >
        <Col xs={20} md={10}>
          <Image preview={false} src={image404} />
        </Col>
      </Row>
    </div>
  );
}

export default PageNotFound;
