<template>
    <div class="fact"
         :title="$store.getters.isFactInFavourites(fact) ? 'Remove fact from favourites' : 'Add fact to favourites'"
         @click="$store.getters.isFactInFavourites(fact) ? removeFactFromFavourites(fact) : addToFavourites(fact)">
        <span v-if="showValue"><b>{{fact.value}} </b></span>
        <span>
            <i class="far fa-bookmark fa-lg favourite-button"
               :class="{'fas fa-bookmark is-favourite': $store.getters.isFactInFavourites(fact)}"></i>
        </span>
    </div>
</template>

<script>
  export default {
    props: {
      fact: {
        type: Object,
      },
      showValue: {
        type: Boolean,
        default: true
      }
    },
    name: "Fact",
    methods: {
      addToFavourites(fact) {
        this.$store.dispatch('ADD_FACT_TO_FAVOURITES', fact)
      },

      removeFactFromFavourites(fact) {
        this.$store.dispatch('REMOVE_FACT_FROM_FAVOURITES', fact)
      }
    }
  }
</script>

<style scoped>
    .fact b {
        color: white;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.9);
    }

    .fact:hover {
        cursor: pointer;
        opacity: 0.75;
    }

    .fact:hover .favourite-button {
        color: #ffc107;
    }

    .fact:hover .is-favourite {
        color: #dc3545;
    }

    .favourite-button:hover {
        cursor: pointer;
        opacity: 0.75;
        color: #ffc107;
    }

    .is-favourite {
        color: #ffc107;
    }

    .is-favourite:hover {
        color: #dc3545;
    }

</style>
