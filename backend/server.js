const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

require("dotenv").config({ path: "./config.env" });
const PORT = process.env.PORT || 5000;
app.use(express.json({ limit: "50mb" }));
app.use(require("./routes/user"));
app.use(require("./routes/librarian"));
app.use(require("./routes/book"));
app.use(require("./routes/issues"));
app.use(require("./routes/reviews"));
app.use(require("./routes/feedback"));
app.use(require("./routes/genre"));
const dbo = require("./database/DatabaseConnection"); //driver connection

app.listen(PORT, () => {
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log("Server is running on port: " + PORT);
});
