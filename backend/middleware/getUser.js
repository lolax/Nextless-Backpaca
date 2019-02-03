const getUser = async (req, res, next, prisma) => {
  if (!req.user) { return next() }
  const user = await prisma.user({ auth0id: req.user.sub.split(`|`)[1] });
  req.user = { token: req.user, ...user }
  next()
}

module.exports = { getUser }
