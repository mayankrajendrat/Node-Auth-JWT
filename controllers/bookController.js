var exports = module.exports = {};

// Call User model
let Book = require("../models/book");

exports.newBook = function(req, res) {
    let token = getToken(req.headers);
    if (token) {
        console.log(req.body);
        let newBook = new Book({
            isbn: req.body.isbn,
            title: req.body.title,
            author: req.body.author,
            publisher: req.body.publisher
        });

        newBook.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'Save book failed.'});
            }
            res.json({success: true, msg: 'Successful created new book.'});
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
};

exports.booksList = function(req, res) {
    let token = getToken(req.headers);
    if (token) {
        Book.find(function (err, books) {
            if (err) return next(err);
            res.json(books);
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
};

getToken = function (headers) {
    if (headers && headers.authorization) {

        //JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDBmMjNkYTM4YmU2NTM1MWMyYTZhZjkiLCJ1c2VybmFtZSI6Im1heWFua0AxMHhhY2FkZW15LmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJEVHYVRiUXRrQU1URjRSYkxiMTVlSXVaMGcwS0ZSeVZyVVNpNm5NSmc1NUlZOGIwVG4uV01TIiwiX192IjowLCJpYXQiOjE2Nzg3MTQ3NzZ9.o4xwRbmSikicj6Xjv3mQb6PyH69p_h97F-mB9qsYyYA
        let parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};