<template>
  <div>
    <h1>Pagina em desenvolvimento</h1>
    <pre>{{ listAllReportApproveds }}</pre>
    

    <!-- <CardModel
      v-for="mold in listPaginated"
      :key="mold.id"
      :statusOrigin="mold.origin"
      :flag="mold.flag"
      :typeCard="mold.typeCard"
    /> -->

    <Pagination :list="dataNewMold" @displayNewList="displayNewList"/>
  </div>
</template>

<script>
import httpNovoMolde from '../../services/newMold/mold'
export default {
  data() {
    return {
      listAllReportApproveds: []
    };
  },

  methods: {
    displayNewList(e) {
      this.listPaginated = e;
    },
  },

  async created () {

    await httpNovoMolde.listAllAproveds(0, 10, 5).then((res) => {
      this.listAllReportApproveds = res.data
    })
  }
};
</script>

<style>
</style>
