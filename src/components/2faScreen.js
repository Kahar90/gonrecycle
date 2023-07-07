import speakeasy from "speakeasy";
import { QRCodeSVG } from "qrcode.react";
import { Button, Form, Input, message } from "antd";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const TwoFactorScreen = ({ alreadySetUp, email }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const info = (message) => {
    messageApi.info(message);
  };
  const secret = speakeasy.generateSecret();
  const [twofatoken, settwofatoken] = useState(null);

  const Router = useRouter();

  const verifyToken = (token) => {
    console.log(secret.ascii, "secret");
    console.log(token, "token");
    const stringtoken = token.toString();
    return speakeasy.totp.verify({
      secret: twofatoken,
      encoding: "ascii",
      token: stringtoken,
    });
  };

  const verifyTokenNew = async (token, email, permission) => {
    const stringtoken = token.toString();
    const verified = speakeasy.totp.verify({
      secret: secret.ascii,
      encoding: "ascii",
      token: stringtoken,
    });

    if (verified) {
      axios
        .post("/api/2facodeadd", {
          email,
          permission,
          token: secret.ascii,
        })
        .then((res) => {
          console.log(res, "res");
          if (res.data.success) {
            info("2fa setup success");
            Router.push("/");
          }
        });
    } else {
      info("2fa setup failed");
      window.location.reload();
    }
  };

  const get2fatoken = async (email) => {
    await axios.post("/api/2facheck", { email }).then((res) => {
      console.log(res.data, "res");
      const firstentry = res.data[0];
      console.log(firstentry?.token, "firstentry");
      if (firstentry?.token) {
        settwofatoken(firstentry.token);
      }
    });
  };

  useEffect(() => {
    get2fatoken(email);
  }, []);

  return (
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
      {contextHolder}
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
        <h1>Two Factor Screen</h1>

        {!twofatoken ? <QRCodeSVG value={secret.otpauth_url} /> : null}
        <br />

        <Form
          name="basic"
          onFinish={(values) => {
            console.log(values, "values");

            if (twofatoken) {
              try {
                const verified = verifyToken(values.token);
                console.log(verified, "verified");

                if (verified) {
                  Router.push("/");
                  info("Successfully logged in!");
                }
              } catch (error) {
                info(error.message);
              }
            } else {
              try {
                const verified = verifyTokenNew(values.token, email, "admin");

                if (verified) {
                  Router.push("/");
                  info("Successfully logged in!");
                }
              } catch (error) {
                info(error.message);
              }
            }
          }}
        >
          <Form.Item
            label="Token"
            name="token"
            rules={[
              {
                required: true,
                message: "Please input your token!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              style={{
                backgroundColor: "#fff",
                color: "#1890ff",
                borderColor: "#1890ff",
              }}
              type="secondary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default TwoFactorScreen;
