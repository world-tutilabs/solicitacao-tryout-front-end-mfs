import { httpRRIM } from '../config-rrim/index'
import { httpSolTryOut } from '../config-sol-tryout/index'
import { httpSAP } from '../config-sap/index'

export default {
  listAllRRIM: async (page = 0, offset = 10, statusId) => {
    return await httpRRIM.get(`/rrim/list/aprovadas?page=${page}&offset=${offset}&statusId=${statusId}`)
  },
  RRIMMoldFamilia: async (page = 0, offset = 10, statusId, molde_familia) => {
    return await httpRRIM.get(`/rrim/list/aprovadas?page=${page}&offset=${offset}&statusId=${statusId}&molde_familia=${molde_familia}`)
  },

  listCodProducts: async (id) => {
    return await httpSAP.get(`/api/v1/sap/tutilabs/boms/${id}`)
  },

  listAll: async (id) => {
    return await httpRRIM.get(`/rrim/find/${id}`)
  },

  listAllMachines: async () => {
    return await httpSAP.get('/api/v1/sap/tutilabs/machines')
  },

  listAllHistoric: async (offset = 0, limit = 10, reason = 1) => {
    return await httpSolTryOut.get(`/list?limit=${limit}&offset=${offset}&reason=${reason}`)
  },

  listAllAproveds: async (offset = 0, limit = 10, status, reason = 1) => {
    return await httpSolTryOut.get(`/list?limit=${limit}&offset=${offset}&status=${status}&reason=${reason}`)
  },

  listAllHistoricModification: async (offset = 5, limit = 5, reason=2) => {
    return await httpSolTryOut.get(`/list?offset=${offset}&limit=${limit}&reason=${reason}`)
  },
  

  createNewSolicitation: async (data) => {
    return await httpSolTryOut.post(`/signup`, data)
  },

  updateSolicitation: async (id, data) => {
    return await httpSolTryOut.put(`/update/${id}`, data)
  }
}
