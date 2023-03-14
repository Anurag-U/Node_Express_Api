const { book } = require("../models");

const db = require("../models");
const Book = db.books;
const Op = db.Sequelize.Op;

// Create and Save a new Book
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Book
  const books = {
    name: req.body.name,
    author: req.body.author,
    publisher: req.body.publisher,
    edition: req.body.edition,
    publishYear: req.body.publishYear,
    language: req.body.language,
    // description: req.body.description,
    // published: req.body.published ? req.body.published : false
  };

  // Save Book in the database
  Book.create(books)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Book."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;


};

//////////////////////////////////////////////////////
const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: books } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, totalPages, currentPage, books };
};


exports.findAll = (req, res) => {

  const { page, size, name } = req.query;
  const sortBy = req.query.sortBy || 'createdAt';
  const sortOrder = req.query.sortOrder || 'DESC';
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  Book.findAndCountAll({ where: condition, limit, offset, order: [[sortBy, sortOrder]] })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving books."
      });
    });
};




// Find a single Book with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Book.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Book with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Book with id=" + id
      });
    });
};

// Update a Book by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Book.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Book was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Book with id=${id}. Maybe Book was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Book with id=" + id
      });
    });
};

// Delete a Book with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Book.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Book was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Book with id=${id}. Maybe Book was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Book with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Book.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all books."
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Book.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving books."
      });
    });
};







// exports.moderatorBoard = (req, res) => {
//   res.status(200).send("Moderator Content.");
// };
// // const Book = require("../models");

// // async function addBook(bookData) {
// //   try {
// //     const book = await Book.create(bookData);
// //     return book;
// //   } catch (error) {
// //     console.error(error);
// //   }
// // }

// // async function listAllBooks() {
// //   try {
// //     const books = await Book.findAll();
// //     return books;
// //   } catch (error) {
// //     console.error(error);
// //   }
// // }

// // async function updateBook(bookId, bookData) {
// //   try {
// //     const book = await Book.findByPk(bookId);
// //     if (!book) {
// //       return null;
// //     }
// //     await book.update(bookData);
// //     return book;
// //   } catch (error) {
// //     console.error(error);
// //   }
// // }

// // async function getBookById(bookId) {
// //   try {
// //     const book = await Book.findByPk(bookId);
// //     return book;
// //   } catch (error) {
// //     console.error(error);
// //   }
// // }

// // async function deleteBook(bookId) {
// //   try {
// //     const book = await Book.findByPk(bookId);
// //     if (!book) {
// //       return null;
// //     }
// //     await book.destroy();
// //     return true;
// //   } catch (error) {
// //     console.error(error);
// //   }
// // }

// // module.exports = {
// //   addBook,
// //   listAllBooks,
// //   updateBook,
// //   getBookById,
// //   deleteBook,
// // };

// // const Book = require("./models/book");

// // function addBook(bookData, callback) {
// //   Book.create(bookData)
// //     .then((book) => {
// //       callback(null, book);
// //     })
// //     .catch((error) => {
// //       console.error(error);
// //       callback(error, null);
// //     });
// // }

// // function listAllBooks(callback) {
// //   Book.findAll()
// //     .then((books) => {
// //       callback(null, books);
// //     })
// //     .catch((error) => {
// //       console.error(error);
// //       callback(error, null);
// //     });
// // }

// // function updateBook(bookId, bookData, callback) {
// //   Book.findByPk(bookId)
// //     .then((book) => {
// //       if (!book) {
// //         callback(null, null);
// //       }
// //       return book.update(bookData);
// //     })
// //     .then((book) => {
// //       callback(null, book);
// //     })
// //     .catch((error) => {
// //       console.error(error);
// //       callback(error, null);
// //     });
// // }

// // function getBookById(bookId, callback) {
// //   Book.findByPk(bookId)
// //     .then((book) => {
// //       callback(null, book);
// //     })
// //     .catch((error) => {
// //       console.error(error);
// //       callback(error, null);
// //     });
// // }

// // function deleteBook(bookId, callback) {
// //   Book.findByPk(bookId)
// //     .then((book) => {
// //       if (!book) {
// //         callback(null, null);
// //       }
// //       return book.destroy();
// //     })
// //     .then(() => {
// //       callback(null, true);
// //     })
// //     .catch((error) => {
// //       console.error(error);
// //       callback(error, null);
// //     });
// // }

// // module.exports = {
// //   addBook,
// //   listAllBooks,
// //   updateBook,
// //   getBookById,
// //   deleteBook,
// // };
