import { http } from "~/services/config";
import Cookies from "js-cookie"

export default async function ({ redirect, app, store }) {

    
http.interceptors.request.use( (config) => {
  // const tokenCookie = process.env.TOKEN_LOCAL
  
  
   const tokenCookie = Cookies.get('auth._token.local')
  
  if(!tokenCookie){
    redirect(`${process.env.ROUTER_REDIRECT_SYSTEM_USER}`)
    return;
  }

  const [_, token ] = tokenCookie.split(" ");
  
   if (!token) {
    redirect(`${process.env.ROUTER_REDIRECT_SYSTEM_USER}`)
    return;
    }
   config.headers.Authorization = `Bearer ${token}`;
   return config;
 
   });
 
    try {
   
     const role = await http.get(`${process.env.ROUTER_VERIFY_USER}`);
     if (role.data.nivel_de_acesso.descricao === "pcp_acabamento" 
     || role.data.nivel_de_acesso.descricao === "pcp_injecao"
     || role.data.nivel_de_acesso.descricao === "pcp"
     ) {
       return redirect(`${process.env.ROUTER_SYSTEM_PCP}`)
     }

     if (res.data.nivel_de_acesso.descricao === "eng_analista" || 
           res.data.nivel_de_acesso.descricao === "eng_admin" ||
           res.data.nivel_de_acesso.descricao === "eng"
           ) {
          return  
       } else {
         redirect(`${process.env.ROUTER_REDIRECT_SYSTEM_USER}`)
       }
      } catch (e) {
         Cookies.set('auth._token.local', false);
         Cookies.set('auth._token_expiration.local', false);
         return  redirect(`${process.env.ROUTER_REDIRECT_SYSTEM_USER}`)
      }

  }
