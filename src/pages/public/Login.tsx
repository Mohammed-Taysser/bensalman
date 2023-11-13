import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Row,
  Typography,
  message,
} from 'antd';
import { useEffect } from 'react';
import { BiCoffeeTogo } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import chief from '../../assets/images/icons/chief.png';
import demo from '../../assets/videos/login-demo.mp4';
import {
  selectAuth,
  useAppDispatch,
  useAppSelector,
} from '../../hooks/useRedux';
import { login } from '../../redux/slices/auth';

function Login() {
  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const loginState = useAppSelector(selectAuth);

  const [form] = Form.useForm();

  useEffect(() => {
    if (loginState.error) {
      messageApi.open({
        type: 'error',
        content: loginState.error,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginState.error]);

  const onFinish = async (values: { usr: string; pwd: string }) => {
    dispatch(login(values)).then((action) => {
      if (login.fulfilled.match(action)) {
        navigateTo('/');
      }
    });
  };

  return (
    <div className='login-page'>
      {contextHolder}
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
                name='usr'
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
                name='pwd'
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
                  loading={loginState.status === 'loading'}
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
