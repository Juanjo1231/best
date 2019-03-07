import Vue from 'vue'
import App from './App.vue'

let mainApp = new Vue({
  el: '#app',
  render: h => h(App)
})

Vue.set(mainApp, "globalData", {msg: "Main Title"})
