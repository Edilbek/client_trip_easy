<template>
  <ul v-if="cities && cities.length">
    <li v-for="city in cities" :key="city.id">
      <p>{{ city.name }}</p>
    </li>
  </ul>
</template>

<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        cities: []
      }
    },
    created() {
      axios.get(`http://localhost:3000/cities`)
        .then(response => {
          // JSON responses are automatically parsed.
          this.cities = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    name: "City"
  }
</script>

<style>

</style>
