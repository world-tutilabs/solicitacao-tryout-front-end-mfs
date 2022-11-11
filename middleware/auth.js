
import Cookies from "js-cookie"
import axios from "axios"
export default async function ({ redirect, app, store }) {

    try {

     await axios.post(`${process.env.ROUTER_VERIFY_USER}`,
        {},
        { headers: { Authorization: `${Cookies.get('auth._token.local')}` } });

     return;

      } catch (e) {
        console.log(e);
        //  Cookies.set('auth._token.local', false);
        //  Cookies.set('auth._token_expiration.local', false);
      //  return  redirect(`${process.env.ROUTER_REDIRECT_SYSTEM_USER}`)
      // return redirect(`http://192.168.2.9:8500/`)

      }

  }
