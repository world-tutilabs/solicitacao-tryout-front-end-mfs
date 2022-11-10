import Cookies from "js-cookie"

export default async function ({ redirect }) {

  let user;
  try {
    const res = await axios.post(`${process.env.ROUTER_VERIFY_USER}`,
    {},
    { headers: { Authorization: `${Cookies.get('auth._token.local')}` } });

    user = res.data.user

  } catch (e) {
    // Cookies.set('auth._token.local', false);
    // Cookies.set('auth._token_expiration.local', false);
    // return redirect(`${process.env.ROUTER_REDIRECT_SYSTEM_USER}`)

  }

  if (user.nivel_de_acesso.descricao === "eng_analista" ||
      user.nivel_de_acesso.descricao === "eng_admin" ||
      user.nivel_de_acesso.descricao === "eng"
) {

  return user
}

console.log(user)
// } else {
//   return redirect(`${process.env.ROUTER_SYSTEM_PCP}`)

// }

}
