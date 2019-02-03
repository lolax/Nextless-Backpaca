const getUser = async (req, res, next, prisma) => {
  console.log('get user activate!', req.user.sub.split(`|`)[1])
  if (!req.user) { return next() }
  const user = await prisma.user({where: { auth0id: req.user.sub.split(`|`)[1] }});
  console.log('in user', user);
  req.user = { token: req.user, ...user }
  next()
}

module.exports = { getUser }
