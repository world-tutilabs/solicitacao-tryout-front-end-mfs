<template>
  <div>
    <CardNewModel v-for="mold in newMolds" :key="mold.id" :dataMold="mold" />

    <Pagination :list="newMolds" @displayNewList="displayNewList" />
  </div>
</template>

<script>
import http from '~/services/newMold/mold';
import CardNewModel from '../Cards/CardNewModel.vue';
import Pagination from '../Pagination.vue'

export default {
  components: { CardNewModel, Pagination },

  data() {
    return {
      newMolds: [],
      listPaginated: [],
    }
  },

  methods: {
    displayNewList(e) {
      
      this.listPaginated = e
    }
  },

  created: async function () {
    await http.listAllRRIM().then((res) => {
      this.newMolds = res.data
    }).catch((error) => {
      console.log(`Deu o erro: ${error}`);
    })
  }

}
</script>