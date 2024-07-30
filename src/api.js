import axios from 'axios';

const api = axios.create({
  baseURL: 'https://lab.pixel6.co/api',
});

export const verifyPAN = async (panNumber) => {
  const response = await api.post('/verify-pan.php', { panNumber });
  return response.data;
};

export const getPostcodeDetails = async (postcode) => {
  const response = await api.post('/get-postcode-details.php', { postcode });
  return response.data;
};