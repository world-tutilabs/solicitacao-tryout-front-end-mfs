import axios from "axios";
import Cookies from "js-cookie";

export default async function ({ redirect }) {
  const tokenCookie =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYXRyaWN1bGEiOiIzODMxIiwiaWF0IjoxNjkyOTY3MDQyLCJleHAiOjE2OTI5OTU4NDIsInN1YiI6ImM3NTA5YTkxLWVmY2UtNGQ2MS1hOGE5LWIzNmVhNDQyNGEzYSJ9.-v1_xVyd24Thf__xNp22YaX6QkXY-mzidGKyrcD7yJE";
  let user;

  await axios
    .post(
      `
      localhost/session/verify`,
      {},
      { headers: { Authorization: `${tokenCookie}` } }
    )
    .then((res) => {
      user = res.data.user.nivel_de_acesso.descricao;
      console.log(user);
      if (user === "eng_analista" || user === "eng_admin" || user === "eng") {
        return user;
      } else if (
        user === "pcp_acabamento" ||
        user === "pcp_injecao" ||
        user === "pcp"
      ) {
        return redirect("/pcp/waiting");
      }
    })
    .catch((e) => {
      console.log(e);
      // return redirect('http://185.209.179.253:7800/login')
    });
}
