export const calculatePoints = (
  amount: number,
  level: "bronze" | "silver" | "gold" | "vip",
  campaignMultiplier = 1,
) => {
  const basePoints = Math.floor(amount);

  const levelMultipliers = {
    bronze: 1,
    silver: 1.2,
    gold: 1.5,
    vip: 2,
  };

  const multiplier = levelMultipliers[level] ?? 1;

  return Math.floor(basePoints * multiplier * campaignMultiplier);
};
