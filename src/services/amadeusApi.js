import axios from "axios";

const OAUTH_URL =
  window.location.origin + "/.netlify/functions/amadeusGetToken";
const BASE_URL = "https://test.api.amadeus.com";

let TOKEN = {
  is_expired: () => {
    return (
      new Date().getSeconds() >
      TOKEN.creation_time.getSeconds() + TOKEN.expires_in
    );
  },
};

//manually tested, TOKEN good  ? return TOKEN : (retrieve TOKEN and return TOKEN)
//if error, logs it and retries immediatly for max_retries times
export const getToken = async () => {
  if (!TOKEN.value || TOKEN.is_expired()) {
    return axios
      .get(OAUTH_URL, { timeout: 2000 })
      .catch((error) => {
        throw error;
      })
      .then((res) => {
        return (TOKEN = {
          ...TOKEN,
          value: res.data.access_token,
          expires_in: res.data.expires_in,
          creation_time: new Date(),
        });
      });
  } else {
    return TOKEN;
  }
};

/* exampleFlight: {      
    carrierCode: "",
    flightNumber: "",
    scheduledDepartureDate: "",
     operationalSuffix: "" (optional),
  }, 
*/

//validate token or get new one then search for flight and return an error or the response data, MANUALLY TESTED
export async function searchFlight(flight) {
  return getToken()
    .then(() => {
      return axios
        .get(BASE_URL + "/v2/schedule/flights", {
          headers: { Authorization: `Bearer ${TOKEN.value}` },
          params: flight,
        })
        .catch((err) => {
          throw err;
        })
        .then((res) => {
          return res.data;
        });
    })
    .catch((err) => {
      throw err;
    });
}

//manually tested, validate TOKEN then get and return flight delay predictions, if error throws it

/* exampleFlight: {
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
*/
export async function searchPrediction(flight) {
  return getToken()
    .then(() => {
      return axios
        .get(BASE_URL + "/v1/travel/predictions/flight-delay", {
          params: flight,
          headers: { Authorization: `Bearer ${TOKEN.value}` },
        })
        .catch((error) => {
          throw error;
        })
        .then((res) => {
          return res.data;
        });
    })
    .catch((err) => {
      throw err;
    });
}
