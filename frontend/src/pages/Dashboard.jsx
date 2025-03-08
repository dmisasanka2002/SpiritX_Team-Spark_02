import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  UserOutlined, 
  LogoutOutlined, 
  DashboardOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { Typography, Layout, Menu, Avatar, Card, Row, Col, Statistic, Button } from "antd";

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <DashboardOutlined style={{ fontSize: "24px", color: "white", marginRight: "12px" }} />
          <Title level={4} style={{ color: "white", margin: 0 }}>App Dashboard</Title>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar icon={<UserOutlined />} src={user?.avatar} style={{ marginRight: "8px" }} />
          <Text style={{ color: "white", marginRight: "16px" }}>{user?.username}</Text>
          <Button 
            type="text" 
            icon={<LogoutOutlined />} 
            onClick={handleLogout} 
            style={{ color: "white" }}>
            Logout
          </Button>
        </div>
      </Header>
      
      <Layout>
        <Sider width={200} style={{ background: "#fff" }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              Profile
            </Menu.Item>
            <Menu.Item key="3" icon={<SettingOutlined />}>
              Settings
            </Menu.Item>
          </Menu>
        </Sider>
        
        <Content style={{ margin: "24px" }}>
          <Title level={2}>Welcome back, {user?.username}!</Title>
          <Text type="secondary">Here's an overview of your account</Text>
          
          <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
            <Col span={8}>
              <Card>
                <Statistic title="Total Sessions" value={42} />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic title="Active Projects" value={7} />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic title="Completed Tasks" value={256} />
              </Card>
            </Col>
          </Row>
          
          <Card style={{ marginTop: "24px" }}>
            <Title level={4}>Recent Activity</Title>
            <Text>No recent activity to display.</Text>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;