// NOTE #1 (we should move this but it's fast): i'm using heroku cli to deploy, so from top level
// of repo check to see if the remote comes with it. if not:

// you need heroku client
// `git remote -v` to see if it has the heroku backend or not.
// if you don't see one: `git remote add heroku-backend https://git.heroku.com/backpaca-yoga.git`
// then to push changes `git subtree push --prefix backend heroku-backend master`

//Do this in the backend folder
//export PRISMA_MANAGEMENT_API_SECRET={obtain from heroku} => prisma deploy => prisma generate
//==============================================================================

//-- Dependencies --------------------------------
const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./prisma/generated/prisma-client');
const cors = require('cors');
const { checkJwt } = require('./middleware/jwt');
const { getUser } = require('./middleware/getUser');
const validateAndParseIdToken = require('./helpers/validateAndParseIdToken');
const { directives } = require('./directives');
const { resolvers } = require('./resolvers')
// require('./services/passport/passport')(prisma)
//------------------------------------------------

// async function createPrismaUser(context, idToken) {
//   const user = await context.prisma.createUser({
//     data: {
//       identity: idToken.sub.split(`|`)[0],
//       auth0id: idToken.sub.split(`|`)[1],
//       name: idToken.name,
//       email: idToken.email,
//       pictureUrl: idToken.picture
//     }
//   })
//   return user
// };
//
// const contextUser = context => context.request.user;

const whitelist = ['http://localhost:1738', 'http://localhost:3000', 'https://backpaca.now.sh', 'http://localhost:4000']
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
   if (whitelist.indexOf(origin) !== -1 || !origin) {
     console.log('whitelisted domain', origin);
     callback(null, true)
   } else {
     console.log('go away')
     callback(new Error('Not allowed by CORS'))
   }
 }};

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  directives,
  context: request => {
    return {
      ...request,
      prisma
    }
  }
})

server.express.post(
  server.options.endpoint,
  checkJwt,
  (err, req, res, next) => {
    if (err) {
      return res.status(401).send(err.message)
    }
    next()
  }
);
server.express.post(server.options.endpoint, (req, res, done ) => {
  console.log('the request is', req.headers)
  return getUser(req, res, done, prisma)
})
// require('./services/middleware')(server)
// require('./services/passport/routes')(server)

const opts = {
  cors: corsOptions
}
//-- Start Server ---------------------------------------
server.start(opts, () => console.log(`Server is running on http://localhost:4000`))
