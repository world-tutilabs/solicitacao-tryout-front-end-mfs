<template>
  <div>

    <CardNovasModificacoes v-for="(data, index) in listAllReportApproveds" :key="index" :dataListAllAprov="data" />


    <Pagination :list="dataNewMold" @displayNewList="displayNewList"/>
  </div>
</template>

<script>
import httpNovoMolde from '../../services/newMold/mold'
import http from "~/services/newMold/mold";
export default {
  data() {
    return {
      listAllReportApproveds: {}
    };
  },

  methods: {
    displayNewList(e) {
      this.listPaginated = e;
    },
  },

  async created () {

    await httpNovoMolde.listAllAproveds(0, 10, 5).then((res) => {
      this.listAllReportApproveds = res.data.result
      console.log(this.listAllReportApproveds)
    });
    await http.listAllRRIM(0, this.countPage, 2).then((res) => {
      this.listSearch = res.data.list;
    });

  }
};
</script>

<style>
</style>
