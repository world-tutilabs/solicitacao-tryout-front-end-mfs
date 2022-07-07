<template>

  <div class="box">
    <div class="content">
      <div class="header-content">
        <div :class="flagValidation()"></div>
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
            <p>{{ dataMold.solicitation.programmed_date }}</p>
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
            <p>{{ dataMold.solicitation.reason }}</p>
          </div>
        </div>

        <div class="processContent">
          <div class="processBox">
            <h3>Mão de Obra</h3>
            <span>Descrição</span>
            <h4>{{ dataMold.solicitation.injectionProcess.labor.description}}</h4>
            <div class="processFooter">
              <h4>Qtde: {{ dataMold.solicitation.injectionProcess.labor.amount}}</h4>
            </div>
          </div>

          <div class="processBox">
            <h3>Molde</h3>
            <span>Descrição</span>
            <h4>{{ dataMold.solicitation.injectionProcess.mold.desc_mold}}</h4>
            <div class="processFooter">
              <h4>Qtde Cav: {{ dataMold.solicitation.injectionProcess.mold.number_cavity}}</h4>
            </div>
          </div>

          <div class="processBox">
            <h3>Matéria Prima</h3>
            <span>Descrição</span>
            <h4>{{ dataMold.solicitation.injectionProcess.feedstock.description}}</h4>
            <div class="processFooter">
              <h4>Qtde: {{ dataMold.solicitation.injectionProcess.feedstock.code}}</h4>
            </div>
          </div>
        </div>

      </div>

      <div class="contentContainer" v-if="isOpenInfoCard">
        <SlotBtn>
          <!-- <BtnPirula :color="statusOrigin" titleBtn="Gerar Relatório" v-if="statusOrigin === 'Aprovado'" />
          <BtnPirula :color="statusOrigin" titleBtn="Revisar Solicitação" v-if="statusOrigin === 'Reprovado'" />
          <BtnPirula :color="statusOrigin" titleBtn="Cancelar" v-if="statusOrigin === 'PCP'" /> -->
        </SlotBtn>
      </div>
    </div>
  </div>

</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  layout: 'mainFrame',

  props: {
    dataMold: Object,
  },
  data() {
    return {
      isOpenInfoCard: false,
      btnStatus: this.status,
    }
  },
  methods: {
    openInfoCard() {
      return this.isOpenInfoCard = !this.isOpenInfoCard
    },

    toggleButton() {
      if (this.status === 'Aprovado') {
        console.log('Teste')
      }
    },

    flagValidation(data) {
      if (data == 'Aprovado') {
        return 'flap flap-green'
      } else if (data == 'Revisao') {
        return 'flap flap-blue'
      } else if (data == 'Reprovado') {
        return 'flap flap-orange'
      } else {
        return 'flap flap-none'
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.box {
  background: var(--gray);
  padding: max(0.3rem, 1vw);

  .content {
    width: 100%;
    background: var(--white);
    padding: max(0.4rem, 1vw);
    border-radius: 1rem;
    border: 0.2rem solid #e0e0e0;
    overflow: hidden;
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
      background-color: var(--gray);
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
