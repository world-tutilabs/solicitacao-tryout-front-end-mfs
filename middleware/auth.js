import { http } from "~/services/config";
import Cookies from "js-cookie"

export default async function ({ redirect, app, store }) {

    
http.interceptors.request.use( (config) => {
   const tokenCookie = Cookies.get('auth._token.local')
    
  if(!tokenCookie){
    redirect(`${process.env.ROUTER_REDIRECT_SYSTEM_USER}`)
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
   
     const role = await http.get(`${process.env.ROUTER_VERIFY_USER}`);
     if (role.data.nivel_de_acesso.descricao === "pcp_acabamento" 
     || role.data.nivel_de_acesso.descricao === "pcp_injecao"
     || role.data.nivel_de_acesso.descricao === "pcp"
     ) {
       return redirect(`${process.env.ROUTER_SYSTEM_PCP}`)
     }
    
     if (role.data.nivel_de_acesso.descricao === "eng_analista" || 
        role.data.nivel_de_acesso.descricao === "eng_admin" ||
        role.data.nivel_de_acesso.descricao === "eng"
           ) {
          
          return  
       } else {
         redirect(`${process.env.ROUTER_REDIRECT_SYSTEM_USER}`)
       }
      } catch (e) {
       console.error(e)
        //  Cookies.set('auth._token.local', false);
        //  Cookies.set('auth._token_expiration.local', false);
        //  return  redirect(`${process.env.ROUTER_REDIRECT_SYSTEM_USER}`)
      }

  }
