<template>
  <div class="containerMain">
    <Navbar />
    <div class="frame">
      <div class="contentInform">
        <CardFilters />
        <CalendarButton v-if="showCalendarButton" />
      </div>
      <div class="btnSolicitation">
        <RequestButton
          :titleBtn="titleBtn"
          v-if="showRequestButton"
          @click.native="modalStatus = !modalStatus"
        />
        <ModalForm :displayModal="modalStatus" @closeModal="closeModal" />
      </div>
      <SubtitleRouter />
      <Nuxt />
    </div>
    <SubtitleFooter />
    <Footer />
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      titleBtn: "",
      modalStatus: false,
    };
  },

  computed: {
    showRequestButton() {
      if (this.$route.name === "modifications") {
        return (this.titleBtn = "Solicitar Modificação de Molde");
      }
      if (this.$route.name === "resin-test") {
        return (this.titleBtn = "Solicitar Teste de Resina");
      }
    },

    showCalendarButton() {
      if (
        this.$route.name === "modifications" ||
        this.$route.name === "resin-test" ||
        this.$route.name === "index"
      ) {
        return true;
      }
    },
  },
  methods: {
    closeModal() {
      this.modalStatus = !this.modalStatus;
    },
  },
  // watch:{
  //   modalStatus(newValue){
  //     let scrollBody = document.body
  //     if(newValue == true){
  //       scrollBody.style.overflow = 'hidden'
  //     }else{
  //       scrollBody.style.overflow = 'scroll'
  //     }
  //   }
  // }
});
</script>

<style lang="scss" scoped>
.frame {
  width: 100%;
  min-height: 80vh;
  margin-top: 7vh;
  padding: 1rem var(--negativeSpace);

  .contentInform {
    display: flex;
    justify-content: space-between;
    border-bottom: 3px solid var(--gray);
    padding-bottom: 0.8rem;
    margin-bottom: 0.8rem;
  }

  .btnSolicitation {
    width: 100%;
  }
}
</style>
