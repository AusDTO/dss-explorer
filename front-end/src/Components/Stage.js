export const CalculateStageColor = (stage, defaultColor = null) => {
  if (stage === "Discovery") return "olive";
  if (stage === "Alpha") return "green";
  if (stage === "Beta") return "teal";
  if (stage === "Live") return "blue";
  return defaultColor;
};

export const CalculateStageText = (stage, defaultValue = null) => {
  if (stage === "Discovery") return "Discovery";
  if (stage === "Alpha") return "Alpha";
  if (stage === "Beta") return "Beta";
  if (stage === "Live") return "Live";
  return defaultValue;
};
