import axios from "axios"
import Cookies from "js-cookie"

export default async function ({ redirect }) {
  let user;

  await axios
    .post(
      `http://185.209.179.253:7900/session/verify`,
      {},
      { headers: { Authorization: `${Cookies.get("auth._token.local")}` } }
    )
    .then((res) => {
      user = res.data.user.nivel_de_acesso.descricao
      if (
        user === "pcp_acabamento" ||
        user === "pcp_injecao" ||
        user === "pcp"
      ) {
        return user;
      } else if (
        user === "eng_analista" ||
        user === "eng_admin" ||
        user === "eng"
      ) {
        return redirect('/')
      }
      
    })
    .catch((e) => {
      console.log(e)
      // return redirect('http://185.209.179.253:7800/login')
      
    });
}
