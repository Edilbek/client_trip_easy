<template>
  <div>
    {{ $route.params.id }}
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "ShowTrip",
    data() {
      return {
        id: this.$route.params.id,
        trip: {}
      }
    },
    created() {
      axios.get(`http://localhost:3000/trips/` + this.id)
        .then(response => {
          this.trip = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
</script>

<style scoped>

</style>
