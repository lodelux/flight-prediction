import { createStore } from "vuex";
import { searchFlight } from "../services/amadeusApi";

export default createStore({
  state: {
    flight: "",
  },
  mutations: {
    SET_FLIGHT(state, _flight) {
      state.flight = _flight;
    },
  },
  actions: {
    getFlight({ commit }, _searched) {
      searchFlight(_searched)
        .catch(() => {
          commit("SET_FLIGHT", "error");
        })
        .then((res) => {
          res = res.data;
          commit("SET_FLIGHT", {
            originLocationCode: res[0].flightPoints[0].iataCode,
            departureDate:
              res[0].flightPoints[0].departure.timings[0].value.split("T")[0],
            departureTime:
              res[0].flightPoints[0].departure.timings[0].value
                .split("T")[1]
                .split("+")[0] + ":00",
            destinationLocationCode: res[0].flightPoints[1].iataCode,
            arrivalDate:
              res[0].flightPoints[1].arrival.timings[0].value.split("T")[0],
            arrivalTime:
              res[0].flightPoints[1].arrival.timings[0].value
                .split("T")[1]
                .split("+")[0] + ":00",
            aircraftCode: res[0].legs[0].aircraftEquipment.aircraftType,
            carrierCode: res[0].flightDesignator.carrierCode,
            flightNumber: res[0].flightDesignator.flightNumber,
            duration: res[0].segments[0].scheduledSegmentDuration,
          });
        });
    },
  },
  modules: {},
});
