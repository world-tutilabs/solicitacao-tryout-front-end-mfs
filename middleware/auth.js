import { http } from "~/services/config";
import Cookies from "js-cookie"

export default async function ({ redirect, app, store }) {


http.interceptors.request.use( (config) => {

   const tokenCookie = Cookies.get('auth._token.local')

//  const tokenCookie = `${process.env.TOKEN_LOCAL}`
  console.log({tokenCookie});
  if(!tokenCookie){
    // redirect(`${process.env.ROUTER_REDIRECT_SYSTEM_USER}`)
    return;
  }

  // const [_, token ] = tokenCookie.split(" ");
  //  if (!token) {
  //   redirect(`${process.env.ROUTER_REDIRECT_SYSTEM_USER}`)
  //   return;
  //   }
    // console.log(token)

   config.headers.Authorization = `${tokenCookie}`;
   return config;

    });

    try {

     await http.get(`${process.env.ROUTER_VERIFY_USER}`);

     return;

      } catch (e) {
       console.error(e)
        //  Cookies.set('auth._token.local', false);
        //  Cookies.set('auth._token_expiration.local', false);
      //  return  redirect(`${process.env.ROUTER_REDIRECT_SYSTEM_USER}`)
      }

  }
