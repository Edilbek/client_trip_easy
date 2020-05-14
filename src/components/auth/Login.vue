<template>
  <div class="login-form">
    <h2 class="login-heading">Вход</h2>
    <flash-message class="myCustomClass"></flash-message>
    <form action="#" @submit.prevent="login">
      <div class="">
        <label for="email">E-mail</label>
        <input type="email" name="email" id="email" class="login-input" v-model="email">
      </div>

      <div class="mb-more">
        <label for="password">Пароль</label>
        <input type="password" name="password" id="password" class="login-input" v-model="password">
      </div>

      <div class="">
        <button type="submit" class="btn-submit btn-success">Войти</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login() {
        this.$store.dispatch('retrieveToken', {
          email: this.email,
          password: this.password,
        })
          .then(response => {
            this.$router.push({ name: 'home' })
          })
          .catch(error => {
            if(error.response.status == 401) {
              this.flashError('Неправильный логин/пароль');
            }
          })
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/css/vue-flash-message.css"
</style>
