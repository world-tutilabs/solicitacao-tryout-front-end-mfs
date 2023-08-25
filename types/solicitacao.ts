export interface Aprovados {
    number_tryout: string,
    code_sap: string,
    desc_product: string,
    client: string,
    programmed_date: string,
    code: string,
    reason: {
      id: number,
      description: string,
    },
    homologation_user: {
      id: string,
      cargo: {
        id: string,
        descricao: string,
      },
      email: string,
      status: string,
      criado_em: string,
      matricula: string,
      User_Sistema: [
        {
          sistema: {
            id: string,
            descricao: string,
          }
        }
      ],
      atualizado_em: string,
      nome_completo: string,
      nivel_de_acesso: {
        id: string,
        descricao: string,
      }
    },
    homologation_at: string,
    comment: string,
    status: {
      id: number,
    description: string,
    }
  
    injectionProcess: {
      id: string,
      id_tryout: string,
      proc_technician: string,
      quantity: number
      feedstock: {
        id: string,
        description: string,
        kg: number,
      },
      labor: {
        id: string,
        description: string,
        amount: number,
      },
      mold: {
        id: string,
        number_cavity: number,
        desc_mold: string,
      },
      machine: {
        id: string,
        model: string,
      }
    }
  

  }

