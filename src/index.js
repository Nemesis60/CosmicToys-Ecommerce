const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('../config/db-connection');

require('dotenv').config();


// ROUTES
const userRoutes = require('../routes/v1/userRoutes');
const productRoutes = require('../routes/v1/productRoutes');
const authRoutes = require('../routes/v1/auth');

const app = express();
app.use(express.json());
app.use(cors());

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname + '../public')))

// ROUTES USED
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/auth", authRoutes);

connectDB();

// port connected with express server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`The server is running in the port ${port}`);
});