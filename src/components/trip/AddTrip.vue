<template>
  <div class="row col-md-12">
    <div class="col-md-5">
      <h2 class="login-heading">Добавление маршрута</h2>
      <form action="#" @submit.prevent="addTrip">
        <div class="">
          <label for="point_of_shipment">Точка отправки</label>
          <select v-model="point_of_shipment" class="login-input form-control mb-0" required="required"
            id="point_of_shipment">
            <option v-for="city in cities" :value="city.id" :key="city.id">
              {{ city.name }}
            </option>
          </select>
        </div>

        <div>
          <label for="waypoints">Промежуточные точки</label>
          <select v-model="waypoints" class="login-input form-control mb-0" multiple="true" id="waypoints">
            <option v-for="city in cities" :value="city.id" :key="city.id">
              {{ city.name }}
            </option>
          </select>
        </div>

        <div class="">
          <label for="destination">Конечная точка</label>
          <select v-model="destination" class="login-input form-control mb-0" required="required"
            id="destination">
            <option v-for="city in cities" :value="city.id" :key="city.id">
              {{ city.name }}
            </option>
          </select>
        </div>

        <div class="mt-2">
          <button type="button" class="btn-primary btn-sm" @click='runGmap'>Показать на карте</button>
        </div>

        <div class="">
          <label for="date_time">Дата</label>
          <Datepicker input-class="login-input" id="date_time" v-model="date_time" />
        </div>

        <div class="">
          <label for="time">Время</label>
          <input type="text" name="time" id="time" class="login-input" v-model="time">
        </div>

        <div class="">
          <label for="price">Цена</label>
          <input type="number" name="price" id="price" class="login-input" v-model="price">
        </div>

        <div class="">
          <label for="amount_of_seats">Кол-во мест</label>
          <input type="number" name="amount_of_seats" id="amount_of_seats" class="login-input" v-model="amount_of_seats">
        </div>

        <div class="mb-more">
          <label for="free_seats">Свободных мест</label>
          <input type="number" name="free_seats" id="free_seats" class="login-input" v-model="free_seats">
        </div>

        <div class="mb-more">
          <button type="submit" class="btn-submit">Добавить</button>
        </div>
      </form>
    </div>
    <div class="col-md-7">
      <div id="map">
        <GmapMap
          :center="{lat:41.5, lng:74.5}"
          :zoom="6.7"
          map-type-id="roadmap"
          style="width: 100%; height: 500px"
          class="mt-3"
          ref="googleMap"
        >
          <GmapMarker
            :key="index"
            v-for="(c, index) in cities"
            :position="c.position"
            :clickable="true"
            :draggable="true"
            @click="center=c.position"
          />
        </GmapMap>
        <div id="directions-panel"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker'
  import axios from 'axios';
  import * as VueGoogleMaps from 'vue2-google-maps'


  export default {
    data() {
      return {
        driver: '',
        point_of_shipment: 4,
        destination: 4,
        date_time: '',
        time: '',
        price: '',
        amount_of_seats: '',
        free_seats: '',
        waypoints: [],
        cities: [],
      }
    },
    methods: {
       addTrip() {
        this.$store.dispatch('addTrip', {
          driver: this.$store.getters.currentUser.id,
          point_of_shipment: this.point_of_shipment,
          destination: this.destination,
          date_time: this.date_time,
          time: this.time,
          waypoints: this.waypoints,
          price: parseInt(this.price),
          amount_of_seats: parseInt(this.amount_of_seats),
          free_seats: parseInt(this.free_seats),
        })
          .then((response) => {
            this.$router.push({name: 'myTrips'})
          })
      },
      runGmap() {
        const requestOne = axios.get(`http://localhost:3000/cities/` + this.point_of_shipment);
        const requestTwo = axios.get(`http://localhost:3000/cities/` + this.destination);

        const requestThree = axios.post(`http://localhost:3000/cities/waypoints/byIds`, {
           waypoints: this.waypoints
        });

        axios.all([requestOne, requestTwo, requestThree])
          .then(
            axios.spread((...responses) => {
              getPointsAttr(responses[0].data.attribute, responses[1].data.attribute, responses[2].data)
            })
          )
          .catch(errors => {
            console.error(errors);
          });

        const getPointsAttr = (pointAttr, destinationAttr, waypointsAttr) => {
          let directionsService = new google.maps.DirectionsService
          let directionsRenderer = new google.maps.DirectionsRenderer

          directionsRenderer.setMap(this.$refs.googleMap.$mapObject);
          this.calculateAndDisplayRoute(directionsService, directionsRenderer, pointAttr, destinationAttr, waypointsAttr);
        }
      },
      calculateAndDisplayRoute(directionsService, directionsRenderer, pointAttr, destinationAttr, waypointsAttr) {
        let waypts = [];

        for (let i = 0; i < waypointsAttr.length; i++) {
          waypts.push({
            location: waypointsAttr[i],
            stopover: true
          });
        }

        directionsService.route({
          origin: pointAttr,
          destination: destinationAttr,
          waypoints: waypts,
          optimizeWaypoints: true,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsRenderer.setDirections(response);
            let route = response.routes[0];
            let summaryPanel = document.getElementById('directions-panel');
            summaryPanel.innerHTML = '';
            // For each route, display summary information.
            for (let i = 0; i < route.legs.length; i++) {
              let routeSegment = i + 1;
              summaryPanel.innerHTML += '<b>Отрезок дороги: ' + routeSegment +
                  '</b><br>';
              summaryPanel.innerHTML += route.legs[i].start_address + ' до ';
              summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
              summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
            }
          } else {
            console.log('Directions request failed due to ' + status);
          }
        });
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
    },
    computed: {
      currentUser() {
        return this.$store.getters.currentUser
      },
      google: VueGoogleMaps.gmapApi
    },
    components: {
      Datepicker,
    }
  }
</script>

<style scoped>
  #map {
    width: 100%;
  }
</style>
