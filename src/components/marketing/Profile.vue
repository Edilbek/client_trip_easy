<template>
  <div class="profile">
    <h3>{{ currentUser.name }} {{ currentUser.surname }}</h3>
    <p>{{currentUser.phone}}</p>
    <p>{{currentUser.gender}}</p>
    <p>{{currentUser.email}}</p>
    <p>{{currentUser.date_of_Birth}}</p>
    <p>{{currentUser.inf_about_yourself}}</p>
  </div>
</template>

<script>
  export default {
    name: 'Profile',
    computed: {
      currentUser() {
        return this.$store.getters.currentUser
      }
    }
  }
</script>

<style scoped>
  .profile {
    text-align: center;
  }
</style>
