const process = require("process");

const axios = require("axios");

const OAUTH_URL = "https://test.api.amadeus.com/v1/security/oauth2/token";

const handler = async function (event) {
  // Get env var values defined in our Netlify site UI

  // TODO: custo:mize your URL and API keys set in the Netlify Dashboard
  // this is secret too, your frontend won't see this

  try {
    console.log(Date(), "get Token");
    const { data } = await axios.post(
      OAUTH_URL,
      `grant_type=client_credentials&client_id=${process.env.API_KEY}&client_secret=${process.env.API_SECRET}`
    );
    const result = {
      access_token: data.access_token,
      expires_in: data.expires_in,
    };
    return {
      statusCode: 200,
      body: JSON.stringify(result),
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
