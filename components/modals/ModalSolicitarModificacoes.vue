<template>
  <div class="containerFilter">
    <div class="containerModal">
      <header>
        <section class="content_HeaderLeft">
          <h1>Solicitação de Modificação</h1>
          <p>Informações Gerais</p>
        </section>

        <section @click="closeModal" class="btn-closed">
          <img src="~/static/icons/x.svg" />
        </section>
      </header>

      <div class="form">
        <div class="rowInputs">
          <label class="boxInput">
            <h5>Código do Produto:</h5>
            <the-mask
              :mask="['##.###.######.##-##', '##.###.######.##-##']"
              :masked="true"
              v-model="sapCodDescricao"
              :class="{ 'text-red': maskValidacao }"
              class="inputMask"
              placeholder="Campo Obrigatorio..."
            />
          </label>

          <label class="boxInput">
            <p>Descrição do Produto</p>
            <input type="text" :value="modalData.desc_product" disabled />
          </label>
          <label class="boxInput">
            <h5>Cliente:</h5>
            <input type="text" :value="modalData.client" disabled />
          </label>

          <InputSelect @status="validarEmit" :type="'Modificacao'" />
          <section>
            <div class="boxInput" v-if="status === 'Modificação de Molde'">
              <h5>Cód. RGM</h5>
              <input type="text" v-model="codRGM" />
            </div>

            <div class="boxInput" v-if="status === 'Novo Produto do Molde'">
              <h5>Cód. NNP</h5>
              <input type="text" v-model="codNNP" />
            </div>
          </section>
          <div class="boxInput">
            <p>Processo:</p>
            <select>
              <option value="">Processo de Injeção</option>
            </select>
          </div>
          <div class="boxInput">
            <p>Quantidade:</p>
            <input type="number" min="1" v-model="quantidade" />
          </div>
          <div class="boxInput">
            <p>Técnico:</p>
            <input type="text" v-model="tecnico" />
          </div>

          <button
            class="buttonAdd"
            @click.once="addProcess"
            v-if="!processValidation"
          >
            <img src="~/static/icons/plus.svg" alt="" />
            <h3>Adicionar</h3>
          </button>
        </div>
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
                <input type="text" :value="quantidade" disabled />
              </div>

              <div class="boxInput">
                <p>Técnico</p>
                <input
                  type="text"
                  :value="modalData.homologation.homologation_user.nome"
                  disabled
                />
              </div>

              <div class="boxInput">
                <p>Motivo</p>
                <input
                  type="text"
                  :value="status"
                  disabled
                  v-if="status === 'Modificação de Molde'"
                />
                <input
                  type="text"
                  :value="status"
                  disabled
                  v-if="status === 'Novo Produto do Molde'"
                />
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
                    v-for="(machine, index) in listAllMachines"
                    :key="index"
                  >
                    {{ machine.ResName }}
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
                  :value="modalData.injectionProcess.mold.desc_mold"
                  disabled
                />
                <FormInput
                  label="N° Cavidade"
                  type="number"
                  min="1"
                  :value="this.modalData.injectionProcess.mold.number_cavity"
                  disabled
                />
              </SlotCard>

              <SlotCard>
                <Title title="Matéria Prima" />
                <FormInput label="Cód + Descrição" :value="codMP" disabled />
              </SlotCard>
            </div>
          </div>
  
        </div>
        <div class="boxButtons">
          <button class="cancel" @click="closeModal">Cancelar</button>
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
import { TheMask } from "vue-the-mask";
export default {
  props: {
    displayModal: Boolean,
    dataRRIM: Object,
    modalData: Object,
  },
  components: { TheMask },
  data() {
    return {
      itemsFiltrados: [],
      codMP: "",
      tecnico:"",
      codigoValido: false,
      sapCodDescricao: "",
      valueInput: "",
      status: "",
      codRGM: "",
      codNNP: "",
      toToggleFilter: 0,
      machine: "",
      dateCurrent: dayjs().format("YYYY-MM-DD"),
      myRouter: false,
      count: 0,
      processValidation: false,

      productsOptions: [],
      indexProduct: "",
      reasonSolicitation: Number,

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
    maskValidacao() {
      return this.sapCodDescricao.length < 19;
    },
    
  },
  methods: {
    async validarCodProduto() {
      try {
        const response = await http.listCodProducts(this.sapCodDescricao);

        if (response.data.result === undefined) {
          this.$toast.error("Código do Produto inválido");
          return (this.codigoValido = false);
        }

        this.codigoValido = !!response.data.result.Code;
        this.itemsFiltrados = response.data.result.itens;

        const materiaPrimaItens = this.itemsFiltrados.filter((item) => {
          return (
            item.ItmsGrpNam === "MATERIA PRIMA" ||
            item.ItmsGrpNam === "MP - MISTURA"
          );
        });

        this.concatenarMPeDescricao(materiaPrimaItens);
      } catch (error) {
        console.error("Erro ao validar código de produto:", error);
      }
    },
    async saveNewSolicitation() {

      if (
        !this.quantidade ||
        !this.newData ||
        !this.machine ||
        !this.laborAmount
      ) {
        this.$toast.warning("Algum campo não foi preenchido");
        return;
      }
      this.testSolicitation.code_sap = this.sapCodDescricao
      this.testSolicitation.product_description = this.modalData.desc_product
      this.testSolicitation.client = this.modalData.client;
      this.testSolicitation.date   =  this.newData
      this.testSolicitation.reason = this.reasonSolicitation
      this.testSolicitation.homologation
      this.testSolicitation.InjectionProcess.feedstocks.kg = 0;
      this.testSolicitation.InjectionProcess.feedstocks.description =
      this.modalData.injectionProcess.feedstock.description

      this.testSolicitation.InjectionProcess.labor.amount = parseInt(
        this.laborAmount
      );
      this.testSolicitation.InjectionProcess.mold.mold = this.modalData.injectionProcess.mold.desc_mold
      this.testSolicitation.InjectionProcess.mold.number_cavity = parseInt(
        this.modalData.injectionProcess.mold.number_cavity
      );

      this.testSolicitation.InjectionProcess.machine.model = this.machine;
    
      this.$store.commit("setCountNewModels", this.toToggleFilter++);

      await http
        .createNewSolicitation(this.testSolicitation)
        .then((res) => {
          this.$toast.success("Solicitação de Modificação enviada com sucesso!");
          this.closeModal();
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toast.error("Erro no servidores");
          }
        });

      console.log(this.testSolicitation);
    },
    async concatenarMPeDescricao(materiaPrimaItens) {
      await materiaPrimaItens;
      this.codMP = materiaPrimaItens[0].Code + materiaPrimaItens[0].ItmsGrpNam;
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

      this.$emit("modalEmitStatus", false);
      document.body.style.overflow = "auto";
    },

    validarEmit(payload) {
      this.status = payload.newValue;
      if ( this.status === 'Modificação de Molde'){
        this.reasonSolicitation = 4
      }
      else if (this.status === 'Novo Produto do Molde')
      this.reasonSolicitation = 3
    },

    async addProcess() {
      await this.validarCodProduto();

      this.valueInput =
        this.dataRRIM.InforGeral.produto[0].COD_MATERIA_PRIMA +
        this.dataRRIM.InforGeral.produto[0].DESC_MATERIA_PRIMA;

      if (this.status === "") {
        this.$toast.error("Campo Motivo não foi preenchido");
      }

      if (this.quantidade <= 0) {
        this.$toast.error("Campo quantidade com valores impróprios");
      } else if (this.codigoValido === true) {
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

  created: async function () {
    
    this.productsOptions = this.dataRRIM;
    try {
      const res = await http.listAllMachines();
      this.listAllMachines = res.data.results;
    } 
    catch (error) {
      console.error("Erro ao validar código de produto:", error);
    }
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
    .containerInputsModificacao {
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

    .buttonAdd {
      display: flex;
      grid-gap: 0.5rem;
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
    .text-red {
      color: #c84a4a;
      font-weight: bold;
      border: solid 1px #c84a4a;
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
  