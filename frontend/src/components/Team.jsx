import React from "react";
import { Card, Button, Typography, List, Row, Col, Avatar, Empty, Divider, Tag, Statistic } from "antd";
import { UserOutlined, DeleteOutlined, ArrowLeftOutlined, TrophyOutlined } from '@ant-design/icons';
import { ConfigProvider, theme } from 'antd';

const { Title, Text } = Typography;

const Team = ({ 
  team, 
  setTeam, 
  remainingBudget, 
  setRemainingBudget,
  setSelectedTab 
}) => {
  // Function to handle player removal
  const handlePlayerRemove = (playerId) => {
    const playerToRemove = team.find((p) => p._id === playerId);
    if (playerToRemove) {
      setRemainingBudget(remainingBudget + playerToRemove.value);
      setTeam(team.filter((p) => p._id !== playerId));
    }
  };

  // Calculate team stats
  const getTotalPoints = () => {
    return team.reduce((total, player) => total + (player.rating || 0), 0);
  };

  const getTeamSize = () => team.length;

  // Count players by category
  const getCategoryCounts = () => {
    const counts = {
      "Batsman": 0,
      "Bowler": 0,
      "All-Rounder": 0
    };
    
    team.forEach(player => {
      if (counts.hasOwnProperty(player.category)) {
        counts[player.category]++;
      }
    });
    
    return counts;
  };
  
  const categoryCounts = getCategoryCounts();

  // Custom theme configuration for Ant Design
  const customTheme = {
    algorithm: theme.darkAlgorithm,
    token: {
      colorPrimary: '#FF9900',
      colorLink: '#FF9900',
      borderRadius: 6,
      colorBgContainer: 'rgba(30, 30, 30, 0.9)',
    },
    components: {
      Button: {
        colorPrimary: '#FF9900',
        colorPrimaryHover: '#FFB443',
        colorPrimaryActive: '#F5811E',
      },
      Card: {
        colorBorderSecondary: '#FF9900',
        boxShadowCard: '0 4px 12px rgba(0, 0, 0, 0.2)',
      },
      List: {
        colorSplit: '#333333',
      }
    },
  };

  return (
    <ConfigProvider theme={customTheme}>
      <div style={{ 
        background: 'url("/images/cricket-stadium-dark.jpg") center/cover no-repeat',
        minHeight: '100vh',
        padding: '20px',
        position: 'relative',
      }}>
        {/* Dark overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 0
        }} />
        
        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
          <Card
            bordered
            style={{
              borderColor: '#FF9900',
              backgroundColor: 'rgba(30, 30, 30, 0.9)',
              boxShadow: '0 4px 12px rgba(255, 153, 0, 0.2)',
            }}
          >
            <Button 
              type="primary" 
              icon={<ArrowLeftOutlined />}
              onClick={() => setSelectedTab("selectTeam")} 
              style={{
                marginBottom: 16,
                background: 'linear-gradient(135deg, #FF9900, #F5811E)',
                border: 'none',
              }}
            >
              Back to Selection
            </Button>
            
            <Title 
              level={2}
              style={{
                color: '#FF9900',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                marginBottom: 24,
                textAlign: 'center',
              }}
            >
              YOUR TEAM
            </Title>
            
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
              <Col xs={24} sm={8}>
                <Card
                  size="small"
                  style={{
                    backgroundColor: 'rgba(50, 50, 50, 0.7)',
                    borderLeft: '4px solid #FF9900',
                    height: '100%',
                  }}
                >
                  <Statistic 
                    title={<Text style={{ color: '#b0b0b0' }}>Players Selected</Text>}
                    value={`${getTeamSize()}/11`} 
                    valueStyle={{ color: '#FF9900', fontWeight: 'bold' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card
                  size="small"
                  style={{
                    backgroundColor: 'rgba(50, 50, 50, 0.7)',
                    borderLeft: '4px solid #FF9900',
                    height: '100%',
                  }}
                >
                  <Statistic 
                    title={<Text style={{ color: '#b0b0b0' }}>Total Points</Text>}
                    value={getTotalPoints()} 
                    valueStyle={{ color: '#FF9900', fontWeight: 'bold' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card
                  size="small"
                  style={{
                    backgroundColor: 'rgba(50, 50, 50, 0.7)',
                    borderLeft: '4px solid #FF9900',
                    height: '100%',
                  }}
                >
                  <Statistic 
                    title={<Text style={{ color: '#b0b0b0' }}>Remaining Budget</Text>}
                    value={remainingBudget} 
                    prefix="Rs. "
                    valueStyle={{ color: '#FF9900', fontWeight: 'bold' }}
                  />
                </Card>
              </Col>
            </Row>
            
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
              <Col xs={24} sm={8}>
                <Tag color="blue" style={{ fontSize: '14px' }}>
                  Batsmen: {categoryCounts["Batsman"]}
                </Tag>
              </Col>
              <Col xs={24} sm={8}>
                <Tag color="green" style={{ fontSize: '14px' }}>
                  Bowlers: {categoryCounts["Bowler"]}
                </Tag>
              </Col>
              <Col xs={24} sm={8}>
                <Tag color="purple" style={{ fontSize: '14px' }}>
                  All-Rounders: {categoryCounts["All-Rounder"]}
                </Tag>
              </Col>
            </Row>
            
            <Divider style={{ borderColor: '#333', margin: '16px 0' }} />
            
            <List
              dataSource={team}
              renderItem={(player) => (
                <List.Item
                  style={{
                    borderBottom: '1px solid #333',
                    padding: '16px 0',
                    transition: 'background-color 0.3s',
                    borderRadius: '4px',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 153, 0, 0.1)',
                    },
                  }}
                  actions={[
                    <Button
                      danger
                      type="primary"
                      onClick={() => handlePlayerRemove(player._id)}
                      icon={<DeleteOutlined />}
                      style={{
                        background: 'linear-gradient(135deg, #E74C3C, #C0392B)',
                        border: 'none',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      Remove
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar 
                        icon={<UserOutlined />} 
                        style={{ 
                          backgroundColor: 'rgba(255, 153, 0, 0.7)',
                          color: '#1A1A1A'
                        }} 
                      />
                    }
                    title={
                      <Row>
                        <Col flex="auto">
                          <Text style={{ color: 'white', fontWeight: 600 }}>
                            {player.name}
                          </Text>
                        </Col>
                        <Col>
                          <Text style={{
                            backgroundColor: 'rgba(255, 153, 0, 0.2)',
                            color: '#FF9900',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            marginLeft: '8px',
                          }}>
                            {player.category}
                          </Text>
                        </Col>
                      </Row>
                    }
                    description={
                      <Row>
                        <Col xs={24} md={12}>
                          <Text style={{ color: '#b0b0b0' }}>
                            University: {player.university}
                          </Text>
                        </Col>
                        <Col xs={24} md={12}>
                          <Text style={{ color: '#b0b0b0' }}>
                            Value: <Text strong style={{ color: '#FF9900' }}>Rs. {player.value}</Text>
                          </Text>
                        </Col>
                      </Row>
                    }
                  />
                </List.Item>
              )}
              locale={{
                emptyText: (
                  <Empty 
                    image={Empty.PRESENTED_IMAGE_SIMPLE} 
                    description={
                      <div style={{ textAlign: 'center', padding: '30px 0' }}>
                        <TrophyOutlined style={{ fontSize: '32px', color: '#FF9900', marginBottom: '16px' }} />
                        <Text style={{ color: '#b0b0b0', display: 'block' }}>
                          No players selected yet
                        </Text>
                        <Button 
                          type="primary" 
                          onClick={() => setSelectedTab("selection")} 
                          style={{
                            marginTop: '16px',
                            background: 'linear-gradient(135deg, #FF9900, #F5811E)',
                            border: 'none',
                          }}
                        >
                          Select Players
                        </Button>
                      </div>
                    } 
                  />
                )
              }}
            />
          </Card>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Team;