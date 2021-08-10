<template>
  <div class="form">
    <form @submit.prevent="getFlightPrediction">
      <input
        placeholder="departure code"
        v-model="tripForm.originLocationCode"
      />
      <input placeholder="departure date" v-model="tripForm.departureDate" />
      <input placeholder="departure time" v-model="tripForm.departureTime" />
      <input
        placeholder="arrival code"
        v-model="tripForm.destinationLocationCode"
      />
      <input placeholder="arrival date" v-model="tripForm.arrivalDate" />
      <input placeholder="arrival time" v-model="tripForm.arrivalTime" />
      <input placeholder="aircraft code" v-model="tripForm.aircraftCode" />
      <input placeholder="carrier code" v-model="tripForm.carrierCode" />
      <input placeholder="flight number" v-model="tripForm.flightNumber" />
      <input placeholder="duaration" v-model="tripForm.duration" />

      <button type="submit">submit</button>
    </form>
  </div>
  <div>
    <button @click.prevent="updateToken">get Token</button>
  </div>
</template>

<script>
import {
  searchFlights,
  getPrediction,
  getToken,
} from "@/services/amadeusApi.js";
// import { sleep } from "@/services/utils.js";

export default {
  data() {
    return {
      tripForm: {
        originLocationCode: "MXP",
        departureDate: "2021-08-28",
        departureTime: "12:50:00",
        destinationLocationCode: "AMS",
        arrivalDate: "2021-08-28",
        arrivalTime: "14:45:00",
        aircraftCode: "E90",
        carrierCode: "KL",
        flightNumber: "1630",
        duration: "PT1H55M",
      },
      // tripForm: {
      //   departureCode: "",
      //   departureDate: "",
      //   departureTime: "",
      //   arrivalCode: "",
      //   arrivalDate: "",
      //   arrivalTime: "",
      //   aircraftCode: "",
      //   carrierCode: "",
      //   flightNumber: "",
      //   duration: "",
      // },
      offers: [],
      prediction: "",
    };
  },
  methods: {
    async updateToken() {
      getToken().then((res) => console.log(res));
    },
    getFlights() {
      searchFlights(this.tripForm).then((res) => {
        this.offers = res;
      });
    },
    getFlightsData() {
      let flightsData = [];
      for (const offer of this.stored.data) {
        let trip = [];
        for (const itinerary of offer.itineraries) {
          for (const flight of itinerary.segments) {
            trip.push({
              originLocationCode: flight.departure.iataCode,
              departureDate: flight.departure.at.split("T")[0],
              departureTime: flight.departure.at.split("T")[1],
              destinationLocationCode: flight.arrival.iataCode,
              arrivalDate: flight.arrival.at.split("T")[0],
              arrivalTime: flight.arrival.at.split("T")[1],
              aircraftCode: flight.aircraft.code,
              carrierCode: flight.operating.carrierCode,
              flightNumber: flight.number,
              duration: itinerary.duration,
            });
          }
        }
        flightsData.push(trip);
      }
      return flightsData;
    },
    async getFlightPrediction() {
      getPrediction(this.tripForm).then((res) => (this.prediction = res));
    },
  },
  computed: {
    flightsData: function () {
      return this.getFlightsData();
    },
  },

  created() {
    getToken().then((res) => console.log(res));
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
