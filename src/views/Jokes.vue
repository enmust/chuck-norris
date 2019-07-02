<template>
    <div class="jokes container-fluid h-100 py-2">

        <!-- SWITCH and FILTER -->
        <b-row class="mt-3">
            <b-col md="6" class="my-1">
                <b-form-group label-cols-sm="2" label="Switch" class="mb-0">
                    <vs-switch id="switch" color="warning" v-model="showFavourites">
                        <span slot="off">Facts</span>
                        <span slot="on">Favourites</span>
                    </vs-switch>
                </b-form-group>
            </b-col>

            <b-col md="6" class="my-1">
                <b-form-group label-cols-sm="2" label="Filter" class="mb-0">
                    <b-input-group>
                        <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
                        <b-input-group-append>
                            <b-button :disabled="!filter" @click="clearFilter">Clear</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
            </b-col>
        </b-row>

        <!-- PAGINATION -->
        <b-row>
            <b-col md="6" class="my-1">
                <b-form-group label-cols-sm="2" label="Page" class="mb-0">
                    <b-pagination
                            v-model="currentPage"
                            :total-rows="showFavourites ? totalFavourites : totalFacts"
                            :per-page="perPage"
                            class="my-0"
                    ></b-pagination>
                </b-form-group>
            </b-col>

            <b-col md="6" class="my-1">
                <b-form-group label-cols-sm="2" label="Per page" class="mb-0">
                    <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
                </b-form-group>
            </b-col>
        </b-row>

        <!-- TABLE -->
        <b-table
                class="mt-2 jokes-table"
                dark
                hover
                responsive
                show-empty
                :empty-text="showFavourites ? 'You have not added any favourites. Go to main page or search jokes to add favourites.' : 'There are no records to show'"
                :items="showFavourites ? favourites : facts"
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                @filtered="onFiltered">

            <template slot="id" slot-scope="row" class="test">
                <i class="fas fa-check" :class="{'fa-check text-warning': $store.getters.isFactInFavourites(row.item), 'fa-times text-danger': !$store.getters.isFactInFavourites(row.item) }"></i>
            </template>

            <template slot="actions" slot-scope="row">
                <fact :fact="row.item" :show-value="false"/>
            </template>
        </b-table>

        <!-- PAGINATION -->
        <b-row v-if="showBottomPagination" class="mb-3">
            <b-col md="6" class="my-1">
                <b-form-group label-cols-sm="2" label="Page" class="mb-0">
                    <b-pagination
                            v-model="currentPage"
                            :total-rows="showFavourites ? totalFavourites : totalFacts"
                            :per-page="perPage"
                            class="my-0"
                    ></b-pagination>
                </b-form-group>
            </b-col>

            <b-col md="6" class="my-1">
                <b-form-group label-cols-sm="2" label="Per page" class="mb-0">
                    <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
                </b-form-group>
            </b-col>
        </b-row>

    </div>
</template>

<script>
  import Fact from "../components/Fact";
  export default {
    name: "Jokes",
    components: {Fact},
    computed: {
      facts() {
        return this.$store.state.searchResults
      },
      favourites() {
        return this.$store.state.favourites
      },

      showBottomPagination() {
        if (this.showFavourites) {
          return this.totalFavourites >= 50 && this.perPage >= 50
        } else {
          return this.totalFacts >= 50 && this.perPage >= 50
        }
      }
    },
    created() {
      if (typeof this.$route.params.showFavourites !== 'undefined') this.showFavourites = this.$route.params.showFavourites;
      // Set the initial number of total items
      if (typeof this.favourites !== 'undefined') this.totalFavourites = this.favourites.length;
      if (typeof this.facts !== 'undefined') this.totalFacts = this.facts.length
    },
    watch: {
      facts (newValue) {
          this.totalFacts = newValue.length;
          // If user had favourites open then change back to facts
          this.showFavourites = false
      },
      favourites (newValue) {
        this.totalFavourites = newValue.length
      },
    },
    data() {
      return {
        showFavourites: false,
        fields: [
          { key: 'value', label: 'Fact', sortable: true},
          { key: 'categories[0]', label: 'Category', sortable: true},
          { key: 'id', label: 'is Favourite'},
          { key: 'actions', label: 'Toggle favourites' }
        ],
        totalFavourites: 1,
        totalFacts: 1,
        currentPage: 1,
        perPage: 10,
        pageOptions: [5, 10, 15, 25, 50, 100],
        filter: null,

      }
    },
    methods: {
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        if (this.showFavourites) this.totalFavourites = filteredItems.length;
        else this.totalFacts = filteredItems.length;
        this.currentPage = 1
      },

      clearFilter() {
        this.filter = '';
        if (this.showFavourites) {
          if (typeof this.facts !== 'undefined') this.totalFacts = this.facts.length
        } else {
          if (typeof this.favourites !== 'undefined') this.totalFavourites = this.favourites.length
        }
      }
    }
  }
</script>

<style>
    th {
        white-space: nowrap;
    }

    .jokes-table tbody td:not(:first-child) {
        text-align: center;
    }
</style>
