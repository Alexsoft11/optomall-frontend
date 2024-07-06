import Cookies from 'universal-cookie';



export const UseLogOut = () => {
    const cookies = new Cookies();
    if (!cookies.get('token')) return ''
    cookies.remove('token')
    window.location.href = '/'
}