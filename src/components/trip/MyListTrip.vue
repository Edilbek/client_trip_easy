<template>
  <ul>
    <li v-for="trip in myTrips" :key="trip.id">
      {{trip.id}}
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
      axios.get(`http://localhost:3000/trips`)
        .then(response => {
          this.myTrips = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    computed: {
      currentUser() {
        return this.$store.getters.currentUser
      },
    }
  }
</script>

<style scoped>

</style>
