import httpLocal from '../services/newMold/mold'

export const state = () => ({
    myRouter: {
        status: "",
        router: ""
    },
    user: "",
    countNewModels: 0,

})

export const mutations = {
    change_my_router(state, status, router) {
        state.myRouter.status = status
        state.myRouter.router = router
    },

    setCountNewModels(state, payload){
        state.countNewModels += payload
    },
    setUser(state, payload){
        state.user = payload
    }

}

export const getters = {
    getCountNewModels(state) {
        return state.countNewModels
    },
    getUser(state){
        return state.user
        
    }

}







