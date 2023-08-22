
import Cookies from "js-cookie"
import axios from "axios"
import { httpUserSystem } from "~/services/users/usersSystem";
export default async function ({ redirect, app, store }) {

  const tokenCookie = Cookies.get('auth._token.local')

  try {

     await axios.post(`
     http://185.209.179.253:7900/session/verify`,
      {},
      { headers: { Authorization: `${Cookies.get('auth._token.local')}` } });

      const response = await httpUserSystem.post('/session/verify', {}, {
        headers: { Authorization: `${tokenCookie}` }
      })
  
      store.commit('setIsUser', response)


    return;

  } catch (e) {
    console.log(e);
     Cookies.set('auth._token.local', false);
     Cookies.set('auth._token_expiration.local', false);
    //  return  redirect(`http://185.209.179.253:7800/login`)

  }

}
