
import axios from "axios"
import Cookies from "js-cookie"

export default async function ({ redirect }) {

  let user;

  await axios
    .post(
      `
      http://185.209.179.253:7900/session/verify`,
      {},
      { headers: { Authorization: `${Cookies.get("auth._token.local")}` } }
    )
    .then((res) => {
      user = res.data.user.nivel_de_acesso.descricao
      console.log(user)
      if (user === "eng_analista" ||
        user === "eng_admin" ||
        user === "eng"
      ) {

        return user

      } else if (
        user === "pcp_acabamento" ||
        user === "pcp_injecao" ||
        user === "pcp"
      ) {

        return redirect('/pcp/waiting')

      }

    }).catch((e) => {
      console.log(e);
      // return redirect('http://185.209.179.253:7800/login')
    })



}
