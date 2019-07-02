<template>
  <div class="container-fluid h-100 py-2">

    <div class="row no-gutters">
      <div class="col-12 col-sm-6 col-xl-4 p-2 category-col"
           v-for="category in categories"
           :key="category">
        <category :header="category"/>
      </div>
    </div>

  </div>
</template>

<script>
import Category from "../components/Category";

export default {
  name: 'home',
  components: {Category},
  computed: {
    categories() {
      return this.$store.state.categories
    },
  },
  beforeCreate() {
    this.$store.dispatch('GET_FAVOURITES_FROM_STORAGE')
  },
  created() {
    this.$store.dispatch('FETCH_CATEGORIES')
  }
}
</script>

<style scoped>
  @media (min-width: 1200px) {
    .row .category-col:nth-child(5n + 1) {
      -webkit-box-flex: 0;
      flex: 0 0 50%;
      max-width: 50%;
    }

    .row .category-col:nth-child(5n + 2) {
      -webkit-box-flex: 0;
      flex: 0 0 50%;
      max-width: 50%;
    }
  }
</style>
