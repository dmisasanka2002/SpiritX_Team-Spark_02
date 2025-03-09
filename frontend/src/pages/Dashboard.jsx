import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Card,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Typography,
  List,
  Space,
  Row,
  Col,
  Tag,
} from "antd";
import {
  HomeOutlined,
  TeamOutlined,
  BarChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { fetchPlayers } from "../api/player"; // Mock API for players

const { Header, Content, Sider } = Layout;
const { Option } = Select;
const { Title } = Typography;

const AdminPanel = () => {
  const [players, setPlayers] = useState([]); // All players data
  const [selectedTab, setSelectedTab] = useState("home");
  const [team, setTeam] = useState([]); // Selected team players
  const [budget, setBudget] = useState(9000000); // Initial budget of Rs. 9,000,000
  const [teamSize, setTeamSize] = useState(0); // Track team size
  const [remainingBudget, setRemainingBudget] = useState(9000000); // Budget tracking
  const [leaderboard, setLeaderboard] = useState([]); // Leaderboard data
  const [user, setUser] = useState({ username: "User1", points: 0 }); // Mock current user
  const [selectedCategory, setSelectedCategory] = useState("Batsman"); // Category state

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    const data = await fetchPlayers();
    setPlayers(data);
  };

  const handlePlayerSelect = (player) => {
    if (team.length < 11) {
      if (team.some((p) => p._id === player._id)) {
        alert("Player already in your team!");
        return;
      }
      setTeam((prevTeam) => [...prevTeam, player]);
      setRemainingBudget((prevBudget) => prevBudget - player.value);
      setTeamSize((prevSize) => prevSize + 1);
    }
  };

  const handlePlayerRemove = (playerId) => {
    const playerToRemove = team.find((p) => p._id === playerId);
    setTeam((prevTeam) => prevTeam.filter((p) => p._id !== playerId));
    setRemainingBudget((prevBudget) => prevBudget + playerToRemove.value);
    setTeamSize((prevSize) => prevSize - 1);
  };

  const getTotalPoints = () => {
    if (team.length === 11) {
      return team.reduce((total, player) => total + player.points, 0);
    }
    return 0;
  };

  const handleTabChange = (key) => {
    setSelectedTab(key);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value); // Update the selected category
  };

  const handleLeaderboardUpdate = (newLeaderboard) => {
    setLeaderboard(newLeaderboard);
  };

  const getLeaderboard = () => {
    return leaderboard
      .sort((a, b) => b.points - a.points)
      .map((entry, index) => (
        <Row key={index}>
          <Col span={12}>
            <span>{entry.username}</span>
          </Col>
          <Col span={12}>
            <span>{entry.points}</span>
          </Col>
        </Row>
      ));
  };

  const isTeamComplete = team.length === 11;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedTab]}
          onSelect={({ key }) => handleTabChange(key)}
        >
          <Menu.Item key="home" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="selectTeam" icon={<TeamOutlined />}>
            Select Your Team
          </Menu.Item>
          <Menu.Item key="team" icon={<TeamOutlined />}>
            Team
          </Menu.Item>
          <Menu.Item key="leaderboard" icon={<BarChartOutlined />}>
            Leaderboard
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#001529", color: "#fff", textAlign: "center" }}>
          Admin Panel
        </Header>
        <Content style={{ padding: 20 }}>
          {selectedTab === "home" && (
            <Card>
              <Title level={2}>Welcome to the Admin Panel</Title>
              <p>Manage players, view statistics, and analyze tournament data.</p>
            </Card>
          )}

          {selectedTab === "selectTeam" && (
            <Card>
              <Title level={2}>Select Your Team</Title>
              <Row gutter={16}>
                <Col span={8}>
                  <Button
                    block
                    onClick={() => setSelectedTab("team")}
                    type="primary"
                  >
                    Go to Team
                  </Button>
                </Col>
                <Col span={8}>
                  <Select 
                    defaultValue="Batsman" 
                    onChange={handleCategoryChange} // Handle category change
                  >
                    <Option value="Batsman">Batsman</Option>
                    <Option value="Bowler">Bowler</Option>
                    <Option value="All-Rounder">All-Rounder</Option>
                  </Select>
                </Col>
              </Row>
              <List
                itemLayout="horizontal"
                dataSource={players.filter((player) => player.category === selectedCategory)} // Filter players based on selected category
                renderItem={(player) => (
                  <List.Item
                    actions={[
                      <Button onClick={() => handlePlayerSelect(player)}>Select</Button>,
                    ]}
                  >
                    <List.Item.Meta
                      title={player.name}
                      description={`University: ${player.university}`}
                    />
                  </List.Item>
                )}
              />
            </Card>
          )}

          {selectedTab === "team" && (
            <Card>
              <Title level={2}>Your Team</Title>
              <p>{teamSize}/11 players selected</p>
              <List
                dataSource={team}
                renderItem={(player) => (
                  <List.Item
                    actions={[
                      <Button danger onClick={() => handlePlayerRemove(player._id)}>
                        Remove
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      title={player.name}
                      description={`University: ${player.university}`}
                    />
                  </List.Item>
                )}
              />
              <p>Total Points: {getTotalPoints()}</p>
              <p>Remaining Budget: Rs. {remainingBudget}</p>
            </Card>
          )}

          {selectedTab === "leaderboard" && (
            <Card>
              <Title level={2}>Leaderboard</Title>
              {getLeaderboard()}
            </Card>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPanel;
