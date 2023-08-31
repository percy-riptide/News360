const express = require('express');
const bodyParser = require('body-parser');
const articleRoutes = require('./routes/news');
const commentRoutes = require('./routes/comments');
const replyRoutes = require('./routes/reply');
const userRoutes=require('./routes/users');
const likeRoutes = require('./routes/like');
const contactRoute = require("./routes/contact");
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
// Use the routes defined in the separate module
app.use(bodyParser.json());
const MONGODB_URI = 'mongodb+srv://jg581261:tubeligh@jagbirsingh.awpqywe.mongodb.net/news360?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));


app.use('/', commentRoutes);
app.use('/', replyRoutes);
app.use('/',articleRoutes);
app.use('/',userRoutes);
app.use('/', likeRoutes);
app.use("/", contactRoute);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});