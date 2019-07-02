import Vue from 'vue';
import VueIziToast from 'vue-izitoast'
import 'izitoast/dist/css/iziToast.min.css'

Vue.use(VueIziToast)

export function toastSuccess(data) {
  if (data.timeout === undefined) data.timeout = 2000

  Vue.prototype.$toast.success(data.text, 'OK', {
    position: 'bottomRight',
    timeout: data.timeout,
    closeOnEscape: true,
    pauseOnHover: false,
    displayMode: 'replace'
  })
}

export function toastError(data) {
  if (data.timeout === undefined) data.timeout = 5000

  Vue.prototype.$toast.error(data.text, 'Error', {
    position: 'bottomRight',
    timeout: data.timeout,
    closeOnEscape: true,
    pauseOnHover: false,
    displayMode: 'replace'
  })
}

export function toastInfo(data) {
  if (data.timeout === undefined) data.timeout = 2000

  Vue.prototype.$toast.info(data.text, 'Info', {
    position: 'bottomRight',
    timeout: data.timeout,
    pauseOnHover: false
  })
}



