<template>

  <div class="box">
    <div class="content">
      <div class="header-content">
        <div :class="flagValidation(dataMold.homologation.status.description)"></div>
        <div class="container_button" @click="openInfoCard">
          <img src="~/static/icons/arrowClosed.svg" v-if="isOpenInfoCard" />
          <img src="~/static/icons/arrowOpened.svg" alt="" srcset="" v-else />
        </div>
      </div>
      <div class="containerMain">
        <div class="informs">
          <div class="inform">
            <h3>Cód. de TryOut</h3>
            <p>{{ dataMold.number_tryout }}</p>
          </div>
          <div class="inform">
            <h3>Cód. do Produto | SAP</h3>
            <p>{{ dataMold.code_sap }}</p>
          </div>
          <div class="inform">
            <h3>Desc. do Produto</h3>
            <p>{{ dataMold.desc_product }}</p>
          </div>
          <div class="inform">
            <h3>Cliente</h3>
            <p>{{ dataMold.client }}</p>
          </div>
          <div class="inform">
            <h3>Data</h3>
            <p>{{ dataMold.programmed_date }}</p>
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
            <p>{{ dataMold.injectionProcess.quantity }}</p>
          </div>

          <div class="inform">
            <h3>Técnico</h3>
            <p>{{ dataMold.injectionProcess.proc_technician }}</p>
          </div>

          <div class="inform">
            <h3>Motivo</h3>
            <p>{{ dataMold.reason }}</p>
          </div>
        </div>

        <div class="processContent">
          <div class="processBox">
            <h3>Mão de Obra</h3>
            <span>Descrição</span>
            <h4>{{ dataMold.injectionProcess.labor.description }}</h4>
            <div class="processFooter">
              <h4>Qtde: {{ dataMold.injectionProcess.labor.amount }}</h4>
            </div>
          </div>

          <div class="processBox">
            <h3>Molde</h3>
            <span>Descrição</span>
            <h4>{{ dataMold.injectionProcess.mold.desc_mold }}</h4>
            <div class="processFooter">
              <h4>Qtde Cav: {{ dataMold.injectionProcess.mold.number_cavity }}</h4>
            </div>
          </div>

          <div class="processBox">
            <h3>Matéria Prima</h3>
            <span>Descrição</span>
            <h4>{{ dataMold.injectionProcess.feedstock.description }}</h4>
            <div class="processFooter">
              <h4>Qtde: {{ dataMold.injectionProcess.feedstock.code }}</h4>
            </div>
          </div>
        </div>

        <div class="info" v-if="dataMold.homologation.status.description !== 'Revisao'">
          <span>Último Comentário realizado pelo PCP</span>
          <h3>Autor: {{dataMold.homologation.homologation_user.nome_completo}}</h3>
          <div class="boxText">
            <span>{{dataMold.homologation.comment}}</span>
          </div>
        </div>
      </div>

      <div class="contentContainer" v-if="isOpenInfoCard">
        <SlotBtn>
          <div class="containerPopUp" v-if="showPopUp">

          <form>
            <div class="popUp">
              <div class="headPopup">
                <div class="frameImg">
                  <img src="@/assets/img/formH.svg" alt="">
                </div>
                <h2>Deseja realmente Cancelar?</h2>
              </div>
              <div class="buttons">
                <button class="btnPopup" @click.prevent="showPopUp = false">Não</button>
                <BtnPirula titleBtn="Sim, Cancelar" color="pcp-approveds" v-if="$route.name === 'pcp-approveds'" :dataMold="dataMold"  @click="showPopUp = false"/>
              </div>
            </div>
        </form>

        </div>

          <button class="btnCancel" v-if="$route.name === 'pcp-approveds'" @click.prevent="showPopUp = true">Cancelar</button>

          <BtnPirula titleBtn="Revisar" color="Reprovado" v-if="dataMold.homologation.status.description === 'Reprovado' " :dataMold="dataMold" @updateCard="updateCard"/>
          
          <BtnPirula titleBtn="Gerar Relatório" color="Aprovado" v-if="dataMold.homologation.status.description === 'Aprovado' && $route.name !== 'pcp-approveds'" />
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
      showPopUp: false
    }
  },
  created: async function(){
    console.log(this.dataMold.homologation);
  },
  methods: {
    updateCard(){
      this.$emit('updateList')
    },
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
.btnCancel{
    min-width: 148px;
    height: 40px;
    padding: var(--paddingInput);
    border-radius: 2rem;
    color: var(--white);
    font-weight: var(--bold);
    font-size: 1rem;
    background-color: var(--blue);
}
.containerPopUp{
  background-color: rgba(38, 49, 141, 0.342);
  backdrop-filter: blur(2px);
  position: fixed;
  height: 100vh;
  width: 100%;
  z-index: 99;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  
  .popUp{
    background-color: var(--white);
    width: 30rem;
    height: 21rem;
    padding: 1rem;
    margin-top: 10rem;
    position: sticky;
    
    flex-direction: column;
    display: flex;
    justify-content: space-between;
    border-radius: .5rem;
    .headPopup{
      margin-bottom: 1rem;
      h2{
        margin-top: 1rem;
        font-size: 1.7rem;
      }
      .frameImg{
        height: 10rem;
        background-color: var(--blue);
        display: grid;
        justify-content: center;
        img{
          width: 18rem;
          position: relative;
          bottom: .5rem;
        }
      }
    }
    .buttons{
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      .btnPopup{
        width: fit-content!important;
        height: 40px;
        padding: 0.5rem 0.7rem;
        border-radius: 2rem;
        font-weight: var(--bold);
        font-size: 1rem;
        font-weight: var(--bold);
      }
    }
  }
}
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
