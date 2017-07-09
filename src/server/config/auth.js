module.exports = {
  isAuth: (req, res, next) => {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.status(200).send({error:{message:'You have to be logged in'}})
    }
  },
  isInRole: (role) => {
    return (req, res, next) => {
      if (req.isAuthenticated() && req.user.roles.indexOf(role) > -1) {
        next()
      } else {
        res.status(200).send({error:{message:'You don\'t have the necessary rights'}})
      }
    }
  },
  isNotAuth: (req, res, next) => {
    if (!req.isAuthenticated()) {
      next()
    } else {
      res.status(200).send({error:{message:'You are already logged in'}})
    }
  }
}
