const process = require("process");

const axios = require("axios");

const OAUTH_URL = "https://test.api.amadeus.com/v1/security/oauth2/token";

const handler = async function (event) {
  // Get env var values defined in our Netlify site UI

  // TODO: customize your URL and API keys set in the Netlify Dashboard
  // this is secret too, your frontend won't see this
  const {
    API_SECRET = "zs4nmLEIM3z0AmnS",
    API_KEY = "pWedLWD5wiKGOIeDT8jUlUkILIDKvbYg",
  } = process.env;

  try {
    const { data } = await axios.post(
      OAUTH_URL,
      `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${API_SECRET}`
    );
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    const { status, statusText, headers, data } = error.response;
    return {
      statusCode: error.response.status,
      body: JSON.stringify({ status, statusText, headers, data }),
    };
  }
};

module.exports = { handler };
