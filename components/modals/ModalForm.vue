<template>
  <div class="containerFilter" v-if="displayModal">
    <div class="containerModal">
      <header>
        <div>
          <h1>Solicitar de TryOut</h1>
          <p>Informações Gerais</p>
        </div>

        <div @click="closeModal()" class="btn-closed">
          <img src="~/static/icons/x.svg" />
        </div>
      </header>

      <div class="form">
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
            <input type="text" list="products" @change="catchIndexProduct" />

            <datalist id="products">
              <option
                v-for="(products, index) in productsOptions.produto"
                :key="index"
              >
                {{ products.COD_PRODUTO }}
              </option>
            </datalist>
          </div>
          <div class="boxInput">
            <p>Descrição do Produto</p>
            <input type="text" v-model="indexProduct" disabled />
          </div>
          <div class="boxInput">
            <p>Cliente</p>
            <input type="text" v-model="dataRRIM.CLIENTE" disabled />
          </div>
          
          <InputSelect @status="validarEmit" :type="'Tryout'" />
  
          <!-- <div class="boxInput" v-if="showContainer">
            <p>Motivo</p>
            <input type="text" value="" />
          </div>

          <div class="boxInput" v-else>
            <p>Motivo</p>
            <input type="text" v-model="reasonSolicitation" />
          </div> -->
        </div>
  
        <!-- selecionar processos -->
        <div class="rowInputs contentInputs">
          <div class="boxInput">
            <p>Processo</p>
            <select>
              <option value="">Processo de Injeção</option>
            </select>
          </div>
          <div class="boxInput">
            <p>Quantidade</p>
            <input type="number" min="1" v-model="quantidade" />
          </div>
          <div class="boxInput">
            <p>Técnico</p>
            <input
              type="text"
              v-model="dataRRIM.homologacao[0].created_user.nome"
              disabled
            />
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
              <img
                @click="removeProcess(index)"
                src="~/static/icons/x.svg"
                alt=""
              />
            </div>
          </div>
          <div class="frameProcess" v-if="processValidation">
            <div class="rowInputs divisor">
              <div class="boxInput">
                <p>Quantidade</p>
                <input type="text" v-model="quantidade" disabled />
              </div>

              <div class="boxInput">
                <p>Técnico</p>
                <input
                  type="text"
                  v-model="dataRRIM.homologacao[0].created_user.nome"
                  disabled
                />
              </div>

              <div class="boxInput">
                <p>Motivo</p>
                <input type="text" value="Novo Molde" disabled v-if="reasonSolicitation === 1"/>
                <input type="text" value="Retroativo" disabled v-if="reasonSolicitation === 2"/>
              </div>

              <div class="boxInput inputData">
                <p>Data Programada</p>
                <input type="date" v-model="newData" />
              </div>

              <div class="boxInput inputData">
                <p>Máquina</p>

                <input type="text" list="machines" v-model="machine" />

                <datalist id="machines">
                  <option
                    v-for="(machine, index) in dataRRIM.molde_aberto"
                    :key="index"
                  >
                    {{ machine.MAQUINA_OP1 }}
                  </option>
                  <option
                    v-for="(machine, index) in dataRRIM.molde_aberto"
                    :key="index"
                  >
                    {{ machine.MAQUINA_OP2 }}
                  </option>
                  <option
                    v-for="(machine, index) in dataRRIM.molde_aberto"
                    :key="index"
                  >
                    {{ machine.MAQUINA_OP3 }}
                  </option>
                </datalist>
              </div>
            </div>

            <div class="cardTryOut">
              <SlotCard>
                <Title title="Mão de Obra" />
                <FormInput
                  label="Quantidade"
                  type="number"
                  min="1"
                  v-model="laborAmount"
                />
              </SlotCard>

              <SlotCard>
                <Title title="Molde" />
                <FormInput
                  label="Descrição"
                  type="text"
                  v-model="dataRRIM.MOLDE"
                  disabled
                />
                <FormInput
                  label="N° Cavidade"
                  type="number"
                  min="1"
                  :value="calculeCavity(dataRRIM.molde_aberto[0].cavidade)"
                  disabled
                />
              </SlotCard>

              <SlotCard>
                <Title title="Matéria Prima" />
                <FormInput
                  label="Cód + Descrição"
                  type="text"
                  v-model="feedstocksDescription"
                  disabled
                />
              </SlotCard>
            </div>
          </div>
          <!-- <pre>        {{ productsOptions }}</pre> -->
        </div>
        <div class="boxButtons">
          <button class="cancel" @click.prevent="closeModal()">Cancelar</button>
          <button class="save" @click.prevent="saveNewSolicitation()">
            Salvar
          </button>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import http from "~/services/newMold/mold";
import dayjs from "dayjs";

export default {
  props: {
    displayModal: Boolean,
    dataRRIM: Object,
  },
  data() {
    return {
      status: "",
      codRGM: "",
      toToggleFilter: 0,
      machine: "",
      dateCurrent: dayjs().format("YYYY-MM-DD"),
      myRouter: false,
      count: 0,
      processValidation: false,

      productsOptions: [],
      indexProduct: "",
      reasonSolicitation: "Novo",

      quantidade: "",
      tecnico: "",
      newData: "",

      listAllMachines: [],

      feedstocksDescription: "",
      feedstocksCode: "",
      laborAmount: "",
      laborDescription: "",
      moldMold: "",
      moldNumber: "",

      newSolicitation: {
        cod_prod: "",
        desc_prod: "",
        client: "",
        reason: "",
      },

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
    };
  },
  computed: {
    showContainer() {
      if (this.$route.name === "") {
        return (this.myRouter = false);
      }
      if (
        this.$route.name === "resin-test" ||
        this.$route.name === "sol-modificacao"
      ) {
        return (this.myRouter = true);
      }
    },
  },

  methods: {
    async saveNewSolicitation() {
      if (
        !this.newSolicitation.cod_prod ||
        !this.quantidade ||
        !this.newData ||
        !this.machine ||
        !this.laborAmount
      ) {
        this.$toast.warning("Algum campo não foi preenchido");
        return;
      }

      this.testSolicitation.code_sap = this.newSolicitation.cod_prod;
      this.testSolicitation.product_description = this.indexProduct;
      this.testSolicitation.client = this.dataRRIM.CLIENTE;
      this.testSolicitation.reason = this.reasonSolicitation;
      this.testSolicitation.InjectionProcess.proc_technician =
        this.dataRRIM.homologacao[0].created_user.nome;
      this.testSolicitation.InjectionProcess.quantity = parseInt(
        this.quantidade
      );
      this.testSolicitation.date = this.newData;
      this.testSolicitation.InjectionProcess.feedstocks.kg = 0;
      this.testSolicitation.InjectionProcess.feedstocks.description =
        this.feedstocksDescription;
      this.testSolicitation.InjectionProcess.labor.amount = parseInt(
        this.laborAmount
      );
      this.testSolicitation.InjectionProcess.labor.description =
        this.laborDescription;
      this.testSolicitation.InjectionProcess.mold.mold = this.dataRRIM.MOLDE;
      this.testSolicitation.InjectionProcess.mold.number_cavity = parseInt(
        this.moldNumber
      );

      this.testSolicitation.InjectionProcess.machine.model = this.machine;
      this.$store.commit("setCountNewModels", this.toToggleFilter++);

      await http
        .createNewSolicitation(this.testSolicitation)
        .then((res) => {
          this.$toast.success("Solicitação realizada com sucesso!");
          this.closeModal();
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toast.error("Erro no servidores");
          }
        });
    },
    catchIndexProduct(event) {
      this.newSolicitation.cod_prod = event.target.value;
      const value = this.productsOptions.produto.find(
        (item) => item.COD_PRODUTO === event.target.value
      );
      this.indexProduct = value.DESC_PRODUTO;
      this.feedstocksDescription = `${value.COD_MATERIA_PRIMA} - ${value.DESC_MATERIA_PRIMA}`;
    },

    closeModal() {
      this.indexProduct = null;

      this.quantidade = null;
      this.tecnico = null;

      this.laborDescription = null;
      this.laborAmount = null;

      this.moldMold = null;
      this.moldNumber = null;

      this.feedstocksDescription = null;
      this.feedstocksCode = null;

      this.count = 0;
      this.processValidation = false;
      this.machine = "";

      this.$emit("closeModal", this.displayModal);
    },

    validarEmit(payload) {
      if(payload.newValue === 'Retroativo') {
        this.reasonSolicitation = 2
      } else {
        this.reasonSolicitation = 1
      }
    },

    addProcess() {
      if (this.newSolicitation.cod_prod === '') {
        this.$toast.error("Informe o código do produto");
      } else if (this.quantidade === "") {
        this.$toast.error("Quantidade não foi preenchida");
      } else if (this.quantidade <= 0) {
        this.$toast.error("Campo quantidade com valores impróprios");
      } else if(this.reasonSolicitation !== 1 && this.reasonSolicitation !== 2) {
        this.$toast.error("Motivo não foi preenchido");
      } else{
        this.count++;
        this.processValidation = true;
      }
    },
    
    removeProcess(index) {
      this.count--;
      if (index === this.count) {
        this.processValidation = false;
      }
      if (this.count === 0) {
        this.processValidation = false;
      }
    },

    calculeCavity(cavityArray) {
      let total = 0;
      cavityArray.map((item) => {
        total = item.N_CAVIDADE + total;
      });
      this.moldNumber = total;
      return this.moldNumber;
    },
  },

  async created () {
    this.productsOptions = this.dataRRIM;
  },
  watch: {
    quantidade(newValue) {
      if (newValue < 0) {
        this.quantidade = newValue * -1;
      }
    },
    laborAmount(newValue) {
      if (newValue < 0) {
        this.laborAmount = newValue * -1;
      }
    },
    moldNumber(newValue) {
      if (newValue < 0) {
        this.moldNumber = newValue * -1;
      }
    },
    feedstocksCode(newValue) {
      if (newValue < 0) {
        this.feedstocksCode = newValue * -1;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.divisor {
  border-bottom: 2px solid rgba(0, 0, 0, 0.397);
  padding: 1rem 0 !important;
  margin-bottom: 1rem;

  .inputData {
    input {
      background-color: #ffffff !important;
      box-shadow: rgb(0 0 0 / 16%) 0px 3px 6px, rgb(0 0 0 / 23%) 0px 3px 6px;
    }
  }
}

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
.containerInputsModificacao{
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
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

    .form {
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
