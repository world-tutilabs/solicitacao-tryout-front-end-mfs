import { http } from "~/services/config";
import Cookies from "js-cookie"

export default async function ({ redirect, app, store }) {

    
http.interceptors.request.use( (config) => {

  const tokenCookie = Cookies.get('auth._token.local');

  if(!tokenCookie){
    redirect(`http://185.209.179.253:7800`)
    return;
  }

  const [_, token ] = tokenCookie.split(" ");

   if (!token) {
    redirect(`http://185.209.179.253:7800`)
    return;
    }
 
   config.headers.Authorization = `Bearer ${token}`;
   return config;
 
   });
 
    try {
          
      await http.get("http://185.209.179.253:8400/verify_user");
          
      } catch (e) {
    
         Cookies.set('auth._token.local', false);
         Cookies.set('auth._token_expiration.local', false);
  
        return  redirect(`http://185.209.179.253:7800`)

      }

  }
