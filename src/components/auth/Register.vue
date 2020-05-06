<template>
  <div class="login-form">
    <h2 class="login-heading">Регистрация</h2>
    <form action="#" @submit.prevent="register">

      <div class="">
        <label for="name">Имя</label>
        <input type="text" name="name" id="name" class="login-input" v-model="name">
      </div>

      <div class="">
        <label for="surname">Фамилия</label>
        <input type="text" name="surname" id="surname" class="login-input" v-model="surname">
      </div>

      <div class="">
        <label for="phone">Номер телефона</label>
        <input type="text" name="phone" id="phone" class="login-input" v-model="phone">
      </div>

      <div class="">
        <label for="date_of_Birth">Дата рождения</label>
        <Datepicker input-class="login-input" id="date_of_Birth" v-model="date_of_Birth" />
      </div>

      <div class="">
        <label for="email">E-mail</label>
        <input type="email" name="email" id="email" class="login-input" v-model="email" >
      </div>

      <div class="">
        <label for="password">Пароль</label>
        <input type="password" name="password" id="password" class="login-input" v-model="password">
      </div>

      <div class="">
        <label for="male">Пол</label>
        <input type="radio" name="gender" value="Male" id="male" v-model="gender"> Мужчина<br>
        <input type="radio" name="gender" value="Female" id="female" v-model="gender"> Женищина<br>
      </div>

      <div class="mb-more">
        <label for="inf_about_yourself">Информация о себе</label>
        <textarea name="inf_about_yourself" id="inf_about_yourself" class="login-input" rows="4" v-model="inf_about_yourself"/>
      </div>

      <div class="mb-more">
        <button type="submit" class="btn-submit">Создать</button>
      </div>

    </form>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker';
  export default {
    data() {
      return {
        name: '',
        surname: '',
        phone: '',
        date_of_Birth: '',
        email: '',
        password: '',
        gender: '',
        inf_about_yourself: '',
      }
    },
    methods: {
      register() {
        this.$store.dispatch('register', {
          email: this.email,
          password: this.password,
          name: this.name,
          surname: this.surname,
          gender: this.gender,
          date_of_Birth: this.date_of_Birth,
          phone: this.phone,
          inf_about_yourself: this.inf_about_yourself
        })
          .then(response => {
            this.$router.push({ name: 'login' })
          })
      }
    },
    components: {
      Datepicker
    }
  }
</script>

<style lang="scss">
</style>
