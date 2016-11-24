'use strict'
window.jQuery = window.$ = require('jquery')
require('materialize-css/dist/css/materialize.min.css')
import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'
import Materialize from 'materialize-css'
import Pokemon from './modules/pokemon/pokemon.vue'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'http://icon-icons.com/icons2/317/PNG/512/sign-error-icon_34362.png',
  loading: 'http://developercenter.robotstudio.com/Images/ajax_loader.gif',
  attempt: 1
})

var http = axios.create({
   baseURL: '',
});
Vue.prototype.$http = http



new Vue({
   el: '#app',
   render: h => h(App),
   components:{
      Pokemon,
   }
})
