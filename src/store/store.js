import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://localhost:3000'

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
  },
  getters: {
    loggedIn(state) {
      return state.token !== null
    },
    currentUser(state) {
      return state.currentUser
    }
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token
    },
    retrieveUser(state, user) {
      state.currentUser = user
    },
    destroyToken(state) {
      state.token = null
      state.currentUser = null
    }
  },
  actions: {
    addTrip(context, data) {
      return new Promise((resolve, reject) => {
        axios.post('/trips', {
          driver: data.driver,
          point_of_shipment: data.point_of_shipment,
          destination: data.destination,
          date_time: data.date_time,
          price: data.price,
          amount_of_seats: data.amount_of_seats,
          free_seats: data.free_seats,
        })
          .then(response => {
            resolve(response)
            console.log(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    register(context, data) {
      return new Promise((resolve, reject) => {
        axios.post('/users', {
          email: data.email,
          password: data.password,
          name: data.name,
          surname: data.surname,
          gender: data.gender,
          date_of_Birth: data.date_of_Birth,
          phone: data.phone,
          inf_about_yourself: data.inf_about_yourself,
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    destroyToken(context) {
      axios.defaults.headers["Authorization"] = context.state.token

      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('/auth/logout')
            .then(response => {
              localStorage.removeItem('token')
              localStorage.removeItem('currentUser')
              context.commit('destroyToken')
              resolve(response)
            })
            .catch(error => {
              localStorage.removeItem('token')
              localStorage.removeItem('currentUser')
              context.commit('destroyToken')
              reject(error)
            })
        })
      }
    },
    retrieveToken(context, credentials) {
      return new Promise((resolve, reject) => {
        axios.post('/auth/login', {
          email: credentials.email,
          password: credentials.password,
        })
          .then(response => {
            const token = response.data.token
            const user = response.data.user

            localStorage.setItem('token', token)
            localStorage.setItem('currentUser', JSON.stringify(user))
            context.commit('retrieveToken', token)
            context.commit('retrieveUser', user)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
})
