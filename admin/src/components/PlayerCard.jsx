import React from 'react';
import { Card } from 'antd';
import { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';

const { Meta } = Card;

const PlayerCard = ({ player }) => {
  const { addPlayerToTeam } = useContext(PlayerContext);
  
  const handleAddPlayer = () => {
    addPlayerToTeam(player);
  };

  return (
    <Card
      hoverable
      cover={<img alt={player.name} src={player.image} />}
      actions={[
        <span onClick={handleAddPlayer}>Add to Team</span>
      ]}
    >
      <Meta title={player.name} description={`Points: ${player.points}`} />
    </Card>
  );
};

export default PlayerCard;
