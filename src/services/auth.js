import api from './api';
import { AUTH } from '../constants/backend';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms';

const refreshToken = () => new Promise(async (resolve, reject) => {
  try {
    const response = await api.get(`${AUTH}/request-new-access-token/:refreshToken`)
    if (response.ok) {
      resolve(response.data)
    } else {
      reject(response.data)
    }
  } catch (e) {
    reject(e)
  }
});

const login = data => new Promise(async (resolve, reject) => {
  try {
    const response = await api.post(`${AUTH}/login`, data)
    if (response.ok) {
      resolve(response.data)
    } else {
      reject(response.data)
    }
  } catch (e) {
    reject(e)
  }
});

const authChanged = () => {
  return false;
};

export {
  refreshToken,
  login,
  authChanged,
}