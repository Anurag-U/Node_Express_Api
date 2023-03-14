
const { authJwt } = require("../middleware");
const books = require("../controllers/book.controller");



module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  app.get("/api/books/", [authJwt.verifyToken], books.findAll);
  
  app.post("/api/books/", [authJwt.verifyToken], books.create);
    // Retrieve all books
  
  app.get("/api/books/", [authJwt.verifyToken, authJwt.isAdmin], books.findAll);  
  // Retrieve a single book with id

  app.get("/api/books/:id", [authJwt.verifyToken, authJwt.isAdmin], books.findOne);
  // Update a book with id

  app.put("/api/books/:id", [authJwt.verifyToken, authJwt.isAdmin], books.update);
  // Delete a book with id

  app.delete("/api/books/:id", [authJwt.verifyToken, authJwt.isAdmin], books.delete);
  // Delete all books

  app.delete("/api/books/", [authJwt.verifyToken, authJwt.isAdmin], books.deleteAll);
};



























// module.exports = app => {
//     const books = require("../controllers/book.controller.js");
  
//     var router = require("express").Router();
  
//     // Create a new Tutorial
//     router.post("/", books.create);
  
//     // Retrieve all Tutorials
//     router.get("/", [authJwt.verifyToken],books.findAll);
  
//     // Retrieve all published Tutorials
//     router.get("/published",[authJwt.verifyToken], books.findAllPublished);
  
//     // Retrieve a single Tutorial with id
//     router.get("/:id",[authJwt.verifyToken], books.findOne);
  
//     // Update a Tutorial with id
//     router.put("/:id",[authJwt.verifyToken], books.update);
  
//     // Delete a Tutorial with id
//     router.delete("/:id",[authJwt.verifyToken,authJwt.isAdmin], books.delete);
  
//     // Delete all Tutorials
//     router.delete("/",[authJwt.verifyToken,authJwt.isAdmin], books.deleteAll);
  
//     // app.use('/api/books', router);
//   };

// // const { authJwt } = require("../middleware");
// // const controller = require("../controllers/book.controller");

// // module.exports = function(app) {
// //   app.use(function(req, res, next) {
// //     res.header(
// //       "Access-Control-Allow-Headers",
// //       "x-access-token, Origin, Content-Type, Accept"
// //     );
// //     next();
// //   });

// //   app.get("/api/test/all", controller.allAccess);

// //   app.get(
// //     "/api/test/user",
// //     [authJwt.verifyToken],
// //     controller.userBoard
// //   );

// //   app.get(
// //     "/api/test/mod",
// //     [authJwt.verifyToken, authJwt.isModerator],
// //     controller.moderatorBoard
// //   );

// //   app.get(
// //     "/api/test/admin",
// //     [authJwt.verifyToken, authJwt.isAdmin],
// //     controller.adminBoard
// //   );
// // };