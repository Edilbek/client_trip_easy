<template>
  <div id="app">
    <Banner />
    <Search />
    <TripList />
    <PlaceList />
  </div>
</template>

<script>
  import Banner from './components/Banner';
  import Search from './components/Search';
  import TripList from "./components/TripList";
  import PlaceList from "./components/PlaceList";

  export default {
    name: 'app',
    components: {
      PlaceList,
      TripList,
      Banner,
      Search,
    }
  }
</script>

<style lang="scss">
  @import "./assets/scss/btn";
</style>
