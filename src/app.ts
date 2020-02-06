import express from "express"; // importing modules
import path from "path"; // importing modules

// create Express server
const app = express();
app.set("port", process.env.PORT || 3000);

// Express configuration
app.set('views', path.join(__dirname, '../views')); // templates located in views
app.set('view engine', 'pug'); 

// serve static files
app.use('/node_modules', express.static('node_modules'));
app.use(express.static(path.join(__dirname, '../src/public')));

// primary app routes
app.get("/", function(req, res){
    res.render("index", {title: "Drawing Board"});
});

export default app;