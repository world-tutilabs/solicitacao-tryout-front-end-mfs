<template>
  <div class="containerFilter" v-if="displayModal">
    <div class="containerModal">
      <header>
        <div>
          <h1>Revisão Engenharia</h1>
          <p>Informações Gerais</p>
        </div>
        <div @click="closeModal()" class="btn-closed">
          <img src="~/static/icons/x.svg" />
        </div>
      </header>

      <form action="">
        <!-- modificacao e testes -->
        <!-- <div class="rowInputs">
          <div class="boxInput">
            <FormInput label="Código SAPP" v-model="aa" readonly="readonly" />
          </div>
        </div> -->

        <div class="rowInputs">
          <div class="boxInput">
            <FormInput
              label="Código do Produto"
              v-model="dataRevisao.code_sap"
              readonly="readonly"
            />
          </div>
          <div class="boxInput">
            <FormInput
              label="Descrição do Produto"
              v-model="dataRevisao.desc_product"
              readonly="readonly"
            />
          </div>
          <div class="boxInput">
            <FormInput
              label="Cliente"
              v-model="dataRevisao.client"
              readonly="readonly"
            />
          </div>
          <div class="boxInput">
            <FormInput
              label="Motivo"
              v-model="dataRevisao.reason"
              readonly="readonly"
            />
          </div>
        </div>

        <!-- so aparece quando selecionar um processo -->
        <div class="containerProcess">
          <div class="tabs">
            <div class="tab">
              <p>Processo Injeção</p>
              <img src="~/static/icons/x.svg" alt="" />
            </div>
          </div>
          <div class="frameProcess">
            <div class="typeProcess">
              <h2>Processo Injeção</h2>
              <div class="rowInputs">
                <div class="boxInput">
                  <FormInput
                    label="Técnico"
                    v-model="dataRevisao.injectionProcess.proc_technician"
                    readonly="readonly"
                  />
                </div>
                <div class="boxInput">
                  <FormInput
                    label="Quantidade"
                    v-model="dataRevisao.injectionProcess.quantity"
                  />
                </div>
                <div class="boxInput">
                  <FormInput 
                    label="Motivo" 
                    v-model="dataRevisao.reason" 
                    readonly="readonly"
                  />
                </div>
                <div class="boxInput">
                  <FormInput
                    label="Data Programada"
                    v-model="dateProgrammed"
                    type="date"
                    :min="dateCurrent"
                    @click="inputTypeDate = 'date'"
                  />
                </div>

                <div class="boxInput">
                  <FormInputSelect
                    label="Máquina"
                    :options="listAllMachines.results"
                    v-model="dataRevisao.injectionProcess.machine.model"
                  />
                </div>
              </div>
            </div>
            <div class="cardTryOut">
              <!-- components aqui com props -->
              <SlotCardVue>
                <Title title="Mão de Obra" />
                <FormInput
                  label="Descrição"
                  v-model="dataRevisao.injectionProcess.labor.description"
                />

                <FormInput
                  label="Quantidade"
                  v-model="dataRevisao.injectionProcess.labor.amount"
                />
              </SlotCardVue>

              <SlotCardVue>
                <Title title="Molde" />
                <FormInput
                  label="Descrição"
                  v-model="dataRevisao.injectionProcess.mold.desc_mold"
                  readonly="readonly"
                />

                <FormInput
                  label="N° Cavidade"
                  v-model="dataRevisao.injectionProcess.mold.number_cavity"
                  readonly="readonly"
                />
              </SlotCardVue>

              <SlotCardVue>
                <Title title="Matéria Prima" />
                <FormInput
                  label="Descrição"
                  v-model="dataRevisao.injectionProcess.feedstock.description"
                  readonly="readonly"
                />

                <!-- <FormInput
                  label="Kg"
                  v-model="dataRevisao.injectionProcess.feedstock.kg"
                /> -->
              </SlotCardVue>
            </div>
          </div>
        </div>

        <FormTextArea
          title="Comentários do PCP*"
          v-model="dataRevisao.homologation.comment"
          readonly="readonly"
        />

        <div class="boxButtons">
          <p>*Campo Obrigatório</p>
          <div>
            <!-- <button class="cancel" @click.prevent="toHomologate(2)">Reprovar</button> -->
            <button class="save" @click.prevent="updateSoli">Atualizar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import http from "../../services/newMold/mold";
import dayjs from "dayjs";
import httpNewMold from "~/services/newMold/mold";
import FormInputSelect from "../Form/FormInputSelect.vue";

export default {
  data() {
    return {
      dateCurrent: dayjs().format("YYYY-MM-DD"),
      // dateProgrammed: dayjs(this.dataRevisao.programmed_date)
      //   .add(1, "day")
      //   .format("DD/MM/YYYY"),

      dateProgrammed: '',
      listAllMachines: [],
      inputTypeDate: "text",
      descriptionLabor: "",
      textoTextArea: "",
      homologateComment: {
        status: 0,
        comment: "",
      },
      solicitationUpdated: {
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
            kg: 0,
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
  created: async function () {
    console.log(this.dataRevisao.id);
    // // await httpNewMold.listAllMachines().then((res) => {
    // //   this.listAllMachines = res.data;

    // });
  },
  props: {
    displayModal: Boolean,
    dataRevisao: Object,
  },
  methods: {
    // formatDate() {
    //   return dayjs(this.dataRevisao.programmed_date)
    //     .add(1, "day")
    //     .format("DD/MM/YYYY");
    //   // return dayjs(tete.programmed_date).add(1, "day").format("DD/MM/YYYY");
    // },
    closeModal() {
      this.$emit("closeModal", this.displayModal);
    },
    updateSoli: async function () {
      this.solicitationUpdated.code_sap = this.dataRevisao.code_sap;
      this.solicitationUpdated.product_description =
        this.dataRevisao.desc_product;
      this.solicitationUpdated.client = this.dataRevisao.client;
      this.solicitationUpdated.reason = this.dataRevisao.reason;
      this.solicitationUpdated.InjectionProcess.proc_technician =
        this.dataRevisao.injectionProcess.proc_technician;
      this.solicitationUpdated.InjectionProcess.quantity = parseInt(
        this.dataRevisao.injectionProcess.quantity
      );
      this.solicitationUpdated.date = this.dateProgrammed;
      // input de Kg
      this.solicitationUpdated.InjectionProcess.feedstocks.kg = 0;
      this.solicitationUpdated.InjectionProcess.machine.model =
        this.dataRevisao.injectionProcess.machine.model;
      this.solicitationUpdated.InjectionProcess.feedstocks.description =
        this.dataRevisao.injectionProcess.feedstock.description;
      this.solicitationUpdated.InjectionProcess.labor.amount = parseInt(
        this.dataRevisao.injectionProcess.labor.amount
      );
      this.solicitationUpdated.InjectionProcess.labor.description =
        this.dataRevisao.injectionProcess.labor.description;
      this.solicitationUpdated.InjectionProcess.mold.mold =
        this.dataRevisao.injectionProcess.mold.desc_mold;
      this.solicitationUpdated.InjectionProcess.mold.number_cavity = parseInt(
        this.dataRevisao.injectionProcess.mold.number_cavity
      );
      await http
        .updateSolicitation(this.dataRevisao.id, this.solicitationUpdated)
        .then((res) => {
          this.$toast.info("Solicitação enviada para o PCP");
          this.closeModal();
        })
        .catch((error) => {
          // this.$toast.info(`Erro: ${error}`);
          this.$toast.warning("Campos não preenchidos.");

        });
    },
  },
  components: { FormInputSelect },
};
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
    width: 60rem;
    margin: auto;
    background-color: var(--bg);
    padding: 1vw;
    border-radius: 0.5rem;

    header {
      p {
        color: var(--green);
        font-weight: var(--bold);
      }

      border-bottom: 0.2rem solid var(--gray);
      padding-bottom: 1vw;
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }

    .rowInputs {
      display: flex;
      gap: 1rem;
      padding: 0 0.5rem;
      flex-wrap: wrap;

      .boxInput {
        p {
          font-size: 0.8rem;
          font-weight: var(--bold);
        }
      }
    }

    form {
      display: grid;
      gap: 2rem;

      .boxButtons {
        display: flex;
        gap: 1rem;
        justify-content: space-between;

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
          color: var(--white);
          background-color: var(--orange);
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
          background-color: var(--bgProcess);
          border: 2px solid var(--bgProcess);
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
        background-color: var(--bgProcess);

        .typeProcess {
          margin-bottom: 0.8rem;
          border-bottom: 2px solid var(--gray_text);
        }

        .cardTryOut {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
      }
    }
  }
}
</style>
