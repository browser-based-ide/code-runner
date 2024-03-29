const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const port = 4200;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// cors
// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "http://localhost:4200",
//       "https://25-ui-enhancement.care2u-web.pages.dev/",
//     ],
//     credentials: true,
//     exposedHeaders: ["set-cookie"],
//   })
// );

app.use(cors());

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Origin", req.headers.origin);
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
//   );
//   next();
// });

//Load all routes
const CodeRoutes = require("./routes/code.route");

//  Routes
app.use("/api/code", CodeRoutes);

app.use("/", (req, res, next) => {
  res.send("Up and running");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port} http://localhost:${port}`);
});

// if not in our domain routes
app.use((req, res, next) => {
  res.send("No Port Found");
});
