
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db');

// Import routes
const userRoutes = require("./routes/auth");
const propertyRoutes = require("./routes/properties");

const { authenticationMiddleware } = require('./middleware/authmiddleware');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api',authenticationMiddleware, propertyRoutes);
app.use('/auth', require('./routes/auth'));
app.get('/', (req, res) => {
    res.send('API is running...');
});


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
