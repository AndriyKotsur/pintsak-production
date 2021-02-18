import axios from 'axios'
import { COOKIES } from './'

const request = async function ({ headers, options = true }) {
	const authToken = COOKIES.getAuthToken() || ''
	console.log(authToken);
	const client = axios.create({
		baseURL: 'http://localhost:5000',
		headers: {
			...headers,
			Authorization: 'Bearer ' + authToken,
		},
		responseType: 'json',
	})

	const onSuccess = function (response) {
		return response.data
	}

	const onError = function (error) {
		return Promise.reject(error.response || error.message)
	}

	return client(options).then(onSuccess).catch(onError)
}

const login = admin => {
	return request ({
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		options: {
			url: '/admin',
			method: 'POST',
			data: admin,
		},
	})
}

const getTypes = () => {
	return request ({
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		options: {
			url: '/',
			method: 'GET',
		},
	})
}

const getTiles = ( type, search ) => {
	return request ({
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		options: {
			url: `/tiles/types/${type}${search}`,
			method: 'GET',
		},
	})
}

const getType = async id => {
	return request ({
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		options: {
			url: `/admin/type/${id}`,
			method: 'GET',
		},
	})
}

const updateType = async ({ id, title }) => {
	return request ({
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		options: {
			url: `/admin/type/${id}`,
			method: 'PUT',
			data: {
				title,
			},
		},
	})
}

const getTile = id => {
	return request ({
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		options: {
			url: `/tile/${id}`,
			method: 'GET',
		},
	})
}

const updateTile = async ( id, formData ) => {
	return request ({
		headers: {
			Accept: 'multipart/form-data',
			'Content-Type': 'multipart/form-data',
		},
		options: {
			url: `/admin/tile/${id}`,
			method: 'PUT',
			data: formData,
		},
	})
}

const addType = async ({ title }) => {
	return request ({
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		options: {
			url: '/admin/type/add',
			method: 'POST',
			data: {
				title,
			},
		},
	})
}

const addTile = async formData => {
	return request ({
		headers: {
			Accept: 'multipart/form-data',
			'Content-Type': 'multipart/form-data',
		},
		options: {
			url: '/admin/tile/add',
			method: 'POST',
			data: formData,
		},
	})
}

const getAllTiles = async () => {
	return request ({
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		options: {
			url: '/admin/tiles',
			method: 'GET',
		},
	})
}

const deleteTile = async id => {
	return request ({
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		options: {
			url: `/admin/tile/${id}`,
			method: 'DELETE',
		},
	})
}

const deleteType = async id => {
	return request ({
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		options: {
			url: `/admin/type/${id}`,
			method: 'DELETE',
		},
	})
}

const HTTP = {
	login,
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

export default HTTP