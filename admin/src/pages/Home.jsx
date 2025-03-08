import React from "react";
import { Button, Typography, Row, Col, Card, Space } from "antd";
import { Link } from "react-router-dom";
import { RocketOutlined, TrophyOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <div
      style={{
        backgroundImage:
          "url(https://www.example.com/your-background-image.jpg)", // Add your custom background
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
      <div
        style={{
          zIndex: 2, // Above the overlay
          textAlign: "center",
          color: "#fff",
          padding: "30px",
          borderRadius: "10px",
          maxWidth: "800px",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Soft background to contrast text
        }}
      >
        <Title
          level={1}
          style={{
            color: "#FF9900", // Gold color
            fontWeight: "bold",
            fontSize: "48px",
            textShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)", // Text shadow for pop
          }}
        >
          Welcome to Spirit11
        </Title>

        <Paragraph
          style={{
            fontSize: "18px",
            lineHeight: "1.6",
            maxWidth: "650px",
            margin: "0 auto 30px",
            color: "rgba(255, 255, 255, 0.85)",
          }}
        >
          Build your dream team and compete in the ultimate inter-university
          cricket tournament. Analyze real-time stats and dominate the
          leaderboard with the help of Spiriter!
        </Paragraph>

        {/* Features Row */}
        <Row gutter={[16, 16]} justify="center">
          <Col span={12} xs={24} sm={12} md={8}>
            <Card
              style={{
                backgroundColor: "#222", // Darker background for contrast
                color: "#fff",
                borderRadius: "12px",
                transition: "all 0.3s ease-in-out",
              }}
              hoverable
              cover={
                <RocketOutlined
                  style={{ fontSize: "50px", color: "#FF9900" }}
                />
              }
            >
              <Title level={4} style={{ color: "#FF9900" }}>
                Create Your Team
              </Title>
              <Paragraph
                style={{
                  fontSize: "16px",
                  lineHeight: "1.6",
                  maxWidth: "650px",
                  margin: "0 auto 30px",
                  color: "white", // Smooth white color
                  textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)", // Subtle text shadow for readability
                  fontWeight: "lighter", // Lighter weight for a smooth look
                }}
              >
                Create your dream team using real university players.
              </Paragraph>
            </Card>
          </Col>

          <Col span={12} xs={24} sm={12} md={8}>
            <Card
              style={{
                backgroundColor: "#222",
                color: "#fff",
                borderRadius: "12px",
                transition: "all 0.3s ease-in-out",
              }}
              hoverable
              cover={
                <TrophyOutlined
                  style={{ fontSize: "50px", color: "#FF9900" }}
                />
              }
            >
              <Title level={4} style={{ color: "#FF9900" }}>
                Compete & Win
              </Title>
              <Paragraph
                style={{
                  fontSize: "16px",
                  lineHeight: "1.6",
                  maxWidth: "650px",
                  margin: "0 auto 30px",
                  color: "white", // Smooth white color
                  textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)", // Subtle text shadow for readability
                  fontWeight: "lighter", // Lighter weight for a smooth look
                }}
              >
                Climb the leaderboard and prove you're the best.
              </Paragraph>
            </Card>
          </Col>
        </Row>

        {/* Call to Action Buttons */}
        <Space direction="vertical" style={{ marginTop: "40px" }}>
          <Link to="/register">
            <Button
              type="primary"
              size="large"
              style={{
                width: "250px",
                borderRadius: "30px",
                background:
                  "linear-gradient(90deg, rgba(255, 153, 0, 1) 0%, rgba(255, 255, 255, 1) 100%)",
                border: "none",
                fontSize: "18px",
                boxShadow: "0px 4px 20px rgba(255, 153, 0, 0.5)",
              }}
            >
              Create Account
            </Button>
          </Link>

          <Link to="/login">
            <Button
              type="link"
              style={{
                color: "#FF9900",
                fontSize: "16px",
                textDecoration: "underline",
              }}
            >
              Already have an account? Login here
            </Button>
          </Link>
        </Space>
      </div>
    </div>
  );
};

export default Home;
