<template>
    <nav class="navbar navbar-expand-md navbar-light bg-light">
        <router-link :to="{name: 'home'}" class="navbar-brand"><img src="../assets/logo1.png" alt=""></router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="#">Направления</a>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'cities' }" class="nav-link">Список городов</router-link>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Еще
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <router-link :to="{name: 'profile'}" class="dropdown-item" v-if="loggedIn">Профиль</router-link>
                        <a class="dropdown-item" href="#">Мои маршруты</a>
                        <a class="dropdown-item" href="#">Мои бронирования</a>
                        <a class="dropdown-item" href="#" v-if="loggedIn">{{currentUser.name}} {{currentUser.surname}}</a>
                    </div>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'about' }" class="nav-link">О нас</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'contact' }" class="nav-link">Контакты</router-link>
                </li>
            </ul>
            <ul class="navbar-nav authentication">
                <li class="nav-item" v-if="!loggedIn">
                    <router-link :to="{name: 'login'}" class="nav-link">Войти</router-link>
                </li>
                <li class="nav-item" v-if="!loggedIn">
                    <router-link :to="{name: 'register'}" class="nav-link">Регистрация</router-link>
                </li>
                <li class="nav-item" v-if="loggedIn">
                    <router-link :to="{name: 'logout'}" class="nav-link">Выйти</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "Header",
        computed: {
          loggedIn() {
            return this.$store.getters.loggedIn
          },
          currentUser() {
            return this.$store.getters.currentUser
          }
        }
    }
</script>

<style scoped>
  .authentication a {
    color: #1EC6B6 !important;
  }

  .authentication a:hover {
    color: #FF4A52 !important;
  }
</style>
