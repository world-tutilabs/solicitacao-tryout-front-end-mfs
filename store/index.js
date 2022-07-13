export const state = () => ({
    myRouter: {
        status: "",
        router: ""
    },

    countNewMolds: 0
})

export const mutations = {
    change_my_router(state, status, router) {
        state.myRouter.status = status
        state.myRouter.router = router
    },

    setCountNewMold(state, data){
        state.countNewMolds = data
    }
}

export const getters = {
    getCountNewMold(state){
        console.log(state.countNewMolds);
        return state.countNewMolds
    }
}





