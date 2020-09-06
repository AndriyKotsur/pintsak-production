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

const getType = async ( id ) => {
  const authToken = await localStorage.token || null
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

const updateType = async ({ id, title, title_url }) => {
  const authToken = await localStorage.token || null
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

const getTile = ( id ) => {
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

const updateTile = async ( id, formData ) => {
  const authToken = await localStorage.token || null
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

const addType = async ({ title, title_url }) => {
  const authToken = await localStorage.token || null
  return request ({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + authToken,
    },
    options: {
      url: '/admin/type/add',
      method: "POST",
      data: {
        title,
        title_url,
      }
    }
  })
}

const addTile = async ( formData ) => {
  const authToken = await localStorage.token || null
  return request ({
    headers: {
      Accept: "multipart/form-data",
      "Content-Type": "multipart/form-data",
      "Authorization": 'Bearer ' + authToken,
    },
    options: {
      url: '/admin/tile/add',
      method: "POST",
      data: formData,
    }
  })
}

const getAllTiles = async () => {
  const authToken = await localStorage.token || null
  return request ({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + authToken
    },
    options: {
      url: '/admin/tiles',
      method: "GET",
    }
  })
}

const deleteTile = async ( id ) => {
  const authToken = await localStorage.token || null
  return request ({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + authToken,
    },
    options: {
      url: `/admin/tile/${id}`,
      method: "DELETE",
    }
  })
}

const deleteType = async ( id ) => {
  const authToken = await localStorage.token || null
  return request ({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + authToken,
    },
    options: {
      url: `/admin/type/${id}`,
      method: "DELETE",
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
  addType,
  addTile,
  getAllTiles,
  deleteTile,
  deleteType,
}

export default HTTP;