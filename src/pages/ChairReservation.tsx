import { Col, Row, Typography } from 'antd';
import { PiArmchairDuotone } from 'react-icons/pi';
import columnBG from '../assets/images/background/bg-column.png';
import welcomeBG from '../assets/images/background/welcome.jpeg';
import Base from '../layouts/Base';

const SEATS = [
  {
    id: '05c88a37-d8e6-46dd-859c-100aff2d4bf9',
    number: 95425,
    code: 'NO',
  },
  {
    id: '8b8b096a-bafc-451a-90b0-eba9d7550f0c',
    number: 93,
    code: 'AU',
  },

  {
    id: 'a1a106c6-bfaa-4872-aca1-af2002b3f5ab',
    number: 29,
    code: 'BE',
  },
  {
    id: '59893705-3b24-485f-8c2d-dc5851d7765d',
    number: 21,
    code: 'PG',
  },
  {
    id: '78541794-bdca-4223-8847-0ff6a5873a34',
    number: 45,
    code: 'AU',
  },
  {
    id: 'dffb1a73-10f7-436a-aa7a-7e83019875e5',
    number: 21,
    code: 'GR',
  },
  {
    id: '18facb99-877c-474a-816c-e7b7425abe86',
    number: 36,
    code: 'BR',
  },
  {
    id: '226efe63-5f5d-4758-aaa2-034cf3cd6e2f',
    number: 94,
    code: 'ES',
  },
  {
    id: '075d190a-81f8-4873-b58c-676d786c1b8e',
    number: 14,
    code: 'PG',
  },
  {
    id: '678cdf14-4385-42d7-aa5c-2252bdef8bb1',
    number: 93,
    code: 'AU',
  },
  {
    id: 'dd72c0dd-4ecd-4f8c-8aaf-10539a3f959c',
    number: 96,
    code: 'US',
  },
  {
    id: 'f92e1b52-ce17-4904-b788-2f2dc5027aea',
    number: 98,
    code: 'HU',
  },
  {
    id: 'fa421ceb-2738-4d27-981b-003c460cd1cd',
    number: 53,
    code: 'CA',
  },
  {
    id: '0e60e248-e309-4cd8-9a33-f9caa9f7f58c',
    number: 38,
    code: 'US',
  },
  {
    id: '9414bbe4-c874-41d4-8424-e07699c58cb5',
    number: 62,
    code: 'TW',
  },
  {
    id: 'd944019c-ecde-432e-bb49-550851638994',
    number: 15,
    code: 'TR',
  },
  {
    id: 'f9e8345b-ced2-4a37-8f98-d67301efd7d3',
    number: 29,
    code: 'CA',
  },
  {
    id: '4cc86822-16df-449c-9674-65885fa0b69e',
    number: 60,
    code: 'UY',
  },
];

function ChairReservation() {
  return (
    <Base bg={welcomeBG}>
      <Row
        className='min-h-screen justify-center md:justify-around menu-page '
        align='middle'
      >
        <Col xs={22} md={18}>
          <Row
            gutter={[{ xs: 25, md: 30 }, 15]}
            align='middle'
            justify='center'
            className='menu-wrapper'
            style={{
              backgroundImage: `url('${columnBG}')`,
            }}
          >
            {SEATS.map((seat) => (
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

                  {/* <Col>
                    <Space align='center'>
                      <PiBuildingsDuotone className='text-aurora text-3xl' />
                      <Typography.Title className='!my-0' level={4}>
                        {seat.code}
                      </Typography.Title>
                    </Space>
                  </Col> */}
                </Row>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Base>
  );
}

export default ChairReservation;
