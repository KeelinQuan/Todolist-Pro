import { Button, Form, Input } from "antd";
import { emailRule, passwordRule } from "@/common/rules";
import { useNavigate } from "react-router-dom";
import useNotification from "@/customHook/useNotify";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "@/redux/auth/thunk";
const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const { contextHolder, errorNotify } = useNotification();
  const nav = useNavigate();
  const onFinish = async (values) => {
    dispatch(loginThunk(values))
      .then((data) => {
        if (data.error) {
          throw data.error;
        } else {
          nav("/");
        }
      })
      .catch((error) => {
        errorNotify("topRight", "Loi dang nhap", error.message);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    errorNotify("topRight", "Loi dang nhap", "Khong thanh cong");
  };

  return (
    <Form
      name="loginForm"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      initialValues={{ identifier: "manager@gmail.com", password: "123456" }}
    >
      {contextHolder}
      <Form.Item label="Email" name="identifier" rules={emailRule}>
        <Input />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={passwordRule}>
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button disabled={loading} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Login;
