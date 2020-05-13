<template>
  <div v-if="isLoaded">
    <h4>Направление: {{trip.point_of_shipment.name}} - {{trip.destination.name}}</h4>
    <p>Дата: {{trip.date_time}}</p>
    <p>Дата: {{trip.time}}</p>
    <p>Цена: {{trip.price}}</p>
    <p>Всего мест: {{trip.amount_of_seats}}</p>
    <p>Свободных мест: {{trip.free_seats}}</p>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "ShowTrip",
    data() {
      return {
        id: this.$route.params.id,
        trip: {},
        isLoaded: false
      }
    },
    created() {
      axios.get(`http://localhost:3000/trips/` + this.id)
        .then(response => {
          this.trip = response.data
          this.isLoaded = true
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
</script>

<style scoped>

</style>
