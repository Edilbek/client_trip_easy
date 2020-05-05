<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
  import Header from '../Header';
  import Footer from '../Footer';
  export default {
    components: {
      Header,
      Footer
    }
  }
</script>

<style lang="scss">
  .flex-center {
    display: flex;
    justify-content: center;
  }

  label {
    display: block;
    margin-bottom: 4px;
  }

  .login-heading {
    margin-bottom: 16px;
  }

  .form-control {
    margin-bottom: 24px;
  }

  .mb-more {
    margin-bottom: 42px;
  }

  .login-form {
    max-width: 500px;
    margin: auto;
  }

  .login-input {
    width: 100%;
    font-size: 16px;
    padding: 12px 16px;
    outline: 0;
    border-radius: 3px;
    border: 1px solid lightgrey;
  }

  .btn-submit {
    width: 100%;
    padding: 14px 12px;
    font-size: 18px;
    font-weight: bold;
    background: #60BD4F;
    color: white;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      background: darken(#60BD4F, 10%);
    }

    &:disabled {
      background: lighten(#60BD4F, 25%);
      cursor: not-allowed;
    }

  }
</style>
