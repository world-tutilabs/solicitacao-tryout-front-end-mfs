import { httpLocal } from '../configLocal/index';

export default {

    listAllPcp: async () => {
        return await httpLocal.get('/homologate')
    },

    homologatePCP: async (id, data) => {
        return await httpLocal.patch(`/homologate/${id}`, data)
    },

    deleteSolicitation: async (id, data) => {
        return await httpLocal.patch(`/homologate/${id}`, data)
    }

}