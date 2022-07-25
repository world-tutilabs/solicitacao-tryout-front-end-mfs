import { http } from "~/services/config";

export default async function({redirect}){
    try {
      console.log(process.env.ROUTER_VERIFY_USER)
       const res =  await http.get(process.env.ROUTER_VERIFY_USER);
      
       if (res.data.nivel_de_acesso.descricao === "pcp_acabamento" 
       || res.data.nivel_de_acesso.descricao === "pcp_injecao") {
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