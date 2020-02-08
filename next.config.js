const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')


module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        YELP_URL: process.env.YELP_URL,
        YELP_KEY: process.env.YELP_KEY,
        CLIENT_URL: process.env.CLIENT_DEV_URL
      }
    }
  }

  return {
    env: {
      YELP_URL: process.env.YELP_URL,
      YELP_KEY: process.env.YELP_KEY,
      CLIENT_URL: process.env.CLIENT_URL
    }
  }
}
