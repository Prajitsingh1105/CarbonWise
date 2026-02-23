export const calculateEmission = (
  vehicle,
  annualMileage,
  years
) => {
  const total =
    vehicle.manufacturingEmission +
    annualMileage * years * vehicle.emissionPerKm +
    vehicle.disposalEmission;

  return total;
};

export const calculateBreakEven = (
  v1,
  v2,
  annualMileage
) => {
  const m1 = v1.manufacturingEmission;
  const m2 = v2.manufacturingEmission;

  const perYear1 = annualMileage * v1.emissionPerKm;
  const perYear2 = annualMileage * v2.emissionPerKm;

  if (perYear1 === perYear2) return null;

  const year =
    (m2 - m1) / (perYear1 - perYear2);

  return year > 0 ? Math.ceil(year) : null;
};