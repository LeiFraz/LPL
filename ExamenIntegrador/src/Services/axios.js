import axios from 'axios'
import apiClient from './apiClient'

const servicesAxios = {

	register: async(user)=>{
		try {
			const response = await apiClient.post(`/registro`,user)
			return response.data
		} catch (error) {
			console.log(error,error.response.data.message)
		}	
	},
	login: async form => {
		try {
			const response = await apiClient.post(`/iniciarSesion`, form)

			return response.data
		} catch (error) {
			console.log(error,error.response.data.message)
		}
	},
	cerrarSesion: async() => {
		try {
			const response = await apiClient.post(`/cerrarSesion`)
			localStorage.clear();
			return response.data
		} catch (error) {
			console.log(error,error.response.data.message)
		}
	},
	countCurrentGames: async planta => {
		try {
			//Si posee 3 partidas pendientes no debe poder iniciar un nuevo juego
			const response = await apiClient.put(`/cantidadJuegos`, planta)
			return response.data
		} catch (error) {
			console.log(error, error.response.data.message)
		}
	},
	saveGame: async form => {
		try {
			//guardar de acuerdo a los datos que te traen, se crea un ID
			console.log(form)
			const response = await apiClient.post(`/guardarJuego`,form)
			return response.data
		} catch (error) {
			console.log(error, error.response.data.message)
		}
	},
	savePauseGame: async form => {
		try {
			//cuando se retoma un juego se guarda desde aqui
			//Si tiene id lo guardo con ese ID, sino se crea una partida SaveGame
			const response = await apiClient.post(`/guardarJuegoPausado`, form)
			return response.data
		} catch (error) {
			console.log(error, error.response.data.message)
		}
	},
	searchGames: async nombreUsuario => {
		try {
			//buscar las partidas pendientes
			const response = await apiClient.get(`/buscarJuego?nombreUsuario=${nombreUsuario}`)
			return response.data
		} catch (error) {
			console.log(error, error.response.data.message)
		}
	},
	
}

export default servicesAxios