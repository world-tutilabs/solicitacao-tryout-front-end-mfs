import { httpRRIM } from '../config-rrim/index'
import { httpSolTryOut } from '../config-sol-tryout/index'
import { httpSAP } from '../config-sap/index'

export default {
  listAllRRIM: async (page = 0, offset = 10, statusId) => {
    return await httpRRIM.get(`/rrim/list/aprovadas?page=${page}&offset=${offset}&statusId=${statusId}`)
  },
  // listAllRRIM: async (page = 0, offset = 10,) => {
  //   return await httpRRIM.get(`/rrim/list/aprovadas?page=${page}&offset=${offset}`)
  // },
  // listAll: async () => {
  //   return await httpRRIM.get(`/list/aprovadas?page=0&offset=100000`)
  // },
  listCodProducts: async (id) => {
    return await httpSAP.get(`/api/v1/sap/tutilabs/boms/${id}`)
    
  },
  listAll: async (id) => {
    return await httpRRIM.get(`/rrim/find/${id}`)
    
  },
  listAllMachines: async () => {
    return await httpSAP.get('/api/v1/sap/tutilabs/machines')
  },

  listAllHistoric: async (offset = 0, limit = 10) => {
    return await httpSolTryOut.get(`/list?limit=${limit}&offset=${offset}`)
  },

  listAllAproveds: async (offset = 0, limit = 10, status) => {
    return await httpSolTryOut.get(`/listByStatus?limit=${limit}&offset=${offset}&status=${status}`)
  },

  createNewSolicitation: async (data) => {
    return await httpSolTryOut.post(`/signup`, data)
  },

  updateSolicitation: async (id, data) => {
    return await httpSolTryOut.put(`/update/${id}`, data)
  }
}
