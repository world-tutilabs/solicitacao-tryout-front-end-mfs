
import Cookies from "js-cookie"
import axios from "axios"
import { httpUserSystem } from "~/services/users/usersSystem";
export default async function ({ redirect, app, store }) {

  const tokenCookie = Cookies.get('auth._token.local')

  try {

     await axios.post(`${process.env.ROUTER_VERIFY_USER}`,
      {},
      { headers: { Authorization: `${Cookies.get('auth._token.local')}` } });

      const response = await httpUserSystem.post('/session/verify', {}, {
        headers: { Authorization: `${tokenCookie}` }
      })
  
      store.commit('setIsUser', response)


    return;

  } catch (e) {
    console.log(e);
    //  Cookies.set('auth._token.local', false);
    //  Cookies.set('auth._token_expiration.local', false);
    //  return  redirect(`${process.env.ROUTER_REDIRECT_SYSTEM_USER}`)
    // return redirect(`http://192.168.2.9:8500/`)

  }

}
