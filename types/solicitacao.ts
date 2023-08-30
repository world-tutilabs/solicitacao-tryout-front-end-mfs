export interface Aprovados {
    id: string,
    number_tryout: number,
    code_sap: string,
    desc_product: string,
    client: string,
    programmed_date: string,
    code: string,
    reason: {
      id: 1,
      description: string,
    },
    homologation: {
      id: string,
      fk_solicitation: string,
      created_user: {
        date: string,
        nome: string,
        role: string,
        email: string,
        matricula: string,
      },
      created_at: string,
      homologation_user: string,
      homologation_at: string,
      comment: string,
      status: {
        id: 3,
        description: string,
      }
    },
    injectionProcess: {
      id: string,
      id_tryout: string,
      proc_technician: string,
      quantity: 1500,
      feedstock: {
        id: string,
        description: string,
        kg: 0
      },
      labor: {
        id: string,
        description: string,
        amount: 20
      },
      mold: {
        id: string,
        number_cavity: 8,
        desc_mold: string,
      },
      machine: {
        id: string,
        model: string,
      }
    }
  }

  