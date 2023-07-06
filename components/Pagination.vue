<template>
  <div class="containerBtn">
    <button v-if="page != 1" class="nextPrev" type="button" @click="backPage">
      <img src="~/static/icons/arrowClosed.svg" class="icon-prev" />
    </button>

    <div class="rowsBtn">
      <button
        v-for="pageNumber in pages.slice(page - 1, page + 5)"
        :key="pageNumber"
        class="btn-pagination"
        type="button"
        @click="page = pageNumber"
      >
        {{ pageNumber }}
      </button>
    </div>
    <button
      v-if="page < pages.length"
      class="nextPrev"
      type="button"
      @click="nextPage"
    >
      <img src="~/static/icons/arrowClosed.svg" class="icon-next" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array || Object,
      default: "",
    },
  },
  emits: ["displayedPosts"],
  data() {
    return {
      posts: [],
      page: 1,
      perPage: 10,
      pages: [],
    };
  },
  computed: {
    displayedPosts() {
      return this.paginate(this.posts);
    },
  },
  watch: {
    displayedPosts(newValue) {
      this.$emit("displayNewList", newValue);
    },
    posts() {
      this.setPages();
    },
  },

  created() {
    this.posts = this.list;
  },
  methods: {
    setPages() {
      const numberOfPages = Math.ceil(this.list.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(posts) {
      const page = this.page;
      const perPage = this.perPage;
      const from = page * perPage - perPage;
      const to = page * perPage;
      return posts.slice(from, to);
    },
    backPage() {
      this.$emit("backPage", this.page--);
    },
    nextPage() {
      // const pageAtual = this.page++;
      this.$emit("nextPage", this.page++);
    },
  },
};
</script>

  <style lang="scss" scoped>
.containerBtn {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
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
