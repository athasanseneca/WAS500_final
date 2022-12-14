const Books = require("../models/books");

module.exports = {
  getAllBooks: (req, res, next) => {
    Books.find({}, (error, books) => {
      if (error) next(error);
      req.data = books;
      req.data.sort((a, b) => {return a.series - b.series;});
      next();
    })
  },
  getBook: (req, res, next) => {
    let params_book_id = req.params.id;
    Books.findById({_id: params_book_id}, (error, book) => {
      if (error) next(error);
      req.data = book;
      next();
    });
  },
  createNewBook: (req, res, next) => {
    let bookParams = new Books({
      name: req.body.title,
      author: req.body.author
    });
    bookParams.save((error, savedBook) => {
      if (error) next(error);
      res.locals.redirect = "/admin";
      next();
    })
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  update: (req, res, next) => {
    let params_book_id = req.params.id;
    Books.findByIdAndUpdate(params_book_id, 
      {
        name: req.body.title,
        author: req.body.author,
      }, (error, book) => {
        if (error) next(error);
        req.data = book;
        res.locals.redirect = "/admin";
        next();
    });
  },
  delete: (req, res, next) => {
    let params_book_id = req.params.id;
    Books.findByIdAndRemove({_id: params_book_id}, (error, book) => {
      if (error) next(error);
      req.data = book;
      res.locals.redirect = "/admin";
      next();
    });
  }
};