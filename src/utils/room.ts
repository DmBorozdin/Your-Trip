export const getAssessmentDescription = (rating: number) => {
  let description = "Excellent";
  if (rating < 2.5) {
    description = "Terrible";
  } else if (rating < 3.5) {
    description = "Poor";
  } else if (rating < 4) {
    description = `Average`;
  } else if (rating < 4.5) {
    description = `Very good`;
  }

  return description;
};
