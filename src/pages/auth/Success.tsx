import { Button, Col, Image, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import columnBG from '../../assets/images/background/bg-column.png';
import successImage from '../../assets/images/background/success.gif';
import Base from '../../layouts/Base';

function Success() {
  const { t } = useTranslation();
  const navigateTo = useNavigate();

  const onClick = () => {
    navigateTo('/menu');
  };

  return (
    <Base>
      <Row
        className='min-h-screen justify-center md:justify-around menu-page '
        align='middle'
      >
        <Col xs={24} sm={22} md={18}>
          <Row
            gutter={{ xs: 0, md: 20 }}
            align='middle'
            className='menu-wrapper !bg-white'
            style={{
              backgroundImage: `url('${columnBG}')`,
            }}
          >
            <Col xs={24} className='text-center md:my-16 '>
              <Image preview={false} width={300} src={successImage} />

              <Typography.Title className='!text-aurora' level={4}>
                {t('success-order')}
              </Typography.Title>

              <Button onClick={onClick}>{t('go-to-cart')}</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Base>
  );
}

export default Success;
