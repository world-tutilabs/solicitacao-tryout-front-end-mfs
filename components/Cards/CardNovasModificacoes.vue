<template>
  <div class="containerCard">
    <div v-for="(data, index) in dataListAllAprov" :key="index" class="cardInformacoes">
      <!-- <pre>{{ data }}</pre> -->
      <label for="">
        <h4>N. Tryout</h4>
        <span>{{ data.number_tryout }}</span>
      </label>

      <label for="">
        <h4>Cód. SAP</h4>
        <span>{{ data.code_sap }}</span>
      </label>

      <label for="">
        <h4>Cliente</h4>
        <span>{{ data.client }}</span>
      </label>

      <label for="">
        <h4>Data Programada</h4>
        <span>{{ data.programmed_date }}</span>
      </label>

      <label for="">
        <h4>Descrição</h4>
        <span>{{ data.reason.description }}</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    dataListAllAprov: Array,
  },
  data() {},
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
  margin-bottom: 10px;

  .cardInformacoes{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
}
</style>