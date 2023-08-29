import { httpRRIM } from "../config-rrim/index";

export default { 
    changePassword: async(password) =>{
        return await httpRRIM.post(`/change_password`,  {password} )
    }
}