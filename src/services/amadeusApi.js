import axios from "axios";

const OAUTH_URL = "https://test.api.amadeus.com/v1/security/oauth2/token";
const BASE_URL = "https://test.api.amadeus.com";
const API_KEY = "pWedLWD5wiKGOIeDT8jUlUkILIDKvbYg";
const API_SECRET = "zs4nmLEIM3z0AmnS";

const max_retries = 10;

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
export const getToken = async (retry = 0, maxRetries = max_retries) => {
  if (!TOKEN.value || TOKEN.is_expired()) {
    return axios
      .post(
        OAUTH_URL,
        `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${API_SECRET}`
      )
      .catch((error) => {
        console.log(error);
        retry += 1;
      })
      .then((res) => {
        return (TOKEN = {
          ...TOKEN,
          value: res.data.access_token,
          expires_in: res.data.expires_in,
          creation_time: new Date(),
        });
      })
      .finally(() => {
        if (retry && retry <= maxRetries) {
          return getToken(retry, maxRetries);
        } else {
          return;
        }
      });
  } else {
    return TOKEN;
  }
};

export async function searchFlights(trip) {
  return getToken().then(() => {
    return axios
      .post(
        BASE_URL + "/v2/shopping/flight-offers",
        {
          currencyCode: "EUR",
          originDestinations: [
            {
              id: "1",
              originLocationCode: trip.departureCode,
              destinationLocationCode: trip.arrivalCode,
              departureDateTimeRange: {
                date: trip.departureDate,
                dateWindow: "I3D",
              },
            },
          ],
          travelers: [
            {
              id: "1",
              travelerType: "ADULT",
            },
          ],
          sources: ["GDS"],
          searchCriteria: {
            maxFlightOffers: 5,
          },
        },
        {
          headers: { Authorization: `Bearer ${TOKEN.value}` },
        }
      )
      .then((res) => {
        return res.data;
      });
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
export async function getPrediction(flight) {
  return getToken().then(() => {
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
  });
}
