import { Flex, Spin } from 'antd';

function SuspenseLoading() {
  return (
    <Flex style={{ minHeight: '200px' }} justify='center' align='center'>
      <Spin size='large' />
    </Flex>
  );
}

export default SuspenseLoading;
