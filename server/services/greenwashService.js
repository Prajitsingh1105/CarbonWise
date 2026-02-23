export const detectGreenwashing = (
  claim,
  vehicle
) => {
  const keywords = [
    "zero emission",
    "carbon free",
    "eco friendly"
  ];

  const containsKeyword = keywords.some(k =>
    claim.toLowerCase().includes(k)
  );

  let confidenceScore = 10;
  let warning = false;
  let explanation = "Claim appears reasonable.";

  if (
    containsKeyword &&
    vehicle.manufacturingEmission > 5000
  ) {
    confidenceScore = 85;
    warning = true;
    explanation =
      "Marketing claim suggests zero impact, but manufacturing emissions are significant.";
  }

  return {
    confidenceScore,
    warning,
    explanation
  };
};