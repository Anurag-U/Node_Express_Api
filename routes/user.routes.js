const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
// const db = require("../models");
// const User = db.users;


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

// const jwt = require('jsonwebtoken');
// const User = require('../models');
  
//   // Delete user
//   app.delete('/users/:id', verifyToken, async (req, res) => {
//     try {
//       const userId = req.params.id;
//       await User.destroy({ where: { id: userId } });
//       res.json({ message: 'User deleted' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Server error');
//     }
//   });
  
//   function verifyToken(req, res, next) {
//     const token = req.headers.authorization;
//     if (!token) {
//       return res.status(401).send('Unauthorized');
//     }
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decoded;
//       next();
//     } catch (error) {
//       console.error(error);
//       res.status(401).send('Unauthorized');
//     }
//   }
};