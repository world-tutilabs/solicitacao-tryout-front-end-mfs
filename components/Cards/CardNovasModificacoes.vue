<template>
  <div class="containerCard">
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
        <span>{{ dataListAllAprov.homologation.homologation_at }}</span>
      </label>

      <label for="">
        <h4>Descrição</h4>
        <span>{{ dataListAllAprov.reason.description }}</span>
      </label>
      <label for="">
        <h4>Homologado por</h4>
        <pre>{{ dataListAllAprov.homologation.homologation_user.nome }}</pre>
      </label>
    </div>

    <div>
      <Button titleBtn="Solicitar Modificação" @click.native="showModal" />
    </div>
    <div v-if="modal">
      <ModalSolicitarModificacoes
        :modalData="dataListAllAprov"
        @modalEmitStatus="closeModal"
        :dataRRIM="dataRRIM"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
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
    };
  },
  created: async function () {
    await http.listAll(5).then((res) => {
        this.dataRRIM = res.data;
        // console.log('teste', res.data);
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
  margin-top: 20px;

  .cardInformacoes {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
}
</style>