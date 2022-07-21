import { http } from "~/services/config";

export default async function ({ redirect, app, store }) {

    
http.interceptors.request.use( (config) => {

  const tokenCookie = app.$cookies.get('auth._token.local')
  


  if(!tokenCookie){
    redirect(`${process.env.ROUTER_REDIRECT}`)
  }

  const [_, token ] = tokenCookie.split(" ");

   if (!token) {
    redirect(`${process.env.ROUTER_REDIRECT}`)
    return;
    }
 
   config.headers.Authorization = `Bearer ${token}`;
   return config;
 
   });
 

    try {
          
          const response = await http.get("http://185.209.179.253:8400/verify_user");
       console.log(response);
       
      } catch (e) {
    
        app.$cookies.set('auth._token.local', false);
        app.$cookies.set('auth._token_expiration.local', false);
  
        return  redirect(`${process.env.ROUTER_REDIRECT}`)

      }

  }