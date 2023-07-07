import Checkout from "@/components/checkout";
import { Button, Space, Table } from "antd";
import { useEffect, useState } from "react";

const Home = () => {
  const [userOrder, setUserOrder] = useState([]);
  const [checkoutState, setCheckoutState] = useState(false);
  const columns = [
    {
      title: "Pizza",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "",
      render: (record) => {
        return (
          <Button
            onClick={() => {
              addToCart(record);
            }}
          >
            Add to cart
          </Button>
        );
      },
    },
  ];

  const data = [
    {
      name: "Margherita",
      price: 9.99,
    },
    {
      name: "Pepperoni",
      price: 10.99,
    },
    {
      name: "Supreme",
      price: 12.99,
    },
    {
      name: "Hawaiian",
      price: 11.99,
    },
    {
      name: "BBQ Chicken",
      price: 12.99,
    },
    {
      name: "Vegetarian",
      price: 11.99,
    },
  ];

  const addToCart = (pizza) => {
    setUserOrder([...userOrder, pizza]);
  };

  const buttonStyle = {
    backgroundColor: "#fff",
    color: "#1890ff",
    borderColor: "#1890ff",
  };

  const [userPerm, setuserPerm] = useState(null);

  const getUserPermission = async () => {
    try {
      const res = await axios.get("/api/2facheck");
      console.log(res);
      setuserPerm(res.data.permission);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserPermission();
  }, []);

  /* 
  
• Input Validation 
• Multi-factor Authentication ✅
• Authorization and Access Control
• State Management
• Secure Transmission 
• Secure Storage
• Error Handling
• SQL Database ✅
• Users Management ✅
• Web Interface  ✅
  
  */

  return (
    <>
      {userPerm !== "admin" ? (
        checkoutState ? (
          <>
            <div
              style={{
                padding: "30px",
                backgroundColor: "white",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                flexDirection: "column",
              }}
            >
              <h1
                style={{
                  fontSize: "30px",
                  fontWeight: "bold",
                }}
              >
                Checkout
              </h1>
              <p
                style={{
                  fontSize: "20px",
                  marginBottom: "20px",
                }}
              >
                Total: $
                {userOrder.reduce((acc, pizza) => {
                  return acc + pizza.price;
                }, 0)}
              </p>
              <Space>
                <Button
                  style={buttonStyle}
                  onClick={() => setCheckoutState(false)}
                >
                  Back
                </Button>

                {/* <Button
                  style={buttonStyle}
                  onClick={() => alert("Order placed!")}
                >
                  Place Order
                </Button> */}
                <Checkout cart={userOrder} buttonStyle={buttonStyle} />
              </Space>
            </div>
          </>
        ) : (
          ordering({
            userOrder,
            setUserOrder,
            checkoutState,
            setCheckoutState,
            columns,
            data,
            buttonStyle,
          })
        )
      ) : (
        <h1>You are not authorized to view this page</h1>
      )}
    </>
  );
};

export default Home;

const ordering = ({
  userOrder,
  setUserOrder,
  checkoutState,
  setCheckoutState,
  columns,
  data,
  buttonStyle,
}) => {
  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "white",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* A table with types of pizza for order */}

      <Table
        columns={columns}
        dataSource={data}
        style={{
          width: "50%",
          margin: "auto",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
        }}
      />
      <Space
        direction="vertical"
        style={{
          width: "30%",
          // boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
        }}
      >
        <p
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            width: "100%",
            maxHeight: "300px",
            margin: "auto",
            overflow: "auto",
          }}
        >
          Your order:
          {userOrder.map((pizza) => {
            return <li>{pizza.name}</li>;
          })}
        </p>

        <Space>
          <Button
            style={buttonStyle}
            onClick={() => {
              setCheckoutState(true);
            }}
          >
            Checkout
          </Button>
          <Button
            style={buttonStyle}
            onClick={() => {
              setUserOrder([]);
            }}
          >
            Clear
          </Button>
          <Button
            style={buttonStyle}
            onClick={() => {
              // remove all local storage
              localStorage.clear();
              window.location.reload();
            }}
          >
            Logout
          </Button>
        </Space>
      </Space>
    </div>
  );
};
