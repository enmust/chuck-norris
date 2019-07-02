<template>
    <b-navbar type="dark" fixed="top" toggleable="sm">
        <b-navbar-brand :to="{ path: '/' }">
            <img src="https://assets.chucknorris.host/img/avatar/chuck-norris.png" alt="" height="40px">
            <span class="ml-1 d-none d-md-inline-block">Chuck Norris</span>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>

            <b-navbar-nav class="ml-auto">
                <b-nav-form>
                    <b-form-input class="mr-2 search-box" v-model="search" placeholder="Search jokes"></b-form-input>
                </b-nav-form>

                <b-nav-item class="favourite-link" :to="{ name: 'jokes', params: { showFavourites: true } }">
                    Favourites
                    <sup>
                        <i class="fas fa-bookmark text-warning"></i>
                        <b> {{amountOfFavourites}}</b>
                    </sup>
                </b-nav-item>
            </b-navbar-nav>

        </b-collapse>

    </b-navbar>
</template>

<script>
  export default {
    name: "AppHeader",
    data() {
      return {
        search: null
      }
    },
    beforeCreate() {
      this.$store.dispatch('GET_FAVOURITES_FROM_STORAGE')
    },
    computed: {
      amountOfFavourites() {
        return this.$store.state.favourites.length
      }
    },
    watch: {
      'search' (newValue) {
        if (newValue !== null && newValue.trim().length >= 3) {
          this.searchFacts(newValue)
        }
      }
    },
    methods: {
      searchFacts(query) {
        if (this.$route.name !== 'jokes') {
          this.$router.push({ name: 'jokes' })
        }
        this.$store.dispatch('FETCH_FACTS', query)
      }
    }
  }
</script>

<style scoped>
    nav {
        box-shadow: 0 -4px 10px #000;
        background-color: #212121;
    }

    .navbar-brand {
        font-size: 20px;
        font-weight: 500;
        letter-spacing: .02em;
    }

    .navbar-brand:hover {
        opacity: 0.75;
    }

    .nav-link {
        color: #fff !important;
        border-color: transparent;
        padding-bottom: 5px;
    }

    .nav-link:hover {
        border-bottom: 1px solid #f15b23;
        transition: border-color .15s ease-in-out;
    }

    .search-box {
        background-color: transparent;
        color: #fff;
        border: none;
        border-bottom: 1px solid #fff;
        border-radius: 0;
        -webkit-transition: border-color .15s ease-in-out;
        transition: border-color .15s ease-in-out;
    }

    .search-box::placeholder {
        color: rgba(255, 255, 255, 0.75);
    }

    .search-box:focus {
        background-color: unset;
        color: #fff;
        box-shadow: unset;
        border-color: #f15b23;
    }

    .favourite-link {
        white-space: nowrap;
    }

</style>
