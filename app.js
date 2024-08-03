/* converter */

//required packages
const express  = require("express");
const fetch  = require("node-fetch");
require("dotenv").config();

//create the express server
const app = express();

//server port number
const PORT = process.env.PORT || 3000;

//set template engine
app.set("view engine", "ejs");
app.use(express.static("public"));

//needed to parse html data for POST request
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

app.get("/", (req, res) => {
    res.render("converter")
})

app.post("/convert-mp3", async (req, res) => {
    const videoId = req.body.videoID;
    if(
        videoId === undefined ||
        videoId === "" ||
        videoId === null
    ){
        return res.render("converter", {success : false, message : "Please enter a video ID"});
    }else{
        const fetchAPI = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`, {
            "method" : "GET",
            "headers": {
                "x-rapidapi-key" : process.env.API_KEY,
                "x-rapidapi-host" : process.env.API_HOST
            }
        });

        const fetchResponse = await fetchAPI.json();

        if(fetchResponse.status === "ok")
            return res.render("converter", {success : true, song_title: fetchResponse.title, song_link : fetchResponse.link});
        else
            return res.render("converter", {success: false, message : fetchResponse.msg})
    }
})

// Set template engine
app.set("view engine", "ejs");

// Define route to render converter.ejs
app.get("/converter", (req, res) => {
    res.render("converter");
});

app.get("/index", (req, res) => {
    res.render("index");
});

// Define the route for Text to Speech Converter
app.get('/text', (req, res) => {
  // Render the text.ejs file
  res.render('text');
});


/* end-converter */

/* aboutus */
//start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
} )

// Set up view engine
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static('public'));

// Define routes
app.get('/', (req, res) => {
    // Render the index.ejs file
    res.render('index');
});

// Assuming you have an Express.js app instance named 'app'

app.get('/about', (req, res) => {
    // Render the about.ejs page
    res.render('about');
});

/* end-aboutus */

/* contactus */

// Require necessary modules
const bodyParser = require('body-parser');

// Set up view engine
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: false }));

// Define routes
app.get('/contact', (req, res) => {
    // Render the contact.ejs file
    res.render('contact');
});

app.post('/contact', (req, res) => {
    // Extract form data
    const { name, email, subject, message } = req.body;

    // Here you can handle the form submission, e.g., send an email, save to database, etc.

    // For demonstration purposes, we'll just log the data
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Subject:', subject);
    console.log('Message:', message);

    // Redirect back to the contact page after form submission
    res.redirect('/contact');
});


/* end-contactus */


/* yt page */

// Set up view engine
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static('public'));

// Define routes
app.get('/', (req, res) => {
    // Render the index.ejs file
    res.render('index');
});

// Define routes
app.get('/', (req, res) => {
    // Render the index.ejs file
    res.render('contact');
});

// Define routes
app.get('/', (req, res) => {
    // Render the index.ejs file
    res.render('about');
});


// Route for the yt.ejs page
app.get('/yt', (req, res) => {
    // Render the yt.ejs file
    res.render('yt');
});

/* yt page end*/

/* text page */

const apiKey = process.env.RAPIDAPI_KEY;
const apihost = process.env.RAPIDAPI_HOST;

/* text page */