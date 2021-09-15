const express = require("express");
const app = express();
const server = require("http").Server(app);
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const connectDb = require("./utilsServer/connectDb");
const PORT = process.env.PORT || 3000;
app.use(express.json()); // this is the body parser
connectDb();

nextApp.prepare().then(() => {
  // all pages in next js are ssr server side rendering (needs app.all)
  app.all("*", (req, res) => handle(req, res));

  server.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`Express server running on ${PORT}`);
  });
});

//next js and server will run on same port
