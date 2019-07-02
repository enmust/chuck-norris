<template>
    <div class="card" :class="{'empty': !isFull(header)}"
         :style="'background-image: url(' + image[header] + ')'"
         @click="showThreeRandomFacts(header, 'CARD')"
         :title="!isFull(header) ? 'Click to fetch 3 random facts about Chuck Norris' : 'Press refresh to get new facts'">

        <div class="card-body p-0">

            <div class="card-title row">
                <span class="col">
                    <h3 class="d-inline">
                        <b class="text-capitalize">{{ header }}</b>
                    </h3>
                    <sup class="pl-1 custom-sup">
                        <i class="fas fa-bookmark text-warning"></i>
                        <b> {{$store.getters.amountOfFavouritesInCategory(header)}}</b>
                    </sup>
                </span>

                <span class="text-right col">
                    <i v-show="$store.getters.isSearching(header) || isFull(header)"
                       class="fas fa-redo-alt ml-2 text-white refresh-button h3"
                       :class="{ 'fast-spin': $store.getters.isSearching(header) }"
                       @click="showThreeRandomFacts(header, 'REFRESH')"
                       title="Click to fetch 3 random facts about Chuck Norris"></i>
                </span>
            </div>

            <p class="card-text" v-for="fact in $store.getters.facts(header)">
                <fact :fact="fact"/>
            </p>

        </div>
    </div>
</template>

<script>
  import Fact from "./Fact";

  export default {
    components: {Fact},
    props: {
      header: {
        type: String,
        default: ''
      }
    },
    name: "Category",
    data() {
      return {
        image: {
          animal: require('@/assets/images/animal_category.jpg'),
          dev: require('@/assets/images/dev_category.png'),
          career: require('@/assets/images/career_category.jpg'),
          celebrity: require('@/assets/images/celebrity_category.jpg'),
          explicit: require('@/assets/images/explicit_category.png'),
          fashion: require('@/assets/images/fashion_category.jpg'),
          food: require('@/assets/images/food_category.jpg'),
          history: require('@/assets/images/history_category.jpg'),
          money: require('@/assets/images/money_category.jpg'),
          movie: require('@/assets/images/movie_category.jpg'),
          music: require('@/assets/images/music_category.jpg'),
          political: require('@/assets/images/political_category.jpg'),
          religion: require('@/assets/images/religion_category.jpg'),
          science: require('@/assets/images/science_category.jpg'),
          sport: require('@/assets/images/sport_category.jpg'),
          travel: require('@/assets/images/travel_category.jpg'),
        }
      }
    },
    methods: {
      showThreeRandomFacts(category, element) {
        if (!this.isFull(category)) {
          this.$store.dispatch('FETCH_THREE_FACTS', category)
        } else if (this.isFull(category) && element === 'REFRESH') {
          this.$store.dispatch('FETCH_THREE_FACTS', category)
        } else {
          // Do nothing
        }
      },

      isFull(category) {
        return this.$store.getters.facts(category).length > 0
      }
    }
  }
</script>

<style scoped>
    .card {
        height: 100%;
        min-height: 258px;
        background-size: cover;
        background-color: #f15b23;
        padding: 1rem;
        transition: all 0.25s ease-in-out;
        opacity: 0.95;
        border: unset;
    }

    .empty:hover {
        cursor: pointer;
        opacity: 0.8;
    }

    .refresh-button:hover {
        cursor: pointer;
        opacity: 0.8;
        color: #f15b23 !important;
    }

    .card b {
        color: white;
        text-shadow: 0 1px 9px rgba(82, 73, 73, 0.85);
    }

    .custom-sup {
        font-size: unset;
        top: -.9em;
        white-space: nowrap;
    }

    .fast-spin {
        -webkit-animation: fa-spin 0.75s infinite linear;
        animation: fa-spin 0.75s infinite linear;
    }

</style>
