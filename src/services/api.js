import { create } from 'apisauce'
import { BACKEND_URL } from '../constants/backend';

const api = create({
    baseURL: BACKEND_URL,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Referrer-Policy': 'no-referrer',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
    timeout: 40000
})

api.axiosInstance.interceptors.request.use(async (config) => {
  return config;
}, function (error) {
  return Promise.reject(error);
});


api.axiosInstance.interceptors.response.use(undefined, async (error) => {
  const errorResponse =  error.response;
  if (errorResponse && errorResponse.status === 401 && !!error.config &&  typeof error.config.canRetry  === 'undefined' ) {
    console.log('Error Response');
  }
  throw error;
})

export default api