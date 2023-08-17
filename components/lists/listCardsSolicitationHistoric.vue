<template>
    <div>
      <CardHistoricoSolicitacoes v-for="(item, index) in listAllHistoricSolicitations" :key="index" :data="item"/>
      <Pagination :list="dataNewMold" @displayNewList="displayNewList"/>
    </div>
  </template>
  
  <script>
  import httpNovoMolde from '../../services/newMold/mold'
  export default {
    data() {
      return {
        listAllHistoricSolicitations: {}
      };
    },
  
    methods: {
      displayNewList(e) {
        this.listPaginated = e;
      },
    },
  
    async created () {
        await httpNovoMolde.listAllHistoricModification(0, 10).then( (res) => {
            this.listAllHistoricSolicitations = res.data.result
            console.log(res)
        })
  
    }
  };
  </script>
  
  <style>
  </style>
  