const pool = require("./config.js");
const express = require("express");
const router = express.Router();


// Table Film

// -- Find all films

// http://localhost:3000/film
router.get("/film", (req, res) => {
    const query = `SELECT * FROM film`

    pool.query(query, (err, response) => {
        if(err) throw err

        res.status(200).json(response.rows);
    })
});

// Table Film by film_id
router.get("/film/:film_id", (req, res) => {
    
    const {film_id} = req.params;

    const findQuery = ` 
        SELECT 
            * 
        FROM film 
            WHERE film_id = $1`

    pool.query(findQuery, [film_id], (err, response) => {
        if(err) throw err

        res.status(200).json(response.rows[0]);
    });
});

// Table Category

router.get("/category", (req, res) => {
    const queryCategory = ` SELECT * FROM category`

    pool.query(queryCategory, (err, response) => {
        if(err) throw err

        res.status(200).json(response.rows);
    });
});


// Table film berdasarkan category
router.get("/film/category/:category_id", (req, res) => {
    
    const {category_id} = req.params;

    const findQuery = ` 
        SELECT 
            * 
        FROM film
            INNER JOIN film_category 
                ON film.film_id = film_category.film_id
            INNER JOIN category
                ON category.category_id = film_category.category_id
        WHERE category.category_id = $1;
            `

    pool.query(findQuery, [category_id], (err, response) => {
        if(err) throw err

        res.status(200).json(response.rows);
    });
});

module.exports = router;