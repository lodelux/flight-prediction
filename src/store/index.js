import { createStore } from "vuex";
import { searchFlight } from "../services/amadeusApi";
import { searchPrediction } from "../services/amadeusApi";

const TEST_FLIGHT = {
  meta: {
    count: 1,
    links: {
      self: "https://test.api.amadeus.com/v2/schedule/flights?carrierCode=FR&flightNumber=1303&scheduledDepartureDate=2022-07-01",
    },
  },
  data: [
    {
      type: "DatedFlight",
      scheduledDepartureDate: "2022-07-01",
      flightDesignator: {
        carrierCode: "FR",
        flightNumber: 1303,
      },
      flightPoints: [
        {
          iataCode: "NAP",
          departure: {
            timings: [
              {
                qualifier: "STD",
                value: "2022-07-01T09:40+02:00",
              },
            ],
          },
        },
        {
          iataCode: "CRL",
          arrival: {
            timings: [
              {
                qualifier: "STA",
                value: "2022-07-01T12:00+02:00",
              },
            ],
          },
        },
      ],
      segments: [
        {
          boardPointIataCode: "NAP",
          offPointIataCode: "CRL",
          scheduledSegmentDuration: "PT2H20M",
        },
      ],
      legs: [
        {
          boardPointIataCode: "NAP",
          offPointIataCode: "CRL",
          aircraftEquipment: {
            aircraftType: "738",
          },
          scheduledLegDuration: "PT2H20M",
        },
      ],
    },
  ],
};

const TEST_SEARCHED = {};
export default createStore({
  state: {
    flight: "",
    error: "",
    loading: false,
    predictions: "",
  },
  mutations: {
    //set any state property
    SET_STATE(state, { key, value }) {
      state[key] = value;
    },
  },
  actions: {
    //reset state -> set loading -> searchFlight call.then(set correct flight for prediction call).catch(set error && not loading)
    getFlight({ commit }, _searched) {
      commit("SET_STATE", { key: "flight", value: "" });
      commit("SET_STATE", { key: "error", value: "" });
      commit("SET_STATE", { key: "loading", value: true });
      console.log(_searched);
      if (_searched == TEST_SEARCHED) {
        let res = TEST_FLIGHT;
        if (res.meta.count) {
          res = res.data;
          commit("SET_STATE", {
            key: "flight",
            value: {
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
            },
          });
        } else {
          commit("SET_STATE", { key: "loading", value: false });
          commit("SET_STATE", { key: "error", value: "no flight" });
        }
        return;
      }

      searchFlight(_searched)
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
        })
        .catch(() => {
          commit("SET_STATE", { key: "loading", value: false });
          commit("SET_STATE", { key: "error", value: "flight" });
          return;
        });
    },
    //reset state -> searchPrediction.then(set predictions && not loading).catch(set error && not loading)
    getPredictions({ commit }, _flight) {
      commit("SET_STATE", { key: "predictions", value: "" });
      commit("SET_STATE", { key: "error", value: "" });
      if (_flight == TEST_FLIGHT) {
        let res = TEST_PREDICTIONS;
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
        return;
      }
      if (_flight != "") {
        searchPrediction(_flight)
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
          })
          .catch(() => {
            commit("SET_STATE", { key: "loading", value: false });
            commit("SET_STATE", { key: "error", value: "prediction" });
            return;
          });
      }
    },
  },
});
