<template>
    <div>
        <pre> {{ listAllHistoricSolicitations }}</pre>
      <Pagination :list="dataNewMold" @displayNewList="displayNewList"/>
    </div>
  </template>
  
  <script>
  import httpNovoMolde from '../../services/newMold/mold'
  import http from "~/services/newMold/mold";
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
            this.listAllHistoricSolicitations = res.data
        })
  
    }
  };
  </script>
  
  <style>
  </style>
  