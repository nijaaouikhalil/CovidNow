if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;

db.mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Database Connected");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });


app.get("/", (req, res) => {
  res.json({ message: "Go to /api/auth/register" });
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
      new Role({
        name: "doctor",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'doctor' to roles collection");
      });
      new Role({
        name: "health_official",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'health_official' to roles collection");
      });
      new Role({
        name: "immigration_officer",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'immigration_officer' to roles collection");
      });
    }
  });
}

//routes
require("./routes/authRoutes")(app);
require("./routes/verificationRoutes")(app);

app.listen(8080, () => console.log("server is up and running"));
