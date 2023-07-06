import { httpLocal } from '../configLocal/index';

export default {

  listAllPcp: async (offset = 0, limit = 10) => {
    return await httpLocal.get(`/homologate?limit=${limit}&offset=${offset}`)
  },

  homologatePCP: async (id, data) => {
    return await httpLocal.patch(`/homologate/${id}`, data)
  },

  deleteSolicitation: async (id, data) => {
    return await httpLocal.patch(`/homologate/${id}`, data)
  }

}
