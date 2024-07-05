import { useRouter } from 'next/dist/client/router';
import Cookies from 'universal-cookie';



export const UseLogOut = () => {
    const rout = useRouter();
    const cookies = new Cookies();
    if (!cookies.get('token')) return ''
    cookies.remove('token')
    rout.push('/auth')
}