<template>
  <div class="box">
    <div class="content">
      <div class="header-content">
        <div :class="flagValidation(data.homologation.status.id)">
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
            <p>{{ data.number_tryout }}</p>
          </div>
          <div class="inform">
            <h3>Cód. do Produto | SAP</h3>
            <p>{{ data.code_sap }}</p>
          </div>
          <div class="inform">
            <h3>Desc. do Produto</h3>
            <p>{{ data.desc_product }}</p>
          </div>
          <div class="inform">
            <h3>Cliente</h3>
            <p>{{ data.client }}</p>
          </div>
          <div class="inform">
            <h3>Data</h3>
            <p>{{ datas() }}</p>
          </div>
          <div class="inform">
            <h3>Máquina</h3>
            <p>{{ data.injectionProcess.machine.model }}</p>
          </div>

          <div class="inform" >
            <h3 v-if="data.reason.description === 'Modificação de Molde'">Código RGM</h3>
            <h3 v-else>Código NNP</h3>
            <p>{{ data.code }}</p>
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
            <p>{{ data.injectionProcess.quantity }}</p>
          </div>

          <div class="inform">
            <h3>Técnico</h3>
            <p>{{ data.injectionProcess.proc_technician }}</p>
          </div>

          <div class="inform">
            <h3>Motivo</h3>
            <p>{{ data.reason.description }}</p>
          </div>
        </div>

        <div class="processContent">
          <div class="processBox">
            <h3>Mão de Obra</h3>
            <span>Quantidade</span>
            <h4>{{ data.injectionProcess.labor.amount }}</h4>
          </div>

          <div class="processBox">
            <h3>Molde</h3>
            <span>Descrição</span>
            <h4>{{ data.injectionProcess.mold.desc_mold }}</h4>
            <div class="processFooter">
              <h4>
                Qtde Cav: {{ data.injectionProcess.mold.number_cavity }}
              </h4>
            </div>
          </div>
          <div class="processBox">
            <h3>Matéria Prima</h3>
            <span>Código - Descrição</span>
            <h4>{{ data.injectionProcess.feedstock.description }}</h4>
          </div>
        </div>

        <div class="info" v-if="data.homologation.status.id === 3">
          <h3><strong>Status: Aguardando Análise do PCP</strong></h3>
        </div>

        <div class="info" v-if="data.homologation.status.id !== 3">
          <span>Último Comentário realizado pelo PCP</span>
          <h3>
            Autor:{{ data.homologation.homologation_user.nome_completo }}
          </h3>
          <div class="boxText">
            <span>{{ data.homologation.comment }}</span>
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
                    <img src="@/assets/img/formH.svg" alt="" />
                  </div>
                  <h2>Deseja realmente Cancelar?</h2>
                </div>
                <div class="buttons">
                  <button class="btnPopup" @click.prevent="showPopUp = false">
                    Não
                  </button>

                  <BtnPirula titleBtn="Sim, Cancelar" color="pcp-approveds" v-if="$route.name === 'pcp-approveds'"
                    :data="data" @click="showPopUp = false" />
                </div>
              </div>
            </form>
          </div>

          <button class="btnCancel" v-if="$route.name === 'pcp-approveds'" @click.prevent="showPopUp = true">
            Cancelar
          </button>

            <BtnPirula 
            titleBtn="Revisar" 
            color="Reprovado" 
            @click.native="openModalRevisao()" 
            v-if="data.homologation.status.id === 2"
          />

          <BtnPirula titleBtn="Gerar Relatório" color="Aprovado" v-if="data.homologation.status.id === 1 &&
            $route.name === 'sol-modificacao'
            " @click.native="relTryout()" />
        </SlotBtn>
      </div>

      <ModalEng :displayModal="statusModal" :dataRevisao="data" @closeModal="closeModal"/>

    </div>
  </div>
</template>
  
<script>
import dayjs from "dayjs";
import Vue from "vue";

export default Vue.extend({
  layout: "mainFrame",

  props: {
    data: Object,
  },
  data() {
    return {
      isOpenInfoCard: false,
      statusModal: false,
      showPopUp: false,
    };
  },
  methods: {

    openModalRevisao() {
      this.statusModal = true
    },
    closeModal() {
      this.statusModal = false
    },

    flagValidation(data) {
      if (data == 1) {
        return "flap flap-green";
      } else if (data == 3) {
        return "flap flap-blue";
      } else if (data == 2) {
        return "flap flap-orange";
      } else if (data == 6) {
        return "flap flap-red"
      } else {
        return "flap flap-none";
      }
    },

    relTryout() {
      window.location.replace("http://185.209.179.253:9200/");
    },
    updateCard() {
      this.$emit("updateList");
    },

    datas(valor) {
      return dayjs(this.data.programmed_date)
        .locale("pt-br")
        .add(1, "day")
        .format("DD/MM/YYYY");
    },
    openInfoCard() {
      return (this.isOpenInfoCard = !this.isOpenInfoCard);
    },

    toggleButton() {
      if (this.status === "Aprovado") {
      }
    },

  },
});
</script>
  
<style lang="scss" scoped>
.btnCancel {
  min-width: 148px;
  height: 40px;
  padding: var(--paddingInput);
  border-radius: 2rem;
  color: var(--white);
  font-weight: var(--bold);
  font-size: 1rem;
  background-color: var(--blue);
}

.containerPopUp {
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

  .popUp {
    background-color: var(--white);
    width: 30rem;
    height: 21rem;
    padding: 1rem;
    margin-top: 10rem;
    position: sticky;

    flex-direction: column;
    display: flex;
    justify-content: space-between;
    border-radius: 0.5rem;

    .headPopup {
      margin-bottom: 1rem;

      h2 {
        margin-top: 1rem;
        font-size: 1.7rem;
      }

      .frameImg {
        height: 10rem;
        background-color: var(--blue);
        display: grid;
        justify-content: center;

        img {
          width: 18rem;
          position: relative;
          bottom: 0.5rem;
        }
      }
    }

    .buttons {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;

      .btnPopup {
        width: fit-content !important;
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
    background-color: var(--lilac);
  }

  .flap-green {
    background-color: var(--green);
  }

  .flap-blue {
    background-color: var(--blue);
  }

  .flap-red {
    background-color: var(--red);
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
      width: 100%;
      background: var(--white);
      padding: max(0.4rem, 1vw);
      border-radius: 7px;
      border: 1px solid var(--gray_text);
      overflow: hidden;
      margin-bottom: 10px;

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
  