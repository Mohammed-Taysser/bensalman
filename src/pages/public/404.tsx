import { Button, Col, Image, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import image404 from '../../assets/images/background/404.svg';
import columnBG from '../../assets/images/background/bg-column.png';
import Base from '../../layouts/Base';

function PageNotFound() {
  const { t } = useTranslation();
  const navigateTo = useNavigate();

  const onClick = () => {
    navigateTo('/');
  };

  return (
    <Base noNavbar>
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
              <Image preview={false} src={image404} width={300} />

              <Typography.Title className='!text-aurora' level={4}>
                {t(
                  'sorry-the-page-youre-looking-for-not-exist-or-might-be-delete'
                )}
              </Typography.Title>

              <Button onClick={onClick}>{t('take-me-home')}</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Base>
  );
}

export default PageNotFound;
