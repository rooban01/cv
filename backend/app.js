const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const userRoutes = require("./routes/user");
const contactsRoutes = require("./routes/contacts");
const competancesRoutes = require("./routes/competance");
const headerRoutes = require("./routes/header");
const moiRoutes = require("./routes/moi");
const experienceRoutes = require("./routes/experience");
const formationRoutes = require("./routes/formation");
const langueRoutes = require("./routes/langue");
const loisirRoutes = require("./routes/loisir");
const electroniqueRoutes = require("./routes/electronique");
const informatiqueRoutes = require("./routes/informatique");
const atoutRoutes = require("./routes/atout");
const portfolioRoutes = require("./routes/portfolio");
const cvRoutes = require("./routes/cv");

const app = express();


mongoose.connect("mongodb+srv://+"@cluster0-vbpzi.mongodb.net/cv-contact") // ?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Connected to database!");
  })
    .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "images")));
//app.use("/", express.static(path.join(__dirname, "angular")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/contacts",contactsRoutes);
app.use("/api/competances",competancesRoutes);
app.use("/api/user",userRoutes);
app.use("/api/headers",headerRoutes);
app.use("/api/moi",moiRoutes);
app.use("/api/experience",experienceRoutes);
app.use("/api/formation",formationRoutes);
app.use("/api/langue",langueRoutes);
app.use("/api/loisir",loisirRoutes);
app.use("/api/atout",atoutRoutes);
app.use("/api/electronique",electroniqueRoutes);
app.use("/api/informatique",informatiqueRoutes);
app.use("/api/portfolio",portfolioRoutes);
app.use("/api/cv",cvRoutes);
// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "angular", "index.html"));
// });
module.exports = app;


