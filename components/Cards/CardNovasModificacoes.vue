<template>
  <div class="containerCard">
    <div class="header-content">
        <div class="container_button" @click="openInfoCard">
          <img src="~/static/icons/arrowClosed.svg" v-if="infoCardStatus" />
          <img src="~/static/icons/arrowOpened.svg" v-else />
        </div>
      </div>

    <div class="cardInformacoes">
      <label for="">
        <h4>N. Tryout</h4>
        <span>{{ dataListAllAprov.number_tryout }}</span>
      </label>

      <label for="">
        <h4>Cód. SAP</h4>
        <span>{{ dataListAllAprov.code_sap }}</span>
      </label>

      <label for="">
        <h4>Cliente</h4>
        <span>{{ dataListAllAprov.client }}</span>
      </label>

      <label for="">
        <h4>Homologado em</h4>
        <span>{{ formatDate(dataListAllAprov.homologation.homologation_at, 1) }}</span>
      </label>

      <label for="">
        <h4>Descrição</h4>
        <span>{{ dataListAllAprov.reason.description }}</span>
      </label>
      <label for="">
        <h4>Homologado por</h4>
        <span>{{ dataListAllAprov.homologation.homologation_user.nome_completo }}</span>
      </label>
    </div>

    <div v-if="infoCardStatus" class="cardButton">
      <Button titleBtn="Solicitar Modificação" @click.native="showModal" />
    </div>
    <div v-if="modal">
      <ModalSolicitarModificacoes
        :modalData="dataListAllAprov"
        @modalEmitStatus="closeModal"
        :dataRRIM="dataRRIM"
      />
    </div>
  <!-- <pre>  {{ dataListAllAprov }}</pre> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import dayjs  from "dayjs"
import http from "~/services/newMold/mold";
export default Vue.extend({
  props: {
    dataListAllAprov: Array,
    modalEmitStatus: Boolean,
  },
  data() {
    return {
      modal: false,
      dataRRIM: {},
      infoCardStatus:false
    };
  },
  created: async function () {
    await http.listAll(1).then((res) => {
        this.dataRRIM = res.data;
      });
},
  methods: {
    async showModal() {
      this.modal = true;
      document.body.style.overflow = "hidden";
    
    },
    closeModal(e: boolean): void {
      this.modal = !this.modal;
      document.body.style.overflow = "auto";
    },
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
.containerCard {
  width: 100%;
  background: var(--white);
  padding: max(0.4rem, 1vw);
  border-radius: 7px;
  border: 1px solid var(--gray_text);
  overflow: hidden;
  margin-top: 10px;

  .cardInformacoes {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
  .header-content {
  display: flex;
  justify-content: flex-end;
  height: auto;

  .container_button {
    cursor: pointer;
  }

  
}
.cardButton{
    border-top: 0.1rem solid #e0e0e0;
  }
}
</style>