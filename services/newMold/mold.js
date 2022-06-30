import {http} from '../config/index'

export default {
    listAllRRIM: async () => {
        return await http.get('/list-all-rrim/aprovadas')
    }
}