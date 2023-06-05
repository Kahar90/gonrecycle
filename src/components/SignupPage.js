import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Form, Input, Space, message } from "antd";

const SignupPage = () => {
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

  const firebaseAuth = getAuth();

  const Router = useRouter();

  const handleSignInEmailPass = async (values) => {
    info("Processing...");
    try {
      let result = await createUserWithEmailAndPassword(
        firebaseAuth,
        values.username,
        values.password
      );
      console.log(result);
      Router.push("/");
    } catch (error) {
      info(error.message);
    }
  };

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
            Sign up
          </h1>

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
                  Create Account
                </Button>
                <Button
                  style={{
                    backgroundColor: "#fff",
                    color: "#1890ff",
                    borderColor: "#1890ff",
                    marginRight: "100px",
                  }}
                  type="primary"
                  onClick={() => Router.push("/login")}
                >
                  Login
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
