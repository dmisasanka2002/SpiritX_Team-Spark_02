import { useState, useContext, useEffect } from "react";
import { Form, Input, Button, message, Typography, Card, Divider, Checkbox, Row, Col } from "antd";
import { UserOutlined, LockOutlined, GoogleOutlined, GithubOutlined } from "@ant-design/icons";
import { login } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { login: setUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const { data } = await login(values);
      setUser(data.user);
      message.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      message.error(error.response?.data?.message || "Login failed. Please check your credentials.");
      form.setFields([
        {
          name: "password",
          errors: ["Invalid username or password"],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    message.info(`${provider} login is not implemented yet`);
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(https://www.example.com/your-background-image.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        color: "#fff",
        position: "relative",
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark transparent overlay
        }}
      />
      
      <Row justify="center" align="middle" style={{ zIndex: 2, width: "100%" }}>
        <Col xs={22} sm={16} md={12} lg={8} xl={6}>
          <Card 
            style={{ 
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              boxShadow: "0 4px 20px rgba(255, 153, 0, 0.3)",
              border: "1px solid rgba(255, 153, 0, 0.2)",
              borderRadius: "12px"
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <Title 
                level={2} 
                style={{ 
                  margin: "0 0 8px 0", 
                  color: "#FF9900",
                  fontWeight: "bold",
                  textShadow: "1px 1px 5px rgba(0, 0, 0, 0.3)"
                }}
              >
                Welcome Back
              </Title>
              <Text style={{ color: "rgba(255, 255, 255, 0.85)" }}>
                Sign in to continue to your Spirit11 account
              </Text>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleLogin}
              initialValues={{ remember: true }}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: "Please enter your username" }]}
              >
                <Input 
                  prefix={<UserOutlined style={{ color: "rgba(255, 153, 0, 0.8)" }} />} 
                  placeholder="Username" 
                  size="large"
                  style={{ 
                    backgroundColor: "rgba(34, 34, 34, 0.8)", 
                    color: "white", 
                    borderColor: "#FF9900",
                    borderRadius: "6px"
                  }}
                />
              </Form.Item>
              
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Please enter your password" }]}
              >
                <Input.Password 
                  prefix={<LockOutlined style={{ color: "rgba(255, 153, 0, 0.8)" }} />} 
                  placeholder="Password" 
                  size="large"
                  style={{ 
                    backgroundColor: "rgba(34, 34, 34, 0.8)", 
                    color: "white", 
                    borderColor: "#FF9900",
                    borderRadius: "6px"
                  }}
                />
              </Form.Item>
              
              <Form.Item>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox style={{ color: "rgba(255, 255, 255, 0.85)" }}>Remember me</Checkbox>
                  </Form.Item>
                  <Link to="/forgot-password" style={{ color: "#FF9900" }}>Forgot password?</Link>
                </div>
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading} 
                  block 
                  size="large"
                  style={{
                    borderRadius: "30px",
                    background: "linear-gradient(90deg, rgba(255, 153, 0, 1) 0%, rgba(255, 180, 50, 1) 100%)",
                    border: "none",
                    fontSize: "16px",
                    boxShadow: "0px 4px 20px rgba(255, 153, 0, 0.5)",
                    height: "48px"
                  }}
                >
                  Sign In
                </Button>
              </Form.Item>

              <Form.Item style={{ textAlign: "center", marginBottom: "8px" }}>
                <Text style={{ color: "rgba(255, 255, 255, 0.85)" }}>Don't have an account? </Text>
                <Link to="/register" style={{ color: "#FF9900", textDecoration: "underline" }}>
                  Create Account
                </Link>
              </Form.Item>
            </Form>

            <Divider plain style={{ color: "rgba(255, 255, 255, 0.5)", borderColor: "rgba(255, 153, 0, 0.2)" }}>
              Or connect with
            </Divider>
            
            <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
              <Button 
                icon={<GoogleOutlined style={{ color: "#FF9900" }} />} 
                shape="circle" 
                size="large"
                onClick={() => handleSocialLogin("Google")}
                style={{ 
                  backgroundColor: "rgba(34, 34, 34, 0.8)", 
                  borderColor: "#FF9900" 
                }}
              />
              <Button 
                icon={<GithubOutlined style={{ color: "#FF9900" }} />} 
                shape="circle" 
                size="large"
                onClick={() => handleSocialLogin("GitHub")}
                style={{ 
                  backgroundColor: "rgba(34, 34, 34, 0.8)", 
                  borderColor: "#FF9900" 
                }}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Login;