import { http } from '../config/index'
import { httpLocal } from '../configLocal/index';

export default {
    listAllRRIM: async () => {
        return await http.get('/list-all-rrim/aprovadas')
    },

    listAllHistoric: async () => {
        return await httpLocal.get('/list')
    },

    createNewSolicitation: async (data) => {
        return await httpLocal.post(`/signup`, data)
    },

    updateSolicitation: async (id, data) => {
        return await httpLocal.put(`/update/${id}`, data)
    }
}