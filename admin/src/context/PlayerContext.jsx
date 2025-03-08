import React, { createContext, useState } from 'react';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [team, setTeam] = useState([]);
  const [budget, setBudget] = useState(9000000);  // Rs. 9,000,000

  const addPlayerToTeam = (player) => {
    if (budget >= player.cost && team.length < 11) {
      setTeam([...team, player]);
      setBudget(budget - player.cost);
    } else {
      alert('Not enough budget or team already full.');
    }
  };

  return (
    <PlayerContext.Provider value={{ team, addPlayerToTeam, budget }}>
      {children}
    </PlayerContext.Provider>
  );
};
