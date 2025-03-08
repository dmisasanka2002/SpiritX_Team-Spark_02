import { useState, useEffect, useContext } from "react";
import { Form, Input, Button, message, Typography, Card, Divider, Row, Col, Steps, Alert, Progress } from "antd";
import { UserOutlined, LockOutlined, MailOutlined, GoogleOutlined, GithubOutlined } from "@ant-design/icons";
import { signup } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordValue, setPasswordValue] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // Calculate password strength
  useEffect(() => {
    if (!passwordValue) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    // Length check
    if (passwordValue.length >= 8) strength += 20;
    
    // Complexity checks
    if (/[a-z]/.test(passwordValue)) strength += 20; // lowercase
    if (/[A-Z]/.test(passwordValue)) strength += 20; // uppercase
    if (/[0-9]/.test(passwordValue)) strength += 20; // numbers
    if (/[^A-Za-z0-9]/.test(passwordValue)) strength += 20; // special characters
    
    setPasswordStrength(strength);
  }, [passwordValue]);

  const getPasswordStrengthStatus = () => {
    if (passwordStrength <= 20) return "exception";
    if (passwordStrength <= 60) return "normal";
    return "success";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 20) return "Weak";
    if (passwordStrength <= 60) return "Medium";
    return "Strong";
  };

  const handleSignup = async (values) => {
    // Remove confirmPassword before sending to API
    const { confirmPassword, ...signupData } = values;
    
    setLoading(true);
    try {
      await signup(signupData);
      message.success("Account created successfully!");
      setCurrentStep(1);
      setTimeout(() => {
        setCurrentStep(2);
        setTimeout(() => navigate("/login"), 2000);
      }, 2000);
    } catch (error) {
      message.error(error.response?.data?.message || "Registration failed. Please try again.");
      if (error.response?.data?.field) {
        form.setFields([
          {
            name: error.response.data.field,
            errors: [error.response.data.message],
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = (provider) => {
    message.info(`${provider} registration is not implemented yet`);
  };

  const validatePassword = (_, value) => {
    const password = form.getFieldValue("password");
    if (!value || password === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("The two passwords do not match"));
  };

  const passwordValidationRules = [
    { required: true, message: "Please enter a password" },
    { min: 8, message: "Password must be at least 8 characters" },
    {
      pattern: /[a-z]/,
      message: "Password must contain at least one lowercase letter"
    },
    {
      pattern: /[A-Z]/,
      message: "Password must contain at least one uppercase letter"
    },
    {
      pattern: /[^A-Za-z0-9]/,
      message: "Password must contain at least one special character"
    }
  ];

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
        <Col xs={22} sm={18} md={14} lg={10} xl={8}>
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
                Create Account
              </Title>
              <Text style={{ color: "rgba(255, 255, 255, 0.85)" }}>
                Join Spirit11 and build your dream team
              </Text>
            </div>

            <Steps 
              current={currentStep} 
              style={{ marginBottom: "24px" }}
              progressDot
              items={[
                { title: <span style={{ color: "rgba(255, 255, 255, 0.85)" }}>Register</span> },
                { title: <span style={{ color: "rgba(255, 255, 255, 0.85)" }}>Confirm</span> },
                { title: <span style={{ color: "rgba(255, 255, 255, 0.85)" }}>Done</span> }
              ]}
            />

            {currentStep === 0 && (
              <>
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSignup}
                  scrollToFirstError
                >
                  <Form.Item
                    name="username"
                    rules={[
                      { required: true, message: "Please enter a username" },
                      { min: 8, message: "Username must be at least 8 characters" }
                    ]}
                    style={{ marginBottom: "16px" }}
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
                    name="email"
                    rules={[
                      { required: true, message: "Please enter your email" },
                      { type: "email", message: "Please enter a valid email" }
                    ]}
                    style={{ marginBottom: "16px" }}
                  >
                    <Input
                      prefix={<MailOutlined style={{ color: "rgba(255, 153, 0, 0.8)" }} />}
                      placeholder="Email"
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
                    rules={passwordValidationRules}
                    hasFeedback
                    style={{ marginBottom: "4px" }}
                  >
                    <Input.Password
                      prefix={<LockOutlined style={{ color: "rgba(255, 153, 0, 0.8)" }} />}
                      placeholder="Password"
                      size="large"
                      onChange={(e) => setPasswordValue(e.target.value)}
                      style={{ 
                        backgroundColor: "rgba(34, 34, 34, 0.8)", 
                        color: "white", 
                        borderColor: "#FF9900",
                        borderRadius: "6px"
                      }}
                    />
                  </Form.Item>
                  
                  {passwordValue && (
                    <div style={{ marginBottom: "16px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                        <Text style={{ color: "rgba(255, 255, 255, 0.7)" }}>Password Strength:</Text>
                        <Text style={{ 
                          color: getPasswordStrengthStatus() === "exception" ? "#ff4d4f" : 
                                 getPasswordStrengthStatus() === "success" ? "#52c41a" : "#FF9900"
                        }}>
                          {getPasswordStrengthText()}
                        </Text>
                      </div>
                      <Progress 
                        percent={passwordStrength} 
                        status={getPasswordStrengthStatus()} 
                        showInfo={false} 
                        size="small"
                        strokeColor={
                          getPasswordStrengthStatus() === "exception" ? "#ff4d4f" : 
                          getPasswordStrengthStatus() === "success" ? "#52c41a" : "#FF9900"
                        }
                        trailColor="rgba(255, 255, 255, 0.2)"
                      />
                    </div>
                  )}
                  
                  <Form.Item
                    name="confirmPassword"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      { required: true, message: "Please confirm your password" },
                      { validator: validatePassword }
                    ]}
                    style={{ marginBottom: "24px" }}
                  >
                    <Input.Password
                      prefix={<LockOutlined style={{ color: "rgba(255, 153, 0, 0.8)" }} />}
                      placeholder="Confirm Password"
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
                      Sign Up
                    </Button>
                  </Form.Item>

                  <Form.Item style={{ textAlign: "center", marginBottom: "8px" }}>
                    <Text style={{ color: "rgba(255, 255, 255, 0.85)" }}>Already have an account? </Text>
                    <Link to="/login" style={{ color: "#FF9900", textDecoration: "underline" }}>
                      Sign in
                    </Link>
                  </Form.Item>
                </Form>

                <Divider plain style={{ color: "rgba(255, 255, 255, 0.5)", borderColor: "rgba(255, 153, 0, 0.2)" }}>
                  Or sign up with
                </Divider>
                
                <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
                  <Button
                    icon={<GoogleOutlined style={{ color: "#FF9900" }} />}
                    shape="circle"
                    size="large"
                    onClick={() => handleSocialSignup("Google")}
                    style={{ 
                      backgroundColor: "rgba(34, 34, 34, 0.8)", 
                      borderColor: "#FF9900" 
                    }}
                  />
                  <Button
                    icon={<GithubOutlined style={{ color: "#FF9900" }} />}
                    shape="circle"
                    size="large"
                    onClick={() => handleSocialSignup("GitHub")}
                    style={{ 
                      backgroundColor: "rgba(34, 34, 34, 0.8)", 
                      borderColor: "#FF9900" 
                    }}
                  />
                </div>
              </>
            )}

            {currentStep === 1 && (
              <div style={{ textAlign: "center" }}>
                <Alert
                  message={<span style={{ color: "#52c41a", fontWeight: "bold" }}>Account created successfully!</span>}
                  description={<span style={{ color: "#f0f0f0" }}>Finalizing your account setup...</span>}
                  type="success"
                  showIcon
                  style={{ 
                    backgroundColor: "rgba(82, 196, 26, 0.1)",
                    borderColor: "rgba(82, 196, 26, 0.3)"
                  }}
                />
              </div>
            )}

            {currentStep === 2 && (
              <div style={{ textAlign: "center" }}>
                <Alert
                  message={<span style={{ color: "#52c41a", fontWeight: "bold" }}>Registration Complete</span>}
                  description={<span style={{ color: "#f0f0f0" }}>Redirecting you to login page...</span>}
                  type="success"
                  showIcon
                  style={{ 
                    backgroundColor: "rgba(82, 196, 26, 0.1)",
                    borderColor: "rgba(82, 196, 26, 0.3)"
                  }}
                />
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Signup;