<template>
    <div class="card-content">
      <div class="header-content">
        <div class="container_button" @click="openInfoCard">
          <img src="~/static/icons/arrowClosed.svg" v-if="infoCardStatus" />
          <img src="~/static/icons/arrowOpened.svg" v-else />
        </div>
      </div>

      <div class="containerMain">
        <div class="informs">
          <div class="inform">
            <h3>Cód.RRIM</h3>
            <p>{{ dataMold.ID }}</p>
          </div>
          <div class="inform">
            <h3>Cliente</h3>
            <p>{{ dataMold.CLIENTE }}</p>
          </div>
          <div class="inform">
            <h3>Molde</h3>
            <p>{{ dataMold.MOLDE }}</p>
          </div>
          <div class="inform">
            <h3>Fabricante do Molde</h3>
            <p v-if="dataMold.FABRICANTE_MOLDE === ''">Não informado</p>
            <p>{{ dataMold.FABRICANTE_MOLDE }}</p>
          </div>
          <div class="inform">
            <h3>Info do Molde</h3>
            <p>Chegada: {{ formatDate(dataMold.DT_CHEGADA_MOLDE, 1) }}</p>
            <p>Abertura: {{ formatDate(dataMold.DT_ABERTURA_MOLDE, 1) }}</p>
            
          </div>
          <div class="inform">
            <h3>Data Homologação</h3>
            <p>{{ formatDate(dataMold.created_at, 0) }}</p>
          </div>
        </div>
      </div>

      <transition name="slide-fade">
        <div class="contentContainer" v-if="infoCardStatus">
          <div style="display: flex; gap: 1rem;">
            <BtnPirula
              titleBtn="Solicitar Try-Out"
              color="RRIM"
              :dataMold="dataMold"
            />
            <Button
            titleBtn="Solicitar Modificação"
            color="RRIM"
            :dataMold="dataMold"
          />
          </div>
        </div>
      </transition>
    </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
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
      return (this.infoCardStatus = !this.infoCardStatus);
    },
    
    formatDate(date: string, plusDay: number) {
      return dayjs(date).add(plusDay, 'day').format('DD/MM/YY')
    }
  },
});
</script>

<style lang="scss" scoped>
.card-content {
    width: 100%;
    background: var(--white);
    padding: max(0.4rem, 1vw);
    border-radius: 7px;
    border: 1px solid var(--gray_text);
    overflow: hidden;
    margin-bottom: 10px;
  }
.header-content {
  display: flex;
  justify-content: flex-end;
  height: auto;

  .container_button {
    cursor: pointer;
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
    h3 {
      margin-bottom: 5px;
    }

    p {
      font-size: 14px;
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
