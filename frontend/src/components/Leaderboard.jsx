import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

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
      { rank: 1, teamName: 'Team A', points: 1200 },
      { rank: 2, teamName: 'Team B', points: 1100 },
      { rank: 3, teamName: 'Team C', points: 1000 },
      { rank: 4, teamName: 'Team D', points: 900 },
      { rank: 5, teamName: 'Team E', points: 800 },{ rank: 1, teamName: 'Team A', points: 1200 },
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

  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
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
    },
  ];

  return <Table dataSource={leaderboardData} columns={columns} rowKey="rank" />;
};

export default Leaderboard;
