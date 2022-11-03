import { http } from '../config/index'
import { httpLocal } from '../configLocal/index'
import { httpSAP } from '../configSAP/index'

export default {
    listAllRRIM: async () => {
        return await http.get('/list-all-rrim/aprovadas')
    },

    listAllMachines: async () => {
        return await httpSAP.get('/api/v1/sap/tutilabs/machines')
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