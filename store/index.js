export const state = () => ({
    myRouter: {
        status: "",
        router: ""
    },

    isLoading: false,
})

export const mutations = {
    change_my_router(state, status, router) {
        state.myRouter.status = status
        state.myRouter.router = router
    },

    setIsLoading(state) {
        state.isLoadding = !state.isLoadding
        console.log(state.isLoading);
    },

    
}
