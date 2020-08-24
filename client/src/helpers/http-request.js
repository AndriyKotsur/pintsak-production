import axios from "axios"

const request = async function ({ headers, options = true }) {
  const client = axios.create({
    baseURL: 'http://localhost:5000',
    headers: headers,
    responseType: "json",
  })

  const onSuccess = function (response) {
    return response.data
  }

  const onError = function (error) {
    return Promise.reject(error.response || error.message)
  }

  return client(options).then(onSuccess).catch(onError)
}

const getTypes = () => {
  return request({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    options: {
      url: "/",
      method: "GET"
    }
  });
};

const HTTP = {
  getTypes
}

export default HTTP;