export const formatLengthFiedl = (value: string, length: number): string => {
  // Just limit length, do NOT remove characters
  return value.slice(0, length);
};
