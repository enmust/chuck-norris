import Vue from 'vue'
import Vuex from 'vuex'
import {fetchCategories, fetchRandomJoke, fetchSearchJoke} from "./assets/js/api/apiCalls";
import {toastError, toastSuccess} from "./assets/js/iziToast/iziToast";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    search: null,
    searchResults: [],
    categories: [],
    threeFacts: [],
    favourites: [],
    loadingCategories: []
  },
  mutations: {
    GET_FAVOURITES: (state) => {
      if (localStorage.getItem('favouriteFacts')) {
        try {
          const favouritesFromStorage = JSON.parse(localStorage.getItem('favouriteFacts'));
          Vue.set(state, 'favourites', favouritesFromStorage)
        } catch (err) {
          // If parsing error then remove from storage
          localStorage.removeItem('favouriteFacts')
        }
      }
    },

    SET_CATEGORIES: (state, {response}) => {
      Vue.set(state, 'categories', response.body)
    },

    SET_FACTS_TO_CATEGORY: (state, {threeFacts, category}) => {
      Vue.set(state.threeFacts, category, threeFacts)
    },

    SET_FACTS: (state, {results}) => {
      Vue.set(state, 'searchResults', results)
    },

    ADD_TO_FAVOURITES: (state, {fact}) => {
      if (state.favourites.find(favourite => favourite.id === fact.id)) {
        // Do nothing, already exists in favourites
      } else {
        state.favourites.push(fact);
        toastSuccess({text: 'Added fact to favourites! Category: <b>' + (fact.categories.length > 0 ? fact.categories : 'Uncategorized') + '</b>'})
      }
    },

    REMOVE_FROM_FAVOURITES: (state, {fact}) => {
      if (state.favourites.find(favourite => favourite.id === fact.id)) {
        state.favourites = state.favourites.filter(favourite => favourite.id !== fact.id);
        toastSuccess({text: 'Removed fact from favourites! Category: <b>' + (fact.categories.length > 0 ? fact.categories : 'Uncategorized') + '</b>'})
      }
    },

    SET_LOADING_STATE: (state, {category, isLoading}) => {
      console.log(category)
      console.log(isLoading)
      Vue.set(state.loadingCategories, category, isLoading)
    }

  },
  actions: {
    FETCH_CATEGORIES: ({commit}) => {
      return fetchCategories().then(response => commit('SET_CATEGORIES', {response}))
    },

    FETCH_THREE_FACTS: async ({commit, state}, category) => {
      let isLoading = true
      commit('SET_LOADING_STATE', { category, isLoading })

      let results = async function getRandomFacts(count, useCategory, list) {
        if (list.length >= 3) return list;

        let fact = useCategory ?
          await fetchRandomJoke({category: category}).then(response => {return response}, error => {return error}) :
          await fetchRandomJoke({}).then(response => {return response}, error => {return error});

        if (fact.status === 200) {
          if (list.find(joke => joke.id === fact.body.id)) {
            return await getRandomFacts(count + 1, false, list)
          } else {
            list.push(fact.body)
          }
        } else {
          if (typeof fact.body.error !== 'undefined') toastError({ text: '<b>' + fact.body.error + '</b>: ' + fact.body.message });
          else toastError({ text: 'Fetch random fact failed!' })
        }

        if (list.length >= 3) return list;
        else {
          if (fact.body.categories.length === 0) return await getRandomFacts(count + 1, false, list);
          else return await getRandomFacts(count + 1, true, list)
        }
      };

      let threeFacts = await results(0, true, []);

      isLoading = false
      commit('SET_LOADING_STATE', { category, isLoading })


      // for (let i = 0; i < 3; i++) {
      //   fetchRandomJoke({category: category}).then(response => {
      //     if (threeFacts.find(fact => fact.id === response.body.id)) {
      //       fetchRandomJoke({}).then(resp => {
      //         if (threeFacts.find(fact => fact.id === resp.body.id)) {
      //           fetchRandomJoke({}).then(re => {
      //             threeFacts.push(re.body)
      //           })
      //         } else {
      //           threeFacts.push(resp.body)
      //         }
      //       })
      //     } else {
      //       threeFacts.push(response.body)
      //     }
      //   })
      // }

      commit('SET_FACTS_TO_CATEGORY', {threeFacts, category})
    },

    FETCH_FACTS: async ({commit, state}, query) => {
      let data = await fetchSearchJoke(query).then(response => { return response }, error => { return error });

      if (data.status === 200) {
        const results = data.body.result;
        commit('SET_FACTS', { results })
      } else {
        if (typeof data.body.error !== 'undefined') toastError({ text: '<b>' + data.body.error + '</b>: ' + data.body.message });
        else toastError({ text: 'Search failed!' })
      }
    },

    ADD_FACT_TO_FAVOURITES: ({commit, state}, fact) => {
      commit('ADD_TO_FAVOURITES', {fact})
    },

    REMOVE_FACT_FROM_FAVOURITES: ({commit, state}, fact) => {
      commit('REMOVE_FROM_FAVOURITES', {fact})
    },

    GET_FAVOURITES_FROM_STORAGE: ({commit}) => {
      commit('GET_FAVOURITES')
    }
  },
  getters: {
    facts: (state) => (category) => {
      if (typeof state.threeFacts[category] !== 'undefined') {
        return state.threeFacts[category]
      } else {
        return []
      }
    },

    isFactInFavourites: (state) => (fact) => {
      return state.favourites.find(favourite => favourite.id === fact.id)
    },

    amountOfFavouritesInCategory: (state) => (category) => {
      return state.favourites.filter(favourite => favourite.categories.includes(category)).length
    },

    isSearching: (state) => (category) => {
      return state.loadingCategories[category]
    }
  }
});

store.subscribe((mutation, state) => {
  if (mutation.type === 'ADD_TO_FAVOURITES' || mutation.type === 'REMOVE_FROM_FAVOURITES') {
    localStorage.setItem('favouriteFacts', JSON.stringify(state.favourites))
  }
});

export default store
