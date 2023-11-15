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
import { login } from '../../redux/slices/auth.slice';
import { setUserStatus } from '../../redux/slices/status.slice';

function Login() {
  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const authState = useAppSelector(selectAuth);

  const [form] = Form.useForm();

  useEffect(() => {
    if (authState.error) {
      messageApi.open({
        type: 'error',
        content: authState.error,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.error]);

  const onFinish = async (values: { email: string; password: string }) => {
    const body = {
      usr: values.email,
      pwd: values.password,
    };

    dispatch(login(body)).then((action) => {
      if (login.fulfilled.match(action)) {
        const payload: UserStatus = {
          balance: action.payload.data.balance,
          current_chair: action.payload.data.current_chair,
          current_cart: action.payload.data.current_cart,
        };

        dispatch(setUserStatus(payload));
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
                name='email'
                rules={[
                  { required: true, message: 'Please input your email!' },
                  {
                    type: 'email',
                    message: 'The input is not valid email!',
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
                  loading={authState.status === 'loading'}
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
