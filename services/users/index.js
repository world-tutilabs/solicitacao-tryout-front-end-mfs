import { http } from "../config/index";

export default { 
    changePassword: async(password) =>{
        return await http.post(`/change_password`,  {password} )
    }
}