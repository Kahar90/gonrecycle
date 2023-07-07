import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  RecaptchaVerifier,
  multiFactor,
  signInWithTwoFactorCode,
  PhoneAuthProvider,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Form, Input, Space, message } from "antd";
import speakeasy from "speakeasy";
import { QRCodeSVG } from "qrcode.react";
import TwoFactorScreen from "./2faScreen";

const LoginPage = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBE3hGqOSI5j1D40aTreuEb5W6h3kngcXs",
    authDomain: "gonrecycle-4e916.firebaseapp.com",
    projectId: "gonrecycle-4e916",
    storageBucket: "gonrecycle-4e916.appspot.com",
    messagingSenderId: "714182303175",
    appId: "1:714182303175:web:500a4c93eb46d0d6ce4de2",
    measurementId: "G-KMLHS5T9WD",
  };

  // Initialize Firebase

  const app = initializeApp(firebaseConfig);
  const [messageApi, contextHolder] = message.useMessage();
  const info = (message) => {
    messageApi.info(message);
  };

  const [secondAuthFlow, setsecondAuthFlow] = useState(false);

  const firebaseAuth = getAuth();

  const Router = useRouter();

  const handleSignInEmailPass = async (values) => {
    info("Processing...");
    try {
      let result = await signInWithEmailAndPassword(
        firebaseAuth,
        values.username,
        values.password
      );
      // console.log(result);
      // Router.push("/");
      info("Login Success, please wait for 2fa");
      setsecondAuthFlow(true);
    } catch (error) {
      info(error.message);
    }
  };

  const secret = speakeasy.generateSecret();

  const verifyToken = (token) => {
    console.log(secret.ascii, "secret");
    console.log(token, "token");
    const stringtoken = token.toString();
    return speakeasy.totp.verify({
      secret: secret.ascii,
      encoding: "ascii",
      token: stringtoken,
    });
  };

  if (secondAuthFlow) {
    return (
      <TwoFactorScreen
        alreadySetUp={true}
        email={firebaseAuth?.currentUser?.email}
      />
    );
  }

  return (
    <>
      {contextHolder}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          overflow: "hidden",
          backgroundColor: "#f0f2f5",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Login
          </h1>

          {/* <QRCodeSVG value={secret.otpauth_url} /> */}
          {/* <br /> */}

          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={handleSignInEmailPass}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                  type: "email",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            {/* <Form.Item
              // hidden={true}
              label="2fa code"
              name="2fa"
              rules={[
                {
                  required: true,
                  message: "Please input your 2fa!",
                },
              ]}
            >
              <Input />
            </Form.Item> */}

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Space size="middle">
                <Button
                  style={{
                    backgroundColor: "#fff",
                    color: "#1890ff",
                    borderColor: "#1890ff",
                  }}
                  type="secondary"
                  htmlType="submit"
                >
                  Login
                </Button>
                <Button
                  style={{
                    backgroundColor: "#fff",
                    color: "#1890ff",
                    borderColor: "#1890ff",
                  }}
                  type="primary"
                  onClick={() => Router.push("/signup")}
                >
                  Sign Up
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
