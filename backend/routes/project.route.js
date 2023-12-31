const express = require('express');
const app = express();
const bookRoute = express.Router();
let Book = require('../model/book');

bookRoute.route('/add-book').post((req, res, next) => {
    Book.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

bookRoute.route('/').get((req, res, next) => {
    Book.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
        }
    })
})
bookRoute.route('/update-book/:id').get((req, res, next) => {
    Book.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            console.log(error);
            return next(error);

        } else {
            res.json(data);
            console.log('book updated sucessfully');
        }
    })
})
bookRoute.route('/update-book/:id').put((req, res, next) => {
    Book.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            console.log(error);
            return next(error);

        } else {
            res.json(data);
            console.log('book updated sucessfully');
        }
    })
})

bookRoute.route('/delete-book/:id').delete((req, res, next) => {
    Book.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            });
        }
    })
})

module.exports = bookRoute;