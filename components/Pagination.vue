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
    }
  },
  created() {
    setTimeout( () => {
      this.posts = this.list
      console.log("2 -> pagination render");
    }, 1000)
    
  
  },

  computed: {
    displayedPosts() {
      console.log("testeeee");
      return this.paginate(this.posts)
    },
  },

  methods: {
    setPages() {
      let numberOfPages = Math.ceil(this.posts.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
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
      this.$emit('displayNewList', newValue)
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