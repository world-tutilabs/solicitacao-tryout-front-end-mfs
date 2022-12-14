<template>
  <div class="box">
    <div class="content">
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
            <h3>Cód. do Molde</h3>
            <p>{{ dataMold.CODIGO_MOLDE }}</p>
          </div>
          <!-- <div class="inform">
            <h3>Descrição do Molde</h3>
            <p>XXXXXXXX</p>
          </div> -->
        </div>
      </div>

      <transition name="slide-fade">
        <div class="contentContainer" v-if="infoCardStatus">
          <SlotBtn>
            <BtnPirula titleBtn="Solicitar Try-Out" color="RRIM" :dataMold="dataMold"/>
          </SlotBtn>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
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
  },

});
</script>

<style lang="scss" scoped>
.box {
  background: var(--gray);
  padding: max(0.3rem, 1vw);
  border-radius: 0 10px 10px 10px;

  .content {
    width: 100%;
    background: var(--white);
    padding: max(0.4rem, 1vw);
    border-radius: 5px;
    border: 0.2rem solid #e0e0e0;
    overflow: hidden;
  }
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
