const express = require('express');
const helmet = require('helmet');

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

//Load all routes
const CodeRoutes = require('./routes/code.route');

//  Routes
app.use('/api/code', CodeRoutes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// if not in our domain routes
app.use((req, res, next) => {
  res.send("No Port Found")
});
