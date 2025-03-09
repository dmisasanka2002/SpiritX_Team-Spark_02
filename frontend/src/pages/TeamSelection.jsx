import React, { useState, useEffect } from "react"; 
import { Card, Button, Select, Typography, List, Row, Col, ConfigProvider, theme } from "antd"; 
import { UserOutlined, TrophyOutlined } from '@ant-design/icons';
import { fetchPlayers } from "../api/player"; // Mock API for players 
 
const { Option } = Select; 
const { Title, Text } = Typography; 
 
const TeamSelection = ({ 
  team, 
  setTeam, 
  remainingBudget, 
  setRemainingBudget,
  setSelectedTab 
}) => { 
  const [players, setPlayers] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState("Batsman"); 
 
  useEffect(() => { 
    loadPlayers(); 
  }, []); 
 
  const loadPlayers = async () => { 
    const data = await fetchPlayers(); 
    console.log(data)
    setPlayers(data); 
  }; 
 
  const handlePlayerSelect = (player) => { 
    if (team.length < 11 ) { 
      if (team.some((p) => p._id === player._id)) { 
        alert("Player already in your team!"); 
        return; 
      } 
      else if (remainingBudget < player.valuePrice) {
        alert("Insufficient budget to select this player!");
        return;
      }
      setTeam([...team, player]); 
      setRemainingBudget(remainingBudget - player.valuePrice); 
    } else {
      alert("You can select a maximum of 11 players!");
    }
  }; 

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
      Select: {
        colorBorder: '#FF9900',
        controlItemBgHover: 'rgba(255, 153, 0, 0.1)',
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
              boxShadow: '0 4px 12px rgba(255, 153, 0, 0.2)',
            }}
          >
            <Title
              level={2}
              style={{
                color: '#FF9900',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                marginBottom: 24,
                textAlign: 'center',
              }}
            >
              SELECT YOUR DREAM TEAM
            </Title>
            
            {/* Budget Display */}
            <Card
              size="small"
              style={{
                marginBottom: 16,
                backgroundColor: 'rgba(50, 50, 50, 0.7)',
                borderLeft: '4px solid #FF9900',
              }}
            >
              <Text style={{ color: 'white' }}>
                Remaining Budget: <Text strong style={{ color: '#FF9900' }}>${remainingBudget}</Text>
              </Text>
            </Card>
            
            <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
              <Col xs={24} sm={12} md={8}>
                <Button
                  block
                  type="primary"
                  onClick={() => setSelectedTab("team")}
                  icon={<UserOutlined />}
                  style={{
                    background: 'linear-gradient(135deg, #FF9900, #F5811E)',
                    fontWeight: 600,
                    height: '40px',
                  }}
                >
                  View My Team ({team.length}/11)
                </Button>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Select
                  defaultValue="Batsman"
                  onChange={setSelectedCategory}
                  style={{ width: '100%' }}
                  dropdownStyle={{ background: '#2a2a2a' }}
                >
                  <Option value="Batsman">Batsman</Option>
                  <Option value="Bowler">Bowler</Option>
                  <Option value="All-Rounder">All-Rounder</Option>
                </Select>
              </Col>
            </Row>
      
            <List
              itemLayout="horizontal"
              dataSource={players.filter(
                (player) => player.category === selectedCategory
              )}
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
                      type="primary"
                      onClick={() => handlePlayerSelect(player)}
                      disabled={remainingBudget < player.value || team.length >= 11}
                      style={{
                        background: 'linear-gradient(135deg, #FF9900, #F5811E)',
                        border: 'none',
                      }}
                    >
                      Select (Rs. {player.valuePrice})
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<TrophyOutlined style={{ color: '#FF9900', fontSize: '24px' }} />}
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
                      <Text style={{ color: '#b0b0b0' }}>
                        University: {player.university} | Rating: {player.rating || 'N/A'}
                      </Text>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </div>
    </ConfigProvider>
  ); 
}; 
 
export default TeamSelection;