const auth = require("../middleware/auth");
const { Rental, validate } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const mongoose = require("mongoose");
// const Fawn = require("fawn");
const express = require("express");
const router = express.Router();

// Fawn.init(mongoose);

router.get(
  "/",
  auth,
  async (req, res) => {
    const rentals = await Rental.find().sort("-dateOut"); // Descending order
    res.send(rentals);
  }
);

router.post(
  "/",
  auth,
  async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(404).send("Invalid customer.");

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(404).send("Invalid movie.");

    if (movie.numberInStock === 0)
      return res.status(400).send("Movie not available.");

    const rental = new Rental({
      customer: {
        _id: customer._id,
        name: customer.name,
        phone: customer.phone,
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate,
      },
    });
    await rental.save();

    movie.numberInStock--;
    movie.save();

    // try {
    //     new Fawn.Task()
    //         .save('rentals', rental)
    //         .update('movies', {_id: movie._id}, {
    //             $inc: {numberInStock: -1} //decrement the number of movies in stock.
    //         })
    //         .run()
    // }
    // catch(ex) {
    //     res.status(500).send('Something failed.')
    // }

    res.send(rental);
  }
);

module.exports = router;
