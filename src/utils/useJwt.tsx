import Cookies from 'universal-cookie';

export const useJwt = () => {
    const cookies = new Cookies();
    if (!cookies.get('token')) return ''
    const token = Buffer.from(cookies.get('token'), 'base64').toString('utf-8')
    return token
}