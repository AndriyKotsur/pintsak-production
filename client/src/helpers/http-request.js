import axios from 'axios'
import { COOKIES } from './'

const request = async function ({ headers, options = true }) {
	const authToken = COOKIES.getAuthToken() || ''
	const client = axios.create({
		baseURL: 'http://localhost:5000/v1',
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

const getTypes = () => {
	return request ({
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		options: {
			url: '/types',
			method: 'GET',
		},
	})
}

const getTiles = async () => {
	return request ({
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		options: {
			url: '/tiles',
			method: 'GET',
		},
	})
}

const addType = async ({ title, url }) => {
	return request ({
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		options: {
			url: '/admin/type',
			method: 'POST',
			data: {
				title,
				url,
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
			url: '/admin/tile',
			method: 'POST',
			data: formData,
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
	deleteTile,
	deleteType,
}

export default HTTP