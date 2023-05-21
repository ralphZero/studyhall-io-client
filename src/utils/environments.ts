export const isDevelopment = () => {
  const env = process.env.NODE_ENV;
  return env && env === 'development';
};
