let DOMAIN_URL = ''

if (process.env.NODE_ENV !== 'production') {
  DOMAIN_URL = 'http://localhost:5000'
} else {
  DOMAIN_URL = 'https://billboard-automator-server.herokuapp.com'
}

export { DOMAIN_URL }