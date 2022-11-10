<template>
  <div class="containerBtn">

    <button class="nextPrev" type="button" v-if="page != 1" @click="page--"><img src="~/static/icons/arrowClosed.svg"
        class="icon-prev" /></button>

    <div class="rowsBtn">
      <button class="btn-pagination" type="button" v-for="pageNumber in pages.slice(page - 1, page + 5)"
        :key="pageNumber" @click="page = pageNumber">
        {{ pageNumber }}
      </button>
    </div>

    <button class="nextPrev" type="button" @click="page++" v-if="page < pages.length"><img
        src="~/static/icons/arrowClosed.svg" class="icon-next" /></button>
  </div>
</template>

<script>
export default {
  props: ['list'],
  emits: ['displayedPosts'],

  data() {
    return {
      posts: [],
      page: 1,
      perPage: 10,
      pages: [],
      teste : 0
    }
  },

  created() {
    this.posts = this.list
  },


  computed: {
    displayedPosts() {
      return this.paginate(this.posts)
    },
  },

  methods: {
    setPages() {
      if(this.posts.length > 0){
      this.teste = Math.ceil(this.posts[0].ID / 10)


    //   let numberOfPages = Math.ceil(this.posts.length / this.perPage);
      for (let index = 1; index <= this.teste; index++) {
        this.pages.push(index);
      }
    }
    },
    paginate(posts) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return posts.slice(from, to);
    },
  },

  watch: {
    displayedPosts(newValue) {


      this.$emit('displayNewList', {
          page:  (this.page * 10) - 10,
          offset: (this.page * 10)
      })
    },
    posts() {
      this.setPages();
    },
  },

}
</script>

<style lang="scss" scoped>
.containerBtn {
  margin-top: 1rem;
  display: flex;
  gap: .5rem;

  .rowsBtn {
    background-color: var(--gray);
    width: fit-content;
    border-radius: 2rem;
    padding: 0rem 1.5rem;

  }

  .nextPrev {
    border-radius: 50%;
    min-width: 40px;
    width: 40px;

    .icon-prev {
      transform: rotate(-90deg);
    }

    .icon-next {
      transform: rotate(90deg);
    }
  }

  .btn-pagination {
    cursor: pointer;
    min-width: 40px;
    width: 40px;
    height: 40px;
    margin: 2px;
    color: var(--black_text);
    font-weight: 600;
    font-size: 1.1rem;
    border-radius: 50%;
    background-color: var(--gray);
  }

  .btn-pagination:focus {
    background-color: var(--gray_text);
    color: var(--white);
  }
}
</style>
