import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const api = {
  chuck_url: "https://api.chucknorris.io/"
};

function fetch (child, url = 0) {
  let queryUrl = api.chuck_url;
  if (url !== 0) queryUrl = url;

  return new Promise((resolve, reject) => {
    Vue.http.get(queryUrl + child).then(response => {
      // console.log(response)
      resolve(response);
    }, errResponse => {
      console.log('ERROR: ' + JSON.stringify(errResponse));
      reject(errResponse)
    });
  });
}

export function fetchSearchJoke(query) {
  return fetch(`jokes/search?query=${query}`)
}

export function fetchCategories() {
  return fetch(`jokes/categories`)
}

export function fetchRandomJoke(data) {
  let searchFields = '';

  if (typeof data.category !== 'undefined' && data.category !== null) {
    searchFields += '?category=' + data.category
  }

  if (searchFields.length > 0) {
    return fetch(`jokes/random${searchFields}`)

  } else {
    return fetch(`jokes/random`)
  }

}




