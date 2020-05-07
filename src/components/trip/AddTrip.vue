<template>
  <div class="login-form">
    <h2 class="login-heading">Добавление маршрута</h2>
    <form action="#" @submit.prevent="addTrip">
      <div class="">
        <label for="point_of_shipment">Точка отправки</label>
        <input type="text" name="point_of_shipment" id="point_of_shipment" class="login-input" v-model="point_of_shipment">
      </div>

      <div class="">
        <label for="destination">Конечная точка</label>
        <input type="text" name="destination" id="destination" class="login-input" v-model="destination">
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
  import Datepicker from 'vuejs-datepicker';
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
      }
    },
    methods: {
      addTrip() {
        this.$store.dispatch('addTrip', {
          driver: 52,
          point_of_shipment: 2,
          destination: 3,
          date_time: this.date_time,
          price: parseInt(this.price),
          amount_of_seats: parseInt(this.amount_of_seats),
          free_seats: parseInt(this.free_seats),
        })
          .then(response => {
            this.$router.push({ name: 'home' })
          })
      }
    },
    components: {
      Datepicker
    }
  }
</script>

<style>

</style>
