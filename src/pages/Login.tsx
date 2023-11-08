import { Button, Col, Form, Image, Input, Row, Typography } from 'antd';
import { BiCoffeeTogo } from 'react-icons/bi';
import chief from '../assets/images/icons/chief.png';
import demo from '../assets/videos/login-demo.mp4';

function Login() {
  const [form] = Form.useForm();

  const onFinish = (values: { email: string; password: string }) => {
    console.log(values);
  };

  return (
    <div className='login-page'>
      <video src={demo} muted loop autoPlay className='video-bg' />
      <Row justify='center' align='middle' className='min-h-screen'>
        <Col xs={20} md={8}>
          <div className='bg-overlay'>
            <div className='text-center mb-5'>
              <Typography.Title className='dancing-font mt-0 !text-aurora'>
                Welcome To BS
              </Typography.Title>

              <Image src={chief} preview={false} width={180} />
            </div>

            <Form form={form} onFinish={onFinish} size='large'>
              <Form.Item
                name='email'
                rules={[
                  { required: true, message: 'Please input your email!' },
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                ]}
              >
                <Input placeholder='Email' />
              </Form.Item>

              <Form.Item
                name='password'
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password placeholder='Password' />
              </Form.Item>

              <Form.Item>
                <Button
                  htmlType='submit'
                  type='primary'
                  block
                  icon={<BiCoffeeTogo className='btn-icon' />}
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
