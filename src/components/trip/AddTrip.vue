<template>
  <div class="login-form">
    <h2 class="login-heading">Добавление маршрута</h2>
    <form action="#" @submit.prevent="addTrip">
      <div class="">
        <label for="point_of_shipment">Точка отправки</label>
        <select v-model="point_of_shipment" class="login-input form-control mb-0" required="required">
          <option value="">Выберите город</option>
          <option v-for="city in cities" v-bind:value="city.id" :key="city.id" id="point_of_shipment" >
            {{ city.name }}
          </option>
        </select>
      </div>

      <div class="">
        <label for="destination">Конечная точка</label>
        <select v-model="destination" class="login-input form-control mb-0" required="required">
          <option value="">Выберите город</option>
          <option v-for="city in cities" v-bind:value="city.id" :key="city.id" id="destination">
            {{ city.name }}
          </option>
        </select>
      </div>

      <div class="">
        <label for="date_time">Дата</label>
        <Datepicker input-class="login-input" id="date_time" v-model="date_time" />
      </div>

      <div class="">
        <label for="price">Цена</label>
        <input type="number" name="price" id="price" class="login-input" v-model="price">
      </div>

      <div class="">
        <label for="amount_of_seats">Кол-во мест</label>
        <input type="number" name="amount_of_seats" id="amount_of_seats" class="login-input" v-model="amount_of_seats">
      </div>

      <div class="mb-more">
        <label for="free_seats">Свободных мест</label>
        <input type="number" name="free_seats" id="free_seats" class="login-input" v-model="free_seats">
      </div>

      <div class="mb-more">
        <button type="submit" class="btn-submit">Добавить</button>
      </div>
    </form>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker'
  import axios from 'axios';
  export default {
    data() {
      return {
        driver: '',
        point_of_shipment: '',
        destination: '',
        date_time: '',
        price: '',
        amount_of_seats: '',
        free_seats: '',
        cities: []
      }
    },
    methods: {
      addTrip() {
        this.$store.dispatch('addTrip', {
          driver: this.$store.getters.currentUser.id,
          point_of_shipment: this.point_of_shipment,
          destination: this.destination,
          date_time: this.date_time,
          price: parseInt(this.price),
          amount_of_seats: parseInt(this.amount_of_seats),
          free_seats: parseInt(this.free_seats),
        })
          .then((response) => {
            this.$router.push({name: 'showTrip'})
          })
      }
    },
    created() {
      axios.get(`http://localhost:3000/cities`)
        .then(response => {
          this.cities = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    computed: {
      currentUser() {
        return this.$store.getters.currentUser
      }
    },
    components: {
      Datepicker
    }
  }
</script>

<style>

</style>
