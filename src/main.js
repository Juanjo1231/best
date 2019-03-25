import Vue from 'vue'
import App from './App.vue'

Vue.filter('timeToString', function (value) {
  if(value.constructor != Number) return value

  let hh     = Math.floor( value / 3600000 )
  let hh_mod = value % 3600000
  let mm     = Math.floor( hh_mod / 60000 )
  let mm_mod = hh_mod % 60000
  let ss     = Math.floor( mm_mod / 1000 )
  
  mm = mm < 10 ? `0${mm}` : mm
  ss = ss < 10 ? `0${ss}` : ss

  return hh > 0 ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`
})

new Vue({
  el: '#app',
  render: h => h(App)
})
