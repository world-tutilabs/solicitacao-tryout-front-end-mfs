import { http } from "~/services/config";

export default async function({redirect}){
  let user;
    try {
       const res =  await http.post(process.env.ROUTER_VERIFY_USER);
        user = res.data.user
      // console.log(res);

        } catch (e) {
         //   Cookies.set('auth._token.local', false);
         //   Cookies.set('auth._token_expiration.local', false);
          return  redirect(`${process.env.ROUTER_REDIRECT_SYSTEM_USER}`)
      // return redirect(`http://192.168.2.9:8500/`)

        }


        if (user.nivel_de_acesso.descricao === "pcp_acabamento"
        || user.nivel_de_acesso.descricao === "pcp_injecao"
        || user.nivel_de_acesso.descricao === "pcp") {
           return user;
        } else if (user.nivel_de_acesso.descricao === "eng_analista" ||
        user.nivel_de_acesso.descricao === "eng_admin" ||
        user.nivel_de_acesso.descricao === "eng"
      ) {
       return redirect(`${process.env.ROUTER_SYSTEM_ENG}`)

      } else {
         return   redirect(`${process.env.ROUTER_REDIRECT_SYSTEM_USER}`)

        }

}
