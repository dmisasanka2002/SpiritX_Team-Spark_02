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
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  HomeOutlined,
  TeamOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import {
  fetchPlayers,
  addPlayer,
  updatePlayer,
  deletePlayer,
} from "../api/player";

const { Header, Content, Sider } = Layout;
const { Option } = Select;
const { Title } = Typography;

const AdminPanel = () => {
  const [players, setPlayers] = useState([
    {
      key: 1,
      name: "Chamika Chandimal",
      university: "University of the Visual & Performing Arts",
      category: "Batsman",
      totalRuns: 530,
      ballsFaced: 588,
      inningsPlayed: 10,
      wickets: 0,
      oversBowled: 3,
      runsConceded: 21,
      value: "Rs. 1,500,000",
      points: 750,
    },
    {
      key: 2,
      name: "Dimuth Dhananjaya",
      university: "University of the Visual & Performing Arts",
      category: "All-Rounder",
      totalRuns: 250,
      ballsFaced: 208,
      inningsPlayed: 10,
      wickets: 8,
      oversBowled: 40,
      runsConceded: 240,
      value: "Rs. 2,000,000",
      points: 820,
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [viewingPlayer, setViewingPlayer] = useState(null);
  const [selectedTab, setSelectedTab] = useState("home");
  const [form] = Form.useForm();

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    const data = await fetchPlayers();
    setPlayers(data);
  };

  const showModal = (player = null) => {
    setEditingPlayer(player);
    setIsModalVisible(true);
    form.setFieldsValue(player || {});
  };

  const showPlayerStats = (player) => {
    setViewingPlayer(player);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setViewingPlayer(null);
    form.resetFields();
  };

  const handleSave = async (values) => {
    try {
      if (editingPlayer) {
        await updatePlayer(editingPlayer._id, values);
      } else {
        // console.log(values);
        addPlayer(values);
      }
      loadPlayers();
      handleCancel();
    } catch (error) {
      console.error("Error saving player:", error);
    }
  };

  // const handleDelete = (key) => {
  //   setPlayers(players.filter((player) => player.key !== key));
  // };

  const handleDelete = async (id) => {
    try {
      await deletePlayer(id);
      loadPlayers();
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  // Calculate the tournament summary statistics
  const getTournamentSummary = () => {
    if (players.length === 0) {
      return {
        overallRuns: 0,
        overallWickets: 0,
        highestRunScorer: null,
        highestWicketTaker: null,
      };
    }
    const overallRuns = players.reduce(
      (sum, player) => sum + player.totalRuns,
      0
    );
    const overallWickets = players.reduce(
      (sum, player) => sum + player.wickets,
      0
    );

    const highestRunScorer = players.reduce((highest, player) =>
      highest.totalRuns > player.totalRuns ? highest : player
    );

    const highestWicketTaker = players.reduce((highest, player) =>
      highest.wickets > player.wickets ? highest : player
    );

    return {
      overallRuns,
      overallWickets,
      highestRunScorer,
      highestWicketTaker,
    };
  };

  const { overallRuns, overallWickets, highestRunScorer, highestWicketTaker } =
    getTournamentSummary();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["home"]}
          onSelect={({ key }) => setSelectedTab(key)}
        >
          <Menu.Item key="home" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="players" icon={<TeamOutlined />}>
            Players
          </Menu.Item>
          <Menu.Item key="stats" icon={<InfoCircleOutlined />}>
            Player Stats
          </Menu.Item>
          <Menu.Item key="summary" icon={<BarChartOutlined />}>
            Tournament Summary
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{ background: "#001529", color: "#fff", textAlign: "center" }}
        >
          Admin Panel
        </Header>
        <Content style={{ padding: 20 }}>
          {selectedTab === "home" && (
            <Card>
              <Title level={2}>Welcome to the Admin Panel</Title>
              <p>
                Manage players, view statistics, and analyze tournament data.
              </p>
              {/* <Row gutter={16}>
                <Col span={12}>
                  <Card title="Tournament Overview" bordered={false}>
                    <p>
                      <strong>Total Runs:</strong> {overallRuns}
                    </p>
                    <p>
                      <strong>Total Wickets:</strong> {overallWickets}
                    </p>
                    <p>
                      <strong>Top Scorer:</strong>{" "}
                      {highestRunScorer ? highestRunScorer.name : "N/A"}
                    </p>
                    <p>
                      <strong>Best Bowler:</strong>{" "}
                      {highestWicketTaker ? highestWicketTaker.name : "N/A"}
                    </p>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="Quick Actions" bordered={false}>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => showModal()}
                      style={{ marginBottom: 10 }}
                    >
                      Add Player
                    </Button>
                    <Button
                      type="default"
                      icon={<TeamOutlined />}
                      onClick={() => setSelectedTab("players")}
                      style={{ marginBottom: 10 }}
                    >
                      Manage Players
                    </Button>
                    <Button
                      type="default"
                      icon={<BarChartOutlined />}
                      onClick={() => setSelectedTab("summary")}
                    >
                      View Summary
                    </Button>
                  </Card>
                </Col>
              </Row> */}
            </Card>
          )}
          {selectedTab === "players" && (
            <Card>
              <Title level={2}>Manage Players</Title>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => showModal()}
                style={{ marginBottom: 16 }}
              >
                Add Player
              </Button>
              <List
                dataSource={players}
                renderItem={(player) => (
                  <Card style={{ marginBottom: 10 }} key={player.key}>
                    <Title level={4}>{player.name}</Title>
                    <p>
                      <strong>University:</strong> {player.university}
                    </p>
                    <p>
                      <strong>Category:</strong> {player.category}
                    </p>
                    <Space>
                      <Button
                        type="primary"
                        icon={<InfoCircleOutlined />}
                        onClick={() => showPlayerStats(player)}
                      >
                        View
                      </Button>
                      <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => showModal(player)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="primary"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(player._id)}
                      >
                        Delete
                      </Button>
                    </Space>
                  </Card>
                )}
              />
            </Card>
          )}

          {selectedTab === "stats" && (
            <Card>
              <Title level={2}>Player Stats</Title>
              <List
                dataSource={players}
                renderItem={(player) => (
                  <Card style={{ marginBottom: 10 }} key={player.key}>
                    <Title level={4}>{player.name}</Title>
                    <p>
                      <strong>University:</strong> {player.university}
                    </p>
                    <p>
                      <strong>Category:</strong> {player.category}
                    </p>
                    <Button
                      type="primary"
                      icon={<InfoCircleOutlined />}
                      onClick={() => showPlayerStats(player)}
                    >
                      View Stats
                    </Button>
                  </Card>
                )}
              />
            </Card>
          )}

          {selectedTab === "summary" && (
            <Card>
              <Title level={2}>Tournament Summary</Title>
              <p>
                <strong>Overall Runs:</strong> {overallRuns}
              </p>
              <p>
                <strong>Overall Wickets:</strong> {overallWickets}
              </p>
              {/* <p><strong>Highest Run Scorer:</strong> {highestRunScorer.name} with {highestRunScorer.totalRuns} runs</p>
              <p><strong>Highest Wicket Taker:</strong> {highestWicketTaker.name} with {highestWicketTaker.wickets} wickets</p> */}
            </Card>
          )}
        </Content>
      </Layout>

      {/* Modal for viewing player stats */}
      {viewingPlayer && (
        <Modal
          title="Player Stats"
          open={!!viewingPlayer}
          onCancel={handleCancel}
          footer={null}
        >
          <Title level={4}>{viewingPlayer.name}</Title>
          <p>
            <strong>University:</strong> {viewingPlayer.university}
          </p>
          <p>
            <strong>Category:</strong> {viewingPlayer.category}
          </p>
          <p>
            <strong>Total Runs:</strong> {viewingPlayer.totalRuns}
          </p>
          <p>
            <strong>Balls Faced:</strong> {viewingPlayer.ballsFaced}
          </p>
          <p>
            <strong>Innings Played:</strong> {viewingPlayer.inningsPlayed}
          </p>
          <p>
            <strong>Wickets:</strong> {viewingPlayer.wickets}
          </p>
          <p>
            <strong>Overs Bowled:</strong> {viewingPlayer.oversBowled}
          </p>
          <p>
            <strong>Runs Conceded:</strong> {viewingPlayer.runsConceded}
          </p>
          <p>
            <strong>Value:</strong> {viewingPlayer.value}
          </p>
          {/* <p><strong>Points:</strong> {viewingPlayer.points}</p> */}
        </Modal>
      )}

      {/* Modal for adding/editing player */}
      <Modal
        title={editingPlayer ? "Edit Player" : "Add Player"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleSave}
          initialValues={editingPlayer || {}}
        >
          <Form.Item
            name="name"
            label="Player Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="university"
            label="University"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="Batsman">Batsman</Option>
              <Option value="Bowler">Bowler</Option>
              <Option value="All-Rounder">All-Rounder</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="totalRuns"
            label="Total Runs"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="ballsFaced"
            label="Balls Faced"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="inningsPlayed"
            label="Innings Played"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="wickets"
            label="Wickets"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="oversBowled"
            label="Overs Bowled"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="runsConceded"
            label="Runs Conceded"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            {editingPlayer ? "Update Player" : "Add Player"}
          </Button>
        </Form>
      </Modal>
    </Layout>
  );
};

export default AdminPanel;
