<template>
  <div class="col-md-12 row">
    <div v-if="isLoaded" class="col-md-5">
      <h4>Направление: {{trip.point_of_shipment.name}} - {{trip.destination.name}}</h4>
      <p>Дата: {{trip.date_time}}</p>
      <p>Дата: {{trip.time}}</p>
      <p>Цена: {{trip.price}}</p>
      <p>Всего мест: {{trip.amount_of_seats}}</p>
      <p>Свободных мест: {{trip.free_seats}}</p>
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
  import axios from 'axios'
  import * as VueGoogleMaps from 'vue2-google-maps'

  export default {
    name: "ShowTrip",
    data() {
      return {
        id: this.$route.params.id,
        trip: {},
        isLoaded: false,
        cities: []
      }
    },
    created() {
      axios.get(`http://localhost:3000/trips/` + this.id)
        .then(response => {
          this.trip = response.data
          this.isLoaded = true
          this.cities.push(this.trip.point_of_shipment.attribute)
          this.cities.push(this.trip.destination.attribute)
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    methods: {
      runGmap() {
        const waypointsIds = axios.post(`http://localhost:3000/cities/waypoints/byIds`, {
           waypoints: this.trip.waypoints
        });
        axios.all([waypointsIds])
          .then(
            axios.spread((...responses) => {
              getPointsAttr(responses[0].data)
            })
          )
          .catch(errors => {
            console.error(errors);
          });

        const getPointsAttr = (waypointsAttr) => {
          let directionsService = new google.maps.DirectionsService
          let directionsRenderer = new google.maps.DirectionsRenderer

          directionsRenderer.setMap(this.$refs.googleMap.$mapObject);
          this.calculateAndDisplayRoute(directionsService, directionsRenderer, waypointsAttr);
        }
      },
      calculateAndDisplayRoute(directionsService, directionsRenderer, waypointsAttr) {
        let waypts = [];

        for (let i = 0; i < waypointsAttr.length; i++) {
          waypts.push({
            location: waypointsAttr[i],
            stopover: true
          });
        }

        directionsService.route({
          origin: this.trip.point_of_shipment.attribute,
          destination: this.trip.destination.attribute,
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
    computed: {
      google: VueGoogleMaps.gmapApi
    },
    mounted() {
      window.addEventListener('load', () => {
         this.runGmap();
      })
    }
  }
</script>

<style scoped>

</style>
