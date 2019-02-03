const jwksClient = require('jwks-rsa')
const jwt = require('jsonwebtoken')
const jwks = jwksClient({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 1,
  jwksUri: `https://backpaca.auth0.com/.well-known/jwks.json`
})

const validateAndParseIdToken = (idToken) => new Promise((resolve, reject) => {
  console.log(idToken)
  const { header, payload} = jwt.decode(idToken, {complete: true})
  if (!header || !header.kid || !payload) reject(new Error('Invalid Token'))
  jwks.getSigningKey(header.kid, (err, key) => {
    // const signingKey = key.publicKey || key.rsaPublicKey;
    if (err) reject(new Error('Error getting signing key: ' + err.message))
    jwt.verify(idToken, key.publicKey, { algorithms: ['RS256'] }, (err, decoded) => {
      if (err) reject('jwt verify error: ' + err.message)
      resolve(decoded)
    })
  })
})

module.exports = validateAndParseIdToken
