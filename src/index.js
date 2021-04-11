import express from "express";
import router from "./routes/router.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);
app.set("view-engine", "ejs");

app.get('/', (req, res) =>{
    res.render('login.ejs', {name: 'key'});
})
// app.get('/login', (req, res) =>{
//     res.render('login.ejs');
// })

// app.get('register', (req, res) =>{
//     res.render('register.ejs');
// })
let client;
const port = process.env.PORT || 8080;

const server = app.listen(port, async () => {
  try {
    client = await mongoose.connect(process.env.MONGOOSE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (client.connection.readyState == 1) {
      console.log("DB connected!");
    }
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
  console.log(`run in localhost${port}`);
});

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

async function shutdown() {
  server.close(async () => {
    await client.connection.close();
    console.log("\rDB Disconnected!");
    process.exit(0);
  });
}
