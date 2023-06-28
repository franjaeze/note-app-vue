import axios from 'axios'
const apiClient = axios.create({
    baseURL: 'http://localhost:5000/notes',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {

    async listNotes() {
        try {
            const response = await apiClient.get('/')
            return response.data
        } catch (error) {
            throw "Error de conexion"
        }
    },
    async findNote(id) {
        try {
            const response = await apiClient.get('/' + id)
            return response.data
        } catch (error) {
            throw "Error de conexion"
        }
    },

    async addNote(elemento) {
        try {
            await apiClient.post('/', elemento);
        } catch (error) {
            throw "Error de conexion"
        }
    },

    async deleteNote(id) {
        try {
            await apiClient.delete("/" + id)
        } catch (error) {
            throw "Error de conexion"
        }
    },

    async updateNote(id, elemento) {
        try {
            await apiClient.put("/" + id, elemento)
        } catch (error) {
            throw "Error de conexion"
        }
    }
}