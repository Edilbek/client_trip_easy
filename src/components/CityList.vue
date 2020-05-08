<template>
  <div>

  </div>
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
          this.cities = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
</script>

<style>

</style>
