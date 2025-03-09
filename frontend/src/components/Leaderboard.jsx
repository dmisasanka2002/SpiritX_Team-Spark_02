import React, { useEffect, useState } from 'react';
import { Table, Typography, Layout, Card } from 'antd';
import { ConfigProvider } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Content } = Layout;

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    // Sample hardcoded leaderboard data
    const sampleData = [
      { rank: 1, teamName: 'Team A', points: 1200 },
      { rank: 2, teamName: 'Team B', points: 1100 },
      { rank: 3, teamName: 'Team C', points: 1000 },
      { rank: 4, teamName: 'Team D', points: 900 },
      { rank: 5, teamName: 'Team E', points: 800 },
      
    ];

    // Set hardcoded data to state
    setLeaderboardData(sampleData);

    // Uncomment below to enable API call when ready
    // const fetchLeaderboard = async () => {
    //   try {
    //     const response = await axios.get('/api/leaderboard');
    //     setLeaderboardData(response.data);
    //   } catch (error) {
    //     console.error('Error fetching leaderboard:', error);
    //   }
    // };
    // fetchLeaderboard();
  }, []);

  const getRankStyle = (rank) => {
    const baseStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      margin: '0 auto',
      fontWeight: rank <= 3 ? 'bold' : 'normal',
      color: rank <= 3 ? '#000' : '#fff',
      boxShadow: rank <= 3 ? '0 2px 8px rgba(255, 153, 0, 0.6)' : 'none',
    };

    if (rank === 1) {
      return {
        ...baseStyle,
        background: 'linear-gradient(135deg, #FFD700, #FF9900)',
      };
    } else if (rank === 2) {
      return {
        ...baseStyle,
        background: 'linear-gradient(135deg, #C0C0C0, #A0A0A0)',
      };
    } else if (rank === 3) {
      return {
        ...baseStyle,
        background: 'linear-gradient(135deg, #CD7F32, #8B4513)',
      };
    }
    return baseStyle;
  };

  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      align: 'center',
      render: (rank) => <div style={getRankStyle(rank)}>{rank}</div>,
    },
    {
      title: 'Team Name',
      dataIndex: 'teamName',
      key: 'teamName',
    },
    {
      title: 'Points',
      dataIndex: 'points',
      key: 'points',
      align: 'right',
      render: (points, record) => (
        <span style={{ 
          color: record.rank <= 3 ? '#FF9900' : 'white', 
          fontWeight: record.rank <= 3 ? 'bold' : 'normal' 
        }}>
          {points}
        </span>
      ),
    },
  ];

  // Create custom pagination icons with white color
  const itemRender = (_, type, originalElement) => {
    if (type === 'prev') {
      return <LeftOutlined style={{ color: 'white' }} />;
    }
    if (type === 'next') {
      return <RightOutlined style={{ color: 'white' }} />;
    }
    if (type === 'page') {
      return (
        <div style={{ 
          color: 'white',
          borderRadius: '2px',
        }}>
          {originalElement}
        </div>
      );
    }
    return originalElement;
  };

  const customTheme = {
    token: {
      colorPrimary: '#FF9900',
      colorBgContainer: 'rgba(0, 0, 0, 0.7)',
      colorText: 'white',
      colorBorderSecondary: '#FF9900',
    },
    components: {
      Table: {
        colorText: 'white',
        headerBg: 'rgba(40, 40, 40, 0.7)',
        headerColor: '#FF9900',
        rowHoverBg: 'rgba(50, 50, 50, 0.8)',
        borderColor: 'rgba(255, 153, 0, 0.3)',
      },
      Card: {
        colorBgContainer: 'rgba(0, 0, 0, 0.7)',
        colorBorderSecondary: '#FF9900',
      },
      Pagination: {
        colorText: 'white',
        colorPrimary: '#FF9900',
        colorPrimaryHover: '#FFB700',
        colorBgContainer: 'rgba(40, 40, 40, 0.7)',
      },
    },
  };

  return (
    <ConfigProvider theme={customTheme}>
      <Layout style={{ 
        background: 'transparent',
        position: 'relative',
        padding: '20px'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          zIndex: -2,
        }} />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          zIndex: -1,
        }} />
        
        <Content>
          <Card variant={false} style={{ 
            background: 'rgba(0, 0, 0, 0.7)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
            borderRadius: '10px',
            overflow: 'hidden',
          }}>
            <Title level={2} style={{ 
              color: '#FF9900', 
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              Tournament Leaderboard
            </Title>
            
            <Table 
              dataSource={leaderboardData} 
              columns={columns} 
              rowKey="rank"
              pagination={{ 
                pageSize: 10,
                itemRender: itemRender,
                style: { 
                  color: 'white',
                  '& .ant-pagination-item-link': {
                    color: 'white',
                    backgroundColor: 'rgba(40, 40, 40, 0.7)',
                    border: '1px solid #FF9900',
                  }
                }
              }}
              style={{
                background: 'transparent'
              }}
              onRow={(record) => ({
                style: {
                  background: record.rank === 1 ? 'linear-gradient(to right, rgba(255, 153, 0, 0.2), transparent)' : 'transparent',
                },
              })}
            />
          </Card>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default Leaderboard;