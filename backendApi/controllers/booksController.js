import Book from "../models/book";
import request from "request-promise";
import { parseString } from "xml2js";
import parseErrors from "../utils/parseError";

exports.getBookList = (req, res) => {
  Book.find({ userId: req.currentUser._id }).then((books) =>
    res.status(200).json({ books })
  );
};

exports.createNewBook = (req, res) => {
  Book.create({ ...req.body.book, userId: req.currentUser._id })
    .then((book) => {
      res.status(201).json({ book });
    })
    .catch((err) => res.status(400).json({ errors: parseErrors(err.errors) }));
};

exports.searchBook = (req, res) => {
  request
    .get(
      `https://www.goodreads.com/search/index.xml?key=${process.env.GOODREADS_KEY}&q=${req.query.q}`
    )
    .then((result) =>
      parseString(result, (err, goodreadsResult) =>
        res.json({
          books: goodreadsResult.GoodreadsResponse.search[0].results[0].work.map(
            (work) => ({
              goodreadsId: work.best_book[0].id[0]._,
              title: work.best_book[0].title[0],
              authors: work.best_book[0].author[0].name[0],
              covers: [work.best_book[0].image_url[0]],
            })
          ),
        })
      )
    )
    .catch((err) => console.log(err)); ///res.status(400).json({ errors: parseErrors(err.errors) }));
};

exports.fetchPages = (req, res) => {
  const goodreadsId = req.query.goodreadsId;

  request
    .get(
      `https://www.goodreads.com/book/show.xml?key=${process.env.GOODREADS_KEY}&id=${goodreadsId}`
    )
    .then((result) =>
      parseString(result, (err, goodreadsResult) => {
        const numPages = goodreadsResult.GoodreadsResponse.book[0].num_pages[0];
        const pages = numPages ? parseInt(numPages, 10) : 0;
        res.json({
          pages,
        });
      })
    );
};
