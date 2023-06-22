<template>
  <div class="box">
    <div class="content">
        <div class="informs">
          <div class="inform">
            <h6>Cód.RRIM</h6>
            <span>{{ dataMold.ID }}</span>
          </div>
          <div class="inform">
            <h6>Molde</h6>
            <span>{{ dataMold.MOLDE }}</span>
          </div>
          <div class="inform">
            <h6>Cliente</h6>
            <span>{{ dataMold.CLIENTE }}</span>
          </div>
          <div class="inform">
            <h6>Molde - Chegada</h6>
            <span>{{ formatDate(dataMold.DT_CHEGADA_MOLDE) }}</span>
          </div>

          <div class="inform">
            <h6>Molde - Abertura</h6>
            <span>{{ formatDate(dataMold.DT_ABERTURA_MOLDE) }}</span>
          </div>
          <div class="inform">
            <h6>Técnico</h6>
            <span>{{ dataMold.homologacao[0].created_user.nome }} <br> {{ dataMold.homologacao[0].created_user.cargo }}</span>
          </div>
          <div class="inform">
            <h6>Homologado por</h6>
            <span>{{ dataMold.homologacao[0].homologation_user.nome }} <br> {{ dataMold.homologacao[0].homologation_user.cargo }}</span>
          </div>

          

      </div>
        <div class="contentContainer" >
            <BtnPirula titleBtn="Solicitar Try-Out" color="RRIM" :dataMold="dataMold"/>
        </div>
    </div>
  </div>

</template>

<script lang="ts">
import dayjs from "dayjs";
import Vue from "vue";


interface IData {
  infoCardStatus: boolean;
}

export default Vue.extend({
  layout: "mainFrame",

  props: {
    dataMold: Object,
  },

  data(): IData {
    return {
      infoCardStatus: false,
    };
  },

  methods: {
    openInfoCard(): boolean {
      return this.infoCardStatus = !this.infoCardStatus;
    },

    formatDate(date: Date) {
      return dayjs(date).add(1, 'day').format('DD/MM/YYYY')
    }
  },

});
</script>

<style lang="scss" scoped>
.box {
  padding: 1rem 0rem;

  .content {
    overflow: hidden;
    font-size: 0.8rem;
    width: 100%;
    background-color: var(--white);
    padding: max(.4rem, 1vw);
    border-radius: 7px;
    border: 1px solid var(--gray_text);
    overflow: hidden;
    min-height: 9.5rem;
    height: auto;
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
  margin: 10px 0 10px 0;

  .inform {
    span {
      font-size: 0.75rem;
      max-width: 17ch;
      width: 8rem;
    }

h6 {
  margin-bottom: 0;
  font-size: 1rem;
  width: 8rem;
  max-width: 17ch;
}
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
