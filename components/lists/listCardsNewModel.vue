<template>
  <div v-if="$fetchState.pending">
    <Loading />
  </div>

  <div v-else>
    <CardNewModel v-for="mold in newMolds" :key="mold.id" :dataMold="mold" />
    <Pagination :list="newMolds" @displayNewList="displayNewList" />
  </div>
</template>

<script>
import http from '~/services/newMold/mold';
import CardNewModel from '../Cards/CardNewModel.vue';
import Pagination from '../Pagination.vue'
import Loading from '../Loading.vue';

export default {
  components: { CardNewModel, Pagination, Loading },

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

  async fetch() {
    await http.listAllRRIM().then((res) => {
      this.newMolds = res.data
    }).catch((error) => {
      console.log(`Deu o erro: ${error}`);
    })
  }

}
</script>