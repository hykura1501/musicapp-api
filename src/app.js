import express from "express";
import "dotenv/config";
import { connect } from "./services/db";
import router from "./routes/index.route";
const app = express();
import passport from "./middlewares/passport";
// parse application/json

app.use(express.json());

// connect to database
connect();

passport(app);

// routers
router(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
