import axios from 'axios'

const API_URL = process.env.REACT_APP_API_AUTH_URL

const register = (fullname, username, email, password) => {
  return axios.post(API_URL + 'signup', {
    fullname,
    username,
    email,
    password,
  })
}

const login = (username, password) => {
  return axios
    .post(API_URL + 'signin', {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }

      return response.data
    })
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'))
}


const logout = () => {
  localStorage.removeItem('user')
}

export default {
  register,
  login,
  logout,
  getCurrentUser,
}
