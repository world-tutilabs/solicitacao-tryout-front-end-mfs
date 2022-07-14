import httpLocal from '../services/newMold/mold'

export const state = () => ({
    myRouter: {
        status: "",
        router: ""
    },

    countNewModels: 0,

})

export const mutations = {
    change_my_router(state, status, router) {
        state.myRouter.status = status
        state.myRouter.router = router
    },

    setCountNewModels(state, payload){
        state.countNewModels += payload
    }

}

export const getters = {
    getCountNewModels(state) {
        return state.countNewModels
    }

}







