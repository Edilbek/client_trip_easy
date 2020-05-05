import Vue from 'vue'
import VueRouter from "vue-router";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import routes from './routes'
import Master from "./components/layouts/Master";

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router: router,
  components: { Master },
  template: '<Master/>'
})
