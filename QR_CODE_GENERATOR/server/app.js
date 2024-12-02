const express = require("express");
const app = express();
const router = require("./routes"); // Assuming the router is properly defined in routes.js
const bodyParser = require("body-parser");
const cors = require("cors");

// Using express.json() instead of bodyParser.json() for parsing JSON
app.use(express.json());

app.use((req,res,next)=>{
    next()
})

// Allowing all origins (for development purposes)
app.use(cors({ origin: '*' }));

// Use the router for handling routes
app.use(router);

// Starting the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});



