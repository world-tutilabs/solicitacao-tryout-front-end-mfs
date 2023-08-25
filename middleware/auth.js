import Cookies from "js-cookie";
import axios from "axios";
import { httpUserSystem } from "~/services/users/usersSystem";
export default async function ({ redirect, app, store }) {
  // const tokenCookie = Cookies.get('auth._token.local')
  const tokenCookie =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYXRyaWN1bGEiOiIzODMxIiwiaWF0IjoxNjkyOTY3MDQyLCJleHAiOjE2OTI5OTU4NDIsInN1YiI6ImM3NTA5YTkxLWVmY2UtNGQ2MS1hOGE5LWIzNmVhNDQyNGEzYSJ9.-v1_xVyd24Thf__xNp22YaX6QkXY-mzidGKyrcD7yJE";

  try {
    await axios.post(
      `
     localhost/session/verify`,
      {},
      { headers: { Authorization: `${tokenCookie}` } }
    );

    const response = await httpUserSystem.post(
      "/session/verify",
      {},
      {
        headers: { Authorization: `${tokenCookie}` },
      }
    );

    store.commit("setIsUser", response);

    return;
  } catch (e) {
    console.log(e);
    //  Cookies.set('auth._token.local', false);
    //  Cookies.set('auth._token_expiration.local', false);
    //  return  redirect(`http://185.209.179.253:7800/login`)
  }
}
