import axios from 'axios'
import { COOKIES } from './'

const request = async function ({ options = true, headers = {} }) {
	const authToken = COOKIES.getAuthToken() || ''
	const client = axios.create({
		baseURL: process.env.REACT_APP_API + '/v1',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + authToken,
			...headers,
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
	return request({
		options: {
			url: '/admin',
			method: 'POST',
			data: admin,
		},
	})
}

const getType = id => {
	return request({
		options: {
			url: `/admin/type/${id}`,
			method: 'GET',
		},
	})
}

const getTile = url => {
	return request({
		options: {
			url: `/tile/${url}`,
			method: 'GET',
		},
	})
}

const getTypes = () => {
	return request({
		options: {
			url: '/types',
			method: 'GET',
		},
	})
}

const getTiles = ({ page = 1, typeBy = '', sortBy = '', orderBy = 1 }) => {
	return request({
		options: {
			url: `/tiles?&page=${page}&type=${typeBy}&sort=${sortBy}&order=${orderBy}`,
			method: 'GET',
		},
	})
}

const getPopularTiles = () => {
	return request({
		options: {
			url: '/popular',
			method: 'GET',
		},
	})
}

const addType = ({ title, url }) => {
	return request({
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

const addTile = data => {
	return request({
		options: {
			url: '/admin/tile',
			method: 'POST',
			data,
		},
	})
}

const updateType = ({ id, title }) => {
	return request({
		options: {
			url: `/admin/type/${id}`,
			method: 'PUT',
			data: {
				title,
			},
		},
	})
}

const updateTile = (url, data) => {
	return request({
		options: {
			url: `/admin/tile/${url}`,
			method: 'PUT',
			data,
		},
	})
}

const deleteTile = id => {
	return request({
		options: {
			url: `/admin/tile/${id}`,
			method: 'DELETE',
		},
	})
}

const deleteType = id => {
	return request({
		options: {
			url: `/admin/type/${id}`,
			method: 'DELETE',
		},
	})
}

const uploadImages = ({ id, formData }) => {
	return request({
		headers: {
			Accept: 'multipart/form-data',
			'Content-Type': 'multipart/form-data',
		},
		options: {
			url: `/admin/tile/images/${id}`,
			method: 'PUT',
			data: formData,
		},
	})
}

const deleteImage = (id, image) => {
	return request({
		options: {
			url: `/admin/tile/images/${id}`,
			method: 'DELETE',
			data: { key: image }
		}
	})
}

const sendOrder = (data) => {
	return request({
		options: {
			url: '/order-request',
			method: 'POST',
			data
		}
	})
}

const sendRequest = (data) => {
	return request({
		options: {
			url: '/customer-request',
			method: 'POST',
			data
		}
	})
}

const HTTP = {
	login,
	getType,
	getTile,
	getTypes,
	getTiles,
	getPopularTiles,
	addType,
	addTile,
	updateType,
	updateTile,
	deleteTile,
	deleteType,
	uploadImages,
	deleteImage,
	sendOrder,
	sendRequest,
}

export default HTTP
