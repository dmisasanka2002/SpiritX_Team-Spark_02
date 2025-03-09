// Player points calculation based on the formula

export const calculatePlayerPoints = (player) => {
  const battingStrikeRate = player.ballsFaced ? (player.runs / player.ballsFaced) * 100 : 0;
  const battingAverage = player.inningsPlayed ? player.runs / player.inningsPlayed : 0;
  const bowlingStrikeRate = player.wickets ? player.ballsBowled / player.wickets : 0;
  const economyRate = player.ballsBowled ? (player.runsConceded / player.ballsBowled) * 6 : 0;

  const playerPoints = ((battingStrikeRate / 5) + (battingAverage * 0.8)) + ((player.wickets ? 500 / bowlingStrikeRate : 0) + (140 / economyRate || 0))

  return playerPoints;
};

export const valueInRupees = (playerPoints) => {
    const value = (9 * playerPoints * 100) * 1000;
    const roundedValue = Math.round(value / 50000) * 50000;
    return roundedValue;
};
