import React, { useState, useEffect, useContext } from 'react';
import { Button, Row, Col, notification } from 'antd';
import PlayerCard from '../components/PlayerCard';
import { PlayerContext } from '../context/PlayerContext';
import axios from 'axios';

const TeamSelection = () => {
  const [players, setPlayers] = useState([]);
  const { team, setTeam, budget } = useContext(PlayerContext);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get('/api/players');
        setPlayers(response.data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };
    fetchPlayers();
  }, []);

  const handleSaveTeam = async () => {
    if (team.length === 11) {
      try {
        await axios.post('/api/team', { team });
        notification.success({ message: 'Team saved successfully!' });
      } catch (error) {
        notification.error({ message: 'Error saving team' });
      }
    } else {
      notification.error({ message: 'You must select 11 players.' });
    }
  };

  return (
    <div>
      <h2>Team Selection</h2>
      <p>Budget remaining: Rs. {budget}</p>
      <Row gutter={16}>
        {players.map(player => (
          <Col span={8} key={player.id}>
            <PlayerCard player={player} />
          </Col>
        ))}
      </Row>
      <Button type="primary" onClick={handleSaveTeam}>Save Team</Button>
    </div>
  );
};

export default TeamSelection;
