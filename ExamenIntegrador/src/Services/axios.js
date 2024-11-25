import axios from 'axios'
import apiClient from './apiClient'

const servicesAxios = {

	login: async form => {
		try {
			const response = await apiClient.post(`/api/user/login`, form)
			return response.data
		} catch (error) {
			console.log(error,error.response.data.message)
		}
	},
	register: async(user)=>{
		try {
			const response = await apiClient.post(`/api/user/registro`,user)
			return response.data
		} catch (error) {
			console.log(error,error.response.data.message)
		}	
	},
	createPlant: async form => {
		try {
			const response = await apiClient.post(`/api/plants/create`, form)
			return response.data
		} catch (error) {
			console.log(error, error.response.data.message)
		}
	},
	deletePlant: async id => {
		try {
			const response = await apiClient.delete(`/api/plants/delete/${id}`)
			return response.data
		} catch (error) {
			console.log(error, error.response.data.message)
		}
	},
	editPlant: async planta => {
		try {
			const response = await apiClient.put(`/api/plants/edit`, planta)
			return response.data
		} catch (error) {
			console.log(error, error.response.data.message)
		}
	},
	traerPaises: async() => {
		try {
			const response = await apiClient.get(`/api/paises`)
			return response.data
		} catch (error) {
			console.log(error, error.response.data.message)
		}
	},
	
}

export default servicesAxios