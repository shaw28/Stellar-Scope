import axios from 'axios';

const BASE_URL = 'https://stellarscope-sm5o.onrender.com/api';

export const getAPOD = () => axios.get('${BASE_URL}/apod');
export const getMarsPhotos = (params) => axios.get('${BASE_URL}/mars', { params });
export const getAsteroids = (params) => axios.get('${BASE_URL}/asteroids', { params });
export const searchMedia = (params) => axios.get('${BASE_URL}/media', { params });
export const getEONET = () => axios.get('${BASE_URL}/eonet');
export const getDONKI = (params) => axios.get('${BASE_URL}/donki', { params });
