export const formatTIN = (value: string): string => {
  const raw = value.replace(/\D/g, '').slice(0, 9); // keep only 9 digits

  if (raw.length <= 2) return raw;

  // Example format: "12-3456789"
  return `${raw.slice(0, 2)}-${raw.slice(2)}`;
};
