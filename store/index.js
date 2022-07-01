export const state = () => ({
    myRouter: {
        status: "",
        router: ""
    }
})

export const mutations = {
    change_my_router(state, status, router) {
        state.myRouter.status = status
        state.myRouter.router = router
    }
}
