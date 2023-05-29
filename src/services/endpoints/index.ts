import { isDevelopment } from '../../utils/environments';

const apiUrlDev = 'https://api-dev.hallify.app/v2/';
const apiUrlProd = 'https://api.hallify.app/v2/';
const baseUrl = isDevelopment() ? apiUrlDev : apiUrlProd;

const endpoints = {
  baseUrl,
};

export default endpoints;
