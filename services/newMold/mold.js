import { http } from '../config/index'
import { httpLocal } from '../configLocal/index'
import { httpSAP } from '../configSAP/index'

export default {
  listAllRRIM: async (page = 0, offset = 10, statusId) => {
    return await http.get(`/rrim/list/aprovadas?page=${page}&offset=${offset}&statusId=${statusId}`)
  },
  // listAllRRIM: async (page = 0, offset = 10,) => {
  //   return await http.get(`/rrim/list/aprovadas?page=${page}&offset=${offset}`)
  // },
  listAll: async () => {
    return await http.get(`/list/aprovadas?page=0&offset=100000`)
  },


  listAllMachines: async () => {
    return await httpSAP.get('/api/v1/sap/tutilabs/machines')
  },

  listAllHistoric: async (offset = 0, limit = 10) => {
    return await httpLocal.get(`/list?limit=${limit}&offset=${offset}`)
  },

  listAllAproveds: async (offset = 0, limit = 10, status) => {
    return await httpLocal.get(`/listByStatus?limit=${limit}&offset=${offset}&status=${status}`)
  },

  createNewSolicitation: async (data) => {
    return await httpLocal.post(`/signup`, data)
  },

  updateSolicitation: async (id, data) => {
    return await httpLocal.put(`/update/${id}`, data)
  }
}
