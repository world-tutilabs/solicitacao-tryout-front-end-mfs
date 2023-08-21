import httpLocal from '../services/newMold/mold'

export const state = () => ({
  
  testSolicitation: {
    code_sap: "",
    product_description: "",
    client: "",
    date: "",
    reason: "",
    homologation: {
      created_user: {
        tecnico: "Rafael",
        role: "Eng_Analista",
      },
    },
    InjectionProcess: {
      proc_technician: "",
      quantity: 0,
      feedstocks: {
        kg: "",
        description: "",
      },
      labor: {
        description: "",
        amount: 0,
      },
      mold: {
        number_cavity: 0,
        mold: "",
      },
      machine: {
        model: "",
      },
    },
  },
  myRouter: {
    status: "",
    router: ""
  },
  isUser: "",
  countNewModels: 0,

  showFooter: 'none'

})

export const mutations = {
  change_my_router(state, status, router) {
    state.myRouter.status = status
    state.myRouter.router = router
  },

  setCountNewModels(state, payload) {
    state.countNewModels += payload
  },
  setIsUser(state, payload) {
    state.isUser = payload
  },

  setFooterByRouter(state, payload) {
    console.log(payload)
    state.showFooter = payload
  }

}

export const getters = {
  getCountNewModels(state) {
    return state.countNewModels
  },
  getUser(state) {
    return state.user

  }

}







