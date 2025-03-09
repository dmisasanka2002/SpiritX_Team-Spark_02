// Player points calculation based on the formula

export const calculatePlayerPoints = async (player) => {
  console.log("player", player);
  const battingStrikeRate = player.ballsFaced ? (player.totalRuns / player.ballsFaced) * 100 : 0;
  const battingAverage = player.inningsPlayed ? player.totalRuns / player.inningsPlayed : 0;
  const bowlingStrikeRate = player.wickets ? (player.oversBowled) / player.wickets : 0;
  const economyRate = player.oversBowled ? (player.runsConceded / (player.oversBowled)) * 6 : 0;

  const playerPoints = ((battingStrikeRate / 5) + (battingAverage * 0.8)) + ((player.wickets ? 500 / bowlingStrikeRate : 0) + (140 / economyRate || 0))
  // console.log("playerPoints",playerPoints)

  return playerPoints;
};

export const valueInRupees = async (playerPoints) => {
    const value = (9 * playerPoints * 100) * 1000;
    const roundedValue = Math.round(value / 50000) * 50000;

    // console.log('Value in Rupees:', roundedValue);
    return roundedValue;
};
