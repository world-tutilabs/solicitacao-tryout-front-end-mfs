<template>
  <div class="containerFilter" v-if="displayModal">
    <div class="containerModal">
      <header>
        <div>
          <h1>Titulo</h1>
          <p>Informações Gerais</p>
        </div>

        <div @click="closeModal()" class="btn-closed">
          <img src="~/static/icons/x.svg" />
        </div>
      </header>

      <form action="">
        <!-- modificacao e testes -->
        <div class="rowInputs" v-if="showContainer">
          <div class="boxInput">
            <p>Código SAPP</p>
            <input type="text" name="" id="" />
          </div>
          <div class="boxInput">
            <p>Molde</p>
            <input type="text" name="" id="" />
          </div>
        </div>

        <div class="rowInputs">
          <div class="boxInput">
            <p>Código do Produto:</p>
            <input type="text" list="products" name="" id="" @change="catchIndexProduct" />

            <datalist id="products">
              <option v-for="(products, index) in productsOptions.produto" :key="index">
                {{ products.COD_PRODUTO }}
              </option>
            </datalist>

          </div>
          <div class="boxInput">
            <p>Descrição do Produto</p>
            <input type="text" name="" id="" v-model="indexProduct" disabled />
          </div>
          <div class="boxInput">
            <p>Cliente</p>
            <input type="text" name="" id="" v-model="dataRRIM.CLIENTE" disabled />
          </div>
          <div class="boxInput" v-if="showContainer">
            <p>Motivo</p>
            <input type="text" name="" id="" value="" />
          </div>

          <div class="boxInput" v-else>
            <p>Motivo</p>
            <input type="text" name="" id="" v-model="reasonSolicitation" disabled />
          </div>
        </div>

        <!-- selecionar processos -->
        <div class="rowInputs contentInputs">
          <div class="boxInput">
            <p>Processo</p>
            <select name="" id="">
              <option value="">Processo de Injeção</option>
            </select>
          </div>
          <div class="boxInput">
            <p>Quantidade</p>
            <input type="number" name="" id="" />
          </div>
          <div class="boxInput">
            <p>Técnico</p>
            <input type="text" name="" id="" />
          </div>

          <button @click.prevent="addProcess" v-if="!processValidation">
            <img src="~/static/icons/plus.svg" alt="" />
            <h3>Adicionar</h3>
          </button>

        </div>

        <!-- so aparece quando selecionar um processo -->
        <div class="containerProcess">
          <div class="tabs">
            <div class="tab" v-for="index in count" :key="index">
              <p>Processo Injeção</p>
              <img @click="removeProcess(index)" src="~/static/icons/x.svg" alt="" />
            </div>
          </div>
          <div class="frameProcess" v-if="processValidation">
            <div class="cardTryOut">
              <SlotCard>
                <Title title="Mão de Obra" />
                <FormInput label="Descrição" />
                <FormInput label="Qtd" />
              </SlotCard>

              <SlotCard>
                <Title title="Molde" />
                <FormInput label="Descrição" />
                <FormInput label="N Cavidade" />
              </SlotCard>

              <SlotCard>
                <Title title="Matéria Prima" />
                <FormInput label="Descrição" />
                <FormInput label="Qtd" />
              </SlotCard>
            </div>
          </div>
        </div>

        <div class="boxButtons">
          <button class="cancel" @click="closeModal()">Cancelar</button>
          <button class="save" @click.prevent="saveNewSolicitation()">Salvar</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import http from '~/services/newMold/mold';

export default {
  props: {
    displayModal: Boolean,
    dataRRIM: Object,
  },
  data() {
    return {
      myRouter: false,
      count: 0,
      processValidation: false,


      productsOptions: [],
      indexProduct: "",
      reasonSolicitation: "Novo",


      newSolicitation: {
        cod_prod: "",
        desc_prod: "",
        client: "",
        reason: "",
      },

      testSolicitation: {
        code_sap: "5012",
        product_description: "description product new",
        client: "Positivo",
        date: "2022-06-21",
        reason: "Molde Novo",
        InjectionProcess: {
          proc_technician: "Rafael Railton Bugas",
          quantity: 25,
          feedstocks: {
            code: "1-2-3-4-5-6-7-8-9",
            description: "descricao Padrao Materia Prima"
          },
          labor: {
            description: "descricao Padrao Mão de Obra",
            amount: 1
          },
          mold: {
            number_cavity: 4,
            mold: "Padrao descricao Molde"
          }
        }
      },
    };
  },
  computed: {
    showContainer() {
      if (this.$route.name === "") {
        return (this.myRouter = false);
      }
      if (
        this.$route.name === "resin-test" ||
        this.$route.name === "modifications"
      ) {
        return (this.myRouter = true);
      }
    },
  },

  methods: {

    async saveNewSolicitation() {
      this.newSolicitation.desc_prod = this.indexProduct
      this.newSolicitation.client = this.dataRRIM.CLIENTE
      this.newSolicitation.reason = this.reasonSolicitation
      console.log(JSON.parse(JSON.stringify(this.newSolicitation)));

      await http.createNewSolicitation(this.testSolicitation).then( (res) => {
        console.log(res);
      }).catch( (error) => {
        console.log(`Erro: ${error}`);
      })




    },
    catchIndexProduct(event) {
      this.newSolicitation.cod_prod = event.target.value
      const value = this.productsOptions.produto.find((item) => item.COD_PRODUTO === event.target.value)
      this.indexProduct = value.DESC_PRODUTO
    },

    closeModal() {
      this.$emit("closeModal", this.displayModal)
    },

    addProcess() {
      this.count++;
      this.processValidation = true;
    },
    removeProcess(index) {
      this.count--;
      console.log(this.count + "count");
      if (index === this.count) {
        this.processValidation = false;
      }
      if (this.count === 0) {
        this.processValidation = false;
      }
    },
  },

  created: async function () {

    this.productsOptions = this.dataRRIM


  }

}


</script>

<style lang="scss" scoped>
.containerFilter {
  height: 100vh;
  position: fixed;
  background: rgba(249, 249, 249, 0.2666666667);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  left: 0;
  width: 100%;
  top: 0;
  z-index: 9;
  overflow-y: scroll;
  padding: 1rem;

  .containerModal {
    max-width: 60rem;
    margin: auto;
    background-color: var(--bg);
    padding: 1vw;
    border-radius: 0.5rem;

    header {
      border-bottom: 0.2rem solid var(--gray);
      padding-bottom: 1vw;
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;

      p {
        color: var(--green);
        font-weight: var(--bold);
      }

      .btn-closed {
        cursor: pointer;
      }
    }

    .rowInputs {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
      gap: 1rem;
      padding: 0 0.5rem;

      .boxInput {
        p {
          font-size: 0.8rem;
          font-weight: var(--bold);
        }

        input,
        select {
          // font-size: 1rem;
          width: 100%;
        }
      }
    }

    .contentInputs {
      background-color: #ffffff;
      padding: 0.7rem 0.5rem;
      align-items: flex-end;

      button {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
        align-items: center;
        color: var(--gray_text);
        width: 7.5rem;
        height: 2.5rem;
        border-radius: 3rem;
        background-color: var(--white);
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
          rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;

        img {
          width: 1rem;
        }

        @media (max-width: 343px) {
          margin-left: auto;
        }
      }
    }

    input,
    select {
      border: none;
      background-color: #ececec;
      font-size: 1rem;
      padding: 0.5rem 0.7rem;
      border-radius: var(--paddingInput);
      width: 10rem;
    }

    form {
      display: grid;
      gap: 2rem;
      grid-template-columns: minmax(10rem, 1fr);

      .boxButtons {
        display: flex;
        gap: 1rem;
        justify-content: end;

        button {
          font-size: 1rem;
          width: 7rem;
          padding: 0.5rem 0.7rem;
          border-radius: 1rem;
          font-weight: var(--bold);
        }

        .save {
          background-color: var(--blue);
          color: var(--white);
        }

        .cancel {
          border: 0.1rem solid var(--blue);
          color: var(--blue);
          background-color: var(--white);
        }
      }
    }

    .containerProcess {
      .tabs {
        display: flex;
        align-items: flex-end;
        height: 3.5rem;

        .tab {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          min-width: 10rem;
          height: 3rem;
          padding: 0.7rem 0.5rem;
          font-size: 1rem;
          font-weight: var(--bold);
          border-radius: 0.5rem 0.5rem 0 0;
          background-color: var(--gray);
          border: 2px solid var(--gray);
          transition: 0.2s;

          &:hover {
            height: 3.5rem;
          }

          img {
            width: 0.7rem;
          }
        }
      }

      .frameProcess {
        width: 100%;
        padding: 1rem;
        background-color: var(--gray);

        .cardTryOut {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
          gap: 2rem;
        }
      }
    }
  }
}
</style>
