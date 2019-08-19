import Axios from "axios";
import {Message} from "element-ui";

export const tip = (msg: string) => {
  Message({
    type: "warning",
    duration: 2000,
    message: msg
  })
};

Axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "https://www.easy-mock.com/mock/5d3e916c4b2e7e7c266e9c0f/example\n" +
  "\n" : "";
Axios.defaults.timeout = 10000;
Axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";

Axios.interceptors.request.use(
  config => {
    return config
  },
  e => {
    return Promise.reject(e)
  }
);

Axios.interceptors.response.use(
  response => {
    const {data, status} = response;
    if(status === 200) {
      return Promise.resolve(response)
    }else {
      return Promise.reject(response)
    }
  },
  e => {
    return Promise.reject(e)
  }
);

export function post(url: string, params?: object) {
  return new Promise(((resolve, reject) => {
    Axios.post(url, params)
      .then(res => {
        resolve(res.data)
      }).catch(e => {
        reject(e)
    })
  }))
}

export function get(url: string, params?: object) {
  return new Promise(((resolve, reject) => {
    Axios.get(url, params)
      .then(res => {
        resolve(res.data)
      }).catch(e => {
      reject(e)
    })
  }))
}