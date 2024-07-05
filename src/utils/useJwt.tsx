import Cookies from 'universal-cookie';

export const useJwt = () => {
  const cookies = new Cookies();
  return cookies.get('token') || '';
};
