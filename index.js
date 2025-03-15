const exp = require("express");
const app = exp();
const db = require("./db");
const expressAsyncHandler = require("express-async-handler");
const jsonParserMiddleware = exp.json();
app.use(jsonParserMiddleware);

app.use((req, res, next) => {
  console.log("Hello from middleware");

  next(); // Add this line to continue to the next middleware/route=[]
});

app.get("/hi", (req, res) => {
  res.send({ message: "Hello World" });
});
app.get(
  "/get-data",
  expressAsyncHandler(async (req, res) => {
    const userDoc = await db.collection("users").get();
    // console.log(userDoc.docs[0].data());
    // const data = userDoc.data();
    const users = userDoc.docs.map((doc) => doc.data());
    res.json(users);
  })
);
app.post(
  "/rem-data",
  expressAsyncHandler(async (req, res) => {
    // const name = req.body;
    console.log(req.body);
    res.send({ message: `to remove user ${req.body}` });
    // const userDoc = await db.collection("users").doc(id).delete();
  })
);

const port = 3000;
app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
