const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db'); 
const authRoutes = require('./routes/auth'); 
const gameRoutes = require('./routes/gameRoutes'); 
const photoRoutes = require('./routes/photoRoutes'); 

const app = express();
const PORT = process.env.PORT || 5000;


connectDB();


app.use(cors());
app.use(bodyParser.json());


app.use('/api/auth', authRoutes); 
app.use('/api/games', gameRoutes); 
app.use('/api/photos', photoRoutes); 


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
