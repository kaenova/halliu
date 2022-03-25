// Only use this on client side
import axios from 'axios'
import jsCookie from 'js-cookie';

const api = () => {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND,
  })
  return api
}

const authApi = () => {
  const ax = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND,
  })
  let token = jsCookie.get('auth')
  ax.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  ax.interceptors.response.use(res => { return res }, e => {
    // Redirect to login page
    if (e.response.status == 401) {
      window.location = "/login?must_login"
      jsCookie.remove('auth')
    }
    console.log(e)
    console.log(e.response)
  })

  return ax
}

export { authApi, api };