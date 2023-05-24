export const isDevelopment = () => {
  const env = process.env.NODE_ENV;
  return env && env === 'development';
};

export const isproduction = () => {
  const env = process.env.NODE_ENV;
  return env && env === 'production';
};
