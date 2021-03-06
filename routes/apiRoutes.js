// api routes
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models/")
module.exports = function (app) {

    app.get("/scrape", function (req, res) {

        axios.get("https://pitchfork.com/features/").then(function (response) {
            let $ = cheerio.load(response.data);

            $(".title.module__title").each(function (i, element) {
                let result = {};

                result.title = $(this).text();
                result.link = $(this).parent().attr("href");
                console.log(result.title + "\n" + result.link);

                db.Article.create(result).then(function (dbArticle) {
                    
                    
                }).catch(function (err) {
                    console.log(err);
                })

            })
               

            res.render("scrapeComplete");



        });
        
    });

    app.get("/articles", (req, res) => {
        db.Article.find({})
            .then((dbArticle) => {
                console.log({articles: dbArticle})
                res.render("articles", {articles: dbArticle});
            })
        });

    app.get("/articles/:id", (req, res) => {
        db.Article.findOne({ _id: req.params.id})
        .populate("note")
        .then((dbArticle) => res.json(dbArticle))
        .catch((err) => res.json(err))
    });

    app.post("/articles/:id", (req, res) => {
        db.Note.create(req.body)
            .then((dbNote) => {
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id}, { new: true})
            })
            .then((dbArticle) => {
                res.json(dbArticle)
            })
            .catch((err) => res.json(err))
    })

}