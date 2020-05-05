<template>
  <div class="login-form">
    <h2 class="login-heading">Регистрация</h2>
    <form action="#" @submit.prevent="register">

      <div class="">
        <label for="name">Имя</label>
        <input type="text" name="name" id="name" class="login-input">
      </div>

      <div class="">
        <label for="email">E-mail</label>
        <input type="email" name="email" id="email" class="login-input">
      </div>

      <div class="mb-more">
        <label for="password">Пароль</label>
        <input type="password" name="password" id="password" class="login-input">
      </div>

      <div class="">
        <button type="submit" class="btn-submit">Создать</button>
      </div>

    </form>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss">
</style>
