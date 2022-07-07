import { httpLocal } from '../configLocal/index';

export default {

    listAllPcp: async () => {
        return await httpLocal.get('/homologate')
    },

}