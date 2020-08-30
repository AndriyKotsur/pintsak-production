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
  return request ({
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

const getTiles = ( type, search ) => {
  return request ({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    options: {
      url: `/tiles/types/${type}${search}`,
      method: "GET",
    }
  })
}

const getType = (id) => {
  const authToken = localStorage.token || null
  return request ({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + authToken,
    },
    options: {
      url: `/admin/type/${id}`,
      method: "GET"
    }
  })
}

const updateType = ({ id, title, title_url }) => {
  const authToken = localStorage.token || null
  return request ({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + authToken,
    },
    options: {
      url: `/admin/type/${id}`,
      method: "PUT",
      data: {
        title,
        title_url,
      }
    }
  })
}

const getTile = (id) => {
  return request ({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    options: {
      url: `/tile/${id}`,
      method: "GET",
    }
  })
}

const updateTile = ( id, formData ) => {
  const authToken = localStorage.token || null
  return request ({
    headers: {
      Accept: "multipart/form-data",
      "Content-Type": "multipart/form-data",
      "Authorization": 'Bearer ' + authToken,
    },
    options: {
      url: `/admin/tile/${id}`,
      method: "PUT",
      data: formData
    }
  })
}

const HTTP = {
  getTypes,
  getTiles,
  getType,
  updateType,
  getTile,
  updateTile,
}

export default HTTP;