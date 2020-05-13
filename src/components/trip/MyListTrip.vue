<template>
  <ul>
    <li v-for="(trip, index) in myTrips" :key="trip.id">
      <router-link :to="{name: 'showTrip', params: {id: trip.id}}" class="nav-link">
        <b>{{index + 1}}: </b>
        <b>{{trip.point_of_shipment.name}} - {{trip.destination.name}}</b>
      </router-link>
    </li>
  </ul>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        myTrips: []
      }
    },
    created() {
      axios.post(`http://localhost:3000/trips/myTrips/`, {
        driver: this.$store.getters.currentUser.id
      })
        .then(response => {
          this.myTrips = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
</script>

<style scoped>
  li {
    list-style: none;
  }
</style>
