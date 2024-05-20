const express = require('express');
const app = express();
const port = 4000;
const mongoDB = require("./db");
mongoDB();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Assuming '/api' is the base path for your API routes
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
