import { Col, Row, Typography, message } from 'antd';
import { useEffect, useState } from 'react';
import { PiArmchairDuotone } from 'react-icons/pi';
import columnBG from '../../assets/images/background/bg-column.png';
import welcomeBG from '../../assets/images/background/welcome.jpeg';
import SuspenseLoading from '../../components/SuspenseLoading';
import { API } from '../../core/api';
import Base from '../../layouts/Base';

function ChairReservation() {
  const [messageApi, contextHolder] = message.useMessage();

  const [isLoading, setIsLoading] = useState(true);
  const [chairs, setChairs] = useState<Chair[]>([]);

  useEffect(() => {
    getChairs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getChairs = async () => {
    setIsLoading(true);

    API.getAllChairs()
      .then((response) => {
        setChairs(response.data.data);
      })
      .catch((error) => {
        messageApi.open({
          type: 'error',
          content: error.response?.data?.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Base bg={welcomeBG}>
      {contextHolder}

      <Row
        className='min-h-screen justify-center md:justify-around menu-page '
        align='middle'
      >
        <Col xs={22} md={18}>
          {isLoading ? (
            <SuspenseLoading />
          ) : (
            <Row
              gutter={[{ xs: 25, md: 30 }, 15]}
              align='middle'
              justify='center'
              className='menu-wrapper'
              style={{
                backgroundImage: `url('${columnBG}')`,
              }}
            >
              {chairs.map((seat) => (
                <Col xs={12} md={6} key={seat.id}>
                  <Row
                    gutter={{ xs: 10, md: 20 }}
                    className='px-3 py-5 md:py-8 md:px-5 rounded border border-gray-500 border-solid cursor-pointer'
                    justify='space-between'
                  >
                    <Col xs={24}>
                      <Row justify='space-between'>
                        <Col>
                          <PiArmchairDuotone className='text-aurora text-4xl' />
                        </Col>

                        <Col>
                          <Typography.Title className='!my-0' level={4}>
                            {seat.number}
                          </Typography.Title>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Base>
  );
}

export default ChairReservation;
