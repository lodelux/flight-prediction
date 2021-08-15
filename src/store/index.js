import { createStore } from "vuex";
import { searchFlight } from "../services/amadeusApi";
import { searchPrediction } from "../services/amadeusApi";

export default createStore({
  state: {
    flight: "",
    error: "",
    loading: false,
    predictions: "",
  },
  mutations: {
    SET_STATE(state, { key, value }) {
      state[key] = value;
    },
  },
  actions: {
    getFlight({ commit }, _searched) {
      commit("SET_STATE", { key: "flight", value: "" });
      commit("SET_STATE", { key: "error", value: "" });
      commit("SET_STATE", { key: "loading", value: true });
      searchFlight(_searched)
        .catch(() => {
          commit("SET_STATE", { key: "loading", value: false });
          commit("SET_STATE", { key: "error", value: "flight" });
          return;
        })
        .then((res) => {
          if (res.meta.count) {
            res = res.data;
            commit("SET_STATE", {
              key: "flight",
              value: {
                originLocationCode: res[0].flightPoints[0].iataCode,
                departureDate:
                  res[0].flightPoints[0].departure.timings[0].value.split(
                    "T"
                  )[0],
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
              },
            });
          } else {
            commit("SET_STATE", { key: "loading", value: false });
            commit("SET_STATE", { key: "error", value: "no flight" });
          }
        });
    },
    getPredictions({ commit }, _flight) {
      commit("SET_STATE", { key: "predictions", value: "" });
      commit("SET_STATE", { key: "error", value: "" });

      if (_flight != "") {
        searchPrediction(_flight)
          .catch(() => {
            commit("SET_STATE", { key: "loading", value: false });
            commit("SET_STATE", { key: "error", value: "prediction" });
            return;
          })
          .then((res) => {
            if (res.meta.count) {
              for (let pr of res.data) {
                pr.probability = Math.round(pr.probability * 100);
                pr.result = pr.result.split("_").join(" ").toLowerCase();
              }

              commit("SET_STATE", { key: "loading", value: false });
              commit("SET_STATE", { key: "predictions", value: res.data });
            } else {
              commit("SET_STATE", { key: "loading", value: false });
              commit("SET_STATE", { key: "error", value: "no prediction" });
            }
          });
      }
    },
  },
  modules: {},
});
