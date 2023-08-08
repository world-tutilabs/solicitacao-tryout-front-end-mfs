import { http } from "~/services/config-rrim";
import axios from "axios"
import Cookies from "js-cookie"

export default async function ({ redirect }) {
  let user;

  await axios
    .post(
      `${process.env.ROUTER_VERIFY_USER}`,
      {},
      { headers: { Authorization: `${Cookies.get("auth._token.local")}` } }
    )
    .then((res) => {
      user = res.data.user;
      if (
        user.nivel_de_acesso.descricao === "pcp_acabamento" ||
        user.nivel_de_acesso.descricao === "pcp_injecao" ||
        user.nivel_de_acesso.descricao === "pcp"
      ) {
        return user;
      } else if (
        user.nivel_de_acesso.descricao === "eng_analista" ||
        user.nivel_de_acesso.descricao === "eng_admin" ||
        user.nivel_de_acesso.descricao === "eng"
      ) {
        return redirect(`${process.env.ROUTER_SYSTEM_ENG}`);
      } else {
        return redirect(`${process.env.ROUTER_REDIRECT_SYSTEM_USER}`);
      }
    })
    .catch((e) => {
        // Cookies.set('auth._token.local', false);
        // Cookies.set('auth._token_expiration.local', false);
      // return redirect(`http://192.168.2.9:8500/`)
      console.log(e);
      // return redirect(`${process.env.ROUTER_REDIRECT_SYSTEM_USER}`);
    });
}
