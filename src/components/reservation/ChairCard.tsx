import { Col, Row, Typography } from 'antd';
import { PiArmchairDuotone } from 'react-icons/pi';


function ChairCard(props: Readonly<ChairCardProps>) {
  const { seat, onChairClick } = props;

  return (
    <Row
      gutter={{ xs: 10, md: 20 }}
      className='px-3 py-5 md:py-8 md:px-5 rounded border border-gray-500 border-solid cursor-pointer'
      justify='space-between'
      data-test='single-chair'
      onClick={onChairClick ? () => onChairClick(seat.name) : undefined}
    >
      <Col xs={24}>
        <Row justify='space-between'>
          <Col>
            <PiArmchairDuotone className='text-aurora text-4xl' />
          </Col>

          <Col>
            <Typography.Title
              className='!my-0'
              data-test='chair-title'
              level={4}
            >
              {seat.code}
            </Typography.Title>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default ChairCard;
