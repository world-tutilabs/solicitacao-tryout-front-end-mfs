import { http } from "~/services/config";

export default async function ({ redirect }) {

  let user;
  try {

    const res = await http.post(process.env.ROUTER_VERIFY_USER);
    user = res.data.user

  } catch (e) {
    // Cookies.set('auth._token.local', false);
    // Cookies.set('auth._token_expiration.local', false);
    return redirect(`${process.env.ROUTER_REDIRECT_SYSTEM_USER}`)

  }
  console.log({user});

  if (user.nivel_de_acesso.descricao === "eng_analista" ||
      user.nivel_de_acesso.descricao === "eng_admin" ||
      user.nivel_de_acesso.descricao === "eng"
) {

  return user

} else {
  return redirect(`${process.env.ROUTER_SYSTEM_PCP}`)


}

}
