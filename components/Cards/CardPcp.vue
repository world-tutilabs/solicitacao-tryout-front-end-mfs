<template>
  <div class="box">
    <div class="content">
      <div class="header-content">
        <div :class="flagValidation(description)"> 

      </div>
        <div class="container_button" @click="openInfoCard">
          <img src="~/static/icons/arrowClosed.svg" v-if="isOpenInfoCard" />
          <img src="~/static/icons/arrowOpened.svg" alt="" srcset="" v-else />
        </div>
      </div>
      <div class="containerMain">
        <div class="informs">
          <div class="inform">
            <h3>Cód. de TryOut</h3>
            <p>{{ dataMold.solicitation.number_tryout }}</p>
          </div>
          <div class="inform">
            <h3>Cód. do Produto | SAP</h3>
            <p>{{ dataMold.solicitation.code_sap }}</p>
          </div>
          <div class="inform">
            <h3>Desc. do Produto</h3>
            <p>{{ dataMold.solicitation.desc_product }}</p>
          </div>
          <div class="inform">
            <h3>Cliente</h3>
            <p>{{ dataMold.solicitation.client }}</p>
          </div>
          <div class="inform">
            <h3>Data</h3>
            <p>{{ formatDate(dataMold.solicitation.programmed_date) }}</p>
          </div>

          <div class="inform">
            <h3>Máquina</h3>
            <p>{{ dataMold.solicitation.injectionProcess.machine.model }}</p>
          </div>
          <div class="inform">
            <h3>Molde Familia</h3>
            <h5 v-if="dataMold.solicitation.molde_familia === 'true'" style="color: coral;"> Molde Familia</h5>
            <p v-else> Molde Normal </p>
          </div>

          <div class="inform" v-if="dataMold.solicitation.reason.description !== 'Novo' || dataMold.solicitation.reason.description !== 'Retroativo'">
            <h3 v-if="dataMold.solicitation.reason.description === 'Novo Produto'">Código NNP</h3>
            <h3 v-if="dataMold.solicitation.reason.description === 'Modificação de Molde'">Código RGM</h3>
            <p>{{ dataMold.solicitation.code }}</p>
          </div>
        </div>
      </div>

      <div class="containerDetails" v-if="isOpenInfoCard">
        <div class="informs">
          <div class="inform">
            <h3>Processos</h3>
            <p>Processo de Injeção</p>
          </div>

          <div class="inform">
            <h3>Quantidade</h3>
            <p>{{ dataMold.solicitation.injectionProcess.quantity }}</p>
          </div>

          <div class="inform">
            <h3>Técnico</h3>
            <p>{{ dataMold.solicitation.injectionProcess.proc_technician }}</p>
          </div>

          <div class="inform">
            <h3>Motivo</h3>
            <p>{{ dataMold.solicitation.reason.description }}</p>
          </div>
        </div>

        <div class="processContent">
          <div class="processBox">
            <h3>Mão de Obra</h3>
            <span>Quantidade</span>
            <h4>
              {{ dataMold.solicitation.injectionProcess.labor.amount }}
            </h4>
          </div>

          <div class="processBox">
            <h3>Molde</h3>
            <span>Descrição</span>
            <h4>{{ dataMold.solicitation.injectionProcess.mold.desc_mold }}</h4>
            <div class="processFooter">
              <h4>
                N° Cavidade:
                {{ dataMold.solicitation.injectionProcess.mold.number_cavity }}
              </h4>
            </div>
          </div>

          <div class="processBox">
            <h3>Matéria Prima</h3>
            <span>Código - Descrição</span>
            <h4>
              {{ dataMold.solicitation.injectionProcess.feedstock.description }}
            </h4>
          </div>
        </div> 
      </div>

      <div class="contentContainer" v-if="isOpenInfoCard">
          <Button titleBtn="Revisar Solicitação" @click.native="ShowModal"/>

        <ModalFormPcp v-if="this.modal == true" @closeModal="closeModal" :dataPCP="dataMold" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import dayjs from "dayjs";
export default Vue.extend({
  layout: "mainFrame",

  props: {
    dataMold: Object,
    description: String
  },
  data() {
    return {
      isOpenInfoCard: false,
      btnStatus: this.status,
      modal: false,
      typeHomologar: "",
      showPopUp: true,
      
    };
  },
  methods: {
    ShowModal(){
      this.modal = true
    },
    closeModal(){
      this.modal = false
    },
    openInfoCard() {
      return (this.isOpenInfoCard = !this.isOpenInfoCard);
    },

    formatDate(date) {
      return dayjs(date).add(1, "day").locale("pt-br").format("DD/MM/YYYY");
    },

    updateCard() {
      this.$emit("updateList");
    },

    flagValidation(data) {
      if (data == "Novo Produto") {
        return "flap flap-green";
      } else if (data == "Novo") {
        return "flap flap-blue";
      } else if (data == "Modificação de Molde") {
        return "flap flap-orange";
      } else if (data == "Retroativo") {
        return "flap flap-blueSkye";
      }
       else {
        return "flap flap-none";
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.box {
  .content {
    width: 100%;
    background: var(--white);
    padding: max(0.4rem, 1vw);
    border-radius: 7px;
    border: 1px solid var(--gray_text);
    overflow: hidden;
    margin-bottom: 10px;
  }
}

.header-content {
  display: flex;
  justify-content: space-between;
  height: auto;

  .flap {
    height: 0.2rem;
    width: 7rem;
    height: 0.5rem;
    position: relative;
    background-color: transparent;
  }

  .flap-none {
    background-color: none;
  }

  .flap-green {
    background-color: var(--green);
  }

  .flap-blue {
    background-color: var(--blue);
  }

  .flap-orange {
    background-color: var(--orange);
  }
  .flap-blueSkye {
    background-color: #fa2e59;
  }

  .container_button {
    cursor: pointer;
  }
}

.containerDetails {
  width: 100%;
  height: auto;
  background: var(--white);
  overflow: hidden;
  margin-top: 10px;

  span {
    font-size: 11px;
    color: var(--gray_text);
  }

  .info {
    margin: 25px 10px 10px 0;

    .boxText {
      margin-top: 10px;
      background-color: var(--gray);
      padding: 0.5rem;

      span {
        font-size: 15px;
        color: var(--gray_text);
      }
    }

    h3 {
      margin: 5x 0 5px 0;
      font-weight: 400;
    }
  }

  .processContent {
    gap: 20px;
    margin: 20px 0 20px 0;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));

    .processBox {
      border-radius: 7px;
      border: 1px solid var(--gray_text);
      padding: max(0.1rem, 0.5vw);

      .processFooter {
        margin-top: 10px;
        display: flex;
        justify-content: flex-end;
        width: 100%;
      }
    }
  }
}

.containerMain {
  width: 100%;
  display: flex;
}

.informs {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  flex-wrap: wrap;
  grid-gap: 30px;

  .inform {
    margin-bottom: 20px;
  }
}

.contentContainer {
  border-top: 0.1rem solid #e0e0e0;
  display: flex;
  width: 100%;
  height: 70px;
  align-items: center;
}
</style>
