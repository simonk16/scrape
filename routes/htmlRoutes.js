module.exports = (app) => {

    // html routes
    app.get('/', function(req, res){
        res.render("index")
        });
}
