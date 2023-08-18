import { httpSolTryOut } from '../config-sol-tryout/index';

export default {

  listAllPcp: async (offset = 0, limit = 10, status) => {
    return await httpSolTryOut.get(`/homologate?limit=${limit}&offset=${offset}&status=${status}`)
  },

  homologatePCP: async (id, data) => {
    return await httpSolTryOut.patch(`/homologate/${id}`, data)
  },

  deleteSolicitation: async (id, data) => {
    return await httpSolTryOut.patch(`/homologate/${id}`, data)
  }

}
